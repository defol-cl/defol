import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices, S3Services, SignalServices } from "@defol-cl/libs";
import { DynamoIterator, PreguntaDynamo, RootTypes, RootUtils } from "@defol-cl/root";
import { PreguntaDetailHandler, PreguntaPutHandler, PreguntasGetHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = async({ usrId, ejecutivo, estado, token, permissions }, context, callback) => {
  RootUtils.logger({ usrId, ejecutivo, estado, token, permissions });
  try {
    const prefix = 'admin/preguntas-get';
    const uuid = uuid4();
    let parsedToken;
    const permissionList = permissions.split(",");

    if(!permissionList.includes("pregunta::view") && !permissionList.includes("pregunta::view_all")) {
      callback("PREGUNTA_DETAIL_GET_FORBIDDEN");
      return;
    }

    try {
      parsedToken = token ? await S3Services.getDynamoToken(`${prefix}/${token}.json`) : undefined;
    } catch (error) {
      console.log(error);
      callback("PREGUNTAS_GET_ERROR.EXPIRED_TOKEN");
      return;
    }

    let response: DynamoIterator<PreguntaDynamo> = {items: []};

    if(!ejecutivo && !estado) {
      response = await DynamoServices.getPreguntas(parsedToken);
    } else {
      response = await DynamoServices.getPreguntasByEjecutivoEstados(ejecutivo, estado, parsedToken);
    }

    if(response.items.length && response.token){
      const key = `${prefix}/${uuid}.json`;
      await S3Services.putDynamoToken(response.token, key);
    }

    callback(null, {
      items: response.items,
      token: response.items.length && response.token ? uuid : undefined
    });
  } catch (error) {
    console.log(error);
    callback("PREGUNTAS_GET_ERROR");
  }
}

export const detail: PreguntaDetailHandler = async({ usrId, contactoEmail, timestamp, permissions }, context, callback) => {
  RootUtils.logger({ usrId, contactoEmail, timestamp, permissions });
  try {

    const permissionList = permissions.split(",");

    if(!permissionList.includes("pregunta::view") && !permissionList.includes("pregunta::view_all")) {
      callback("PREGUNTA_DETAIL_GET_FORBIDDEN");
      return;
    }

    const pregunta = await DynamoServices.getPregunta(contactoEmail, timestamp);
    if(!pregunta){
      callback("PREGUNTA_DETAIL_GET_NOT_FOUND");
      return;
    }

    callback(null, pregunta);
  } catch (error) {
    console.log(error);
    callback("PREGUNTA_DETAIL_GET_ERROR");
  }
}

const checkPreguntaConditions = (
  pregunta: PreguntaDynamo
): string | undefined => {
  let error;
  if(!pregunta){
    error = "PREGUNTA_PUT_FAILED.PREGUNTA_NOT_FOUND";
  } else if(!pregunta.interacciones || pregunta.interacciones.length === 0){
    error = "PREGUNTA_PUT_FAILED.NO_INTERACTIONS";
  } else if(pregunta.interacciones[pregunta.interacciones.length - 1].replica){
    error = "PREGUNTA_PUT_FAILED.REPLICA_ALREADY_EXISTS";
  } else if(pregunta.interaccionesCantidad >= pregunta.interaccionesMax){
    error = "PREGUNTA_PUT_FAILED.REPLICAS_LIMIT_REACHED";
  } else if(pregunta.estado === "FINALIZADA" || pregunta.estado === "RESPONDIDA"){
    error = "PREGUNTA_PUT_FAILED.REPLICA_ALREADY_EXISTS";
  }

  return error;
}


export const put: PreguntaPutHandler = async({ usrId, contactoEmail, timestamp, replica, contacto, agregarReplica, permissions }, context, callback) => {
  RootUtils.logger({ usrId, contactoEmail, timestamp, replica, contacto, agregarReplica, permissions });
  try {
    const permissionList = permissions.split(",");
    const pregunta = await DynamoServices.getPregunta(contactoEmail, timestamp);

    if(!permissionList.includes("pregunta::edit")){
      callback("PREGUNTA_PUT_FORBIDDEN");
      return;
    }

    const preguntaHasError = checkPreguntaConditions(pregunta);
    let isLast = true;

    if(preguntaHasError){
      callback(preguntaHasError);
      return;
    }

    pregunta.interaccionesCantidad++;

    if(agregarReplica && pregunta.interaccionesCantidad === pregunta.interaccionesMax){
      pregunta.interaccionesMax++;
      isLast = false;
    }

    pregunta.interacciones[pregunta.interacciones.length - 1].ejecutivoEmail = usrId;
    pregunta.interacciones[pregunta.interacciones.length - 1].ejecutivoNombre = contacto;
    pregunta.interacciones[pregunta.interacciones.length - 1].replica = replica;
    pregunta.interacciones[pregunta.interacciones.length - 1].replicaAt = moment().toISOString();
    pregunta.estado = isLast ? "FINALIZADA" : "RESPONDIDA";

    await DynamoServices.putPregunta(pregunta);

    const emailEvent: RootTypes.SignalEmailEvent<RootTypes.SignalEmailRespuesta> = {
      data: {
        url: ""
      },
      template: "nueva-respuesta",
      to: pregunta.contactoEmail,
      type: "email"
    }

    await SignalServices.putEvent(emailEvent);
    callback(null, {});
  } catch (error) {
    console.log(error);
    callback("PREGUNTA_PUT_ERROR");
  }
}