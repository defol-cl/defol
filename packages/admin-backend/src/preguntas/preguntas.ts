import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices, S3Services } from "@defol-cl/libs";
import { DynamoIterator, PreguntaDynamo, RootUtils } from "@defol-cl/root";
import { PreguntaDetailHandler, PreguntaPutHandler, PreguntasGetHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = async({ usrId, ejecutivo, estado, token }, context, callback) => {
  RootUtils.logger({ usrId, ejecutivo, estado, token });
  try {
    const prefix = 'preguntas-get';
    const uuid = uuid4();
    let parsedToken;
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

export const detail: PreguntaDetailHandler = async({ usrId, contactoEmail, timestamp }, context, callback) => {
  RootUtils.logger({ usrId, contactoEmail, timestamp });
  try {
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
  }

  const cantReplicas = pregunta.interacciones.reduce((acc, curr) => {
    return acc + (curr.replica ? 1 : 0)
  }, 0);

  if(cantReplicas === pregunta.cantReplicas){
    error = "PREGUNTA_PUT_FAILED.REPLICAS_LIMIT_REACHED";
  }

  return error;
}


export const put: PreguntaPutHandler = async({ usrId, contactoEmail, timestamp, replica, contacto, agregarReplica }, context, callback) => {
  RootUtils.logger({ usrId, contactoEmail, timestamp, replica, contacto, agregarReplica });
  try {
    const pregunta = await DynamoServices.getPregunta(contactoEmail, timestamp);
    const preguntaHasError = checkPreguntaConditions(pregunta);

    if(preguntaHasError){
      callback(preguntaHasError);
      return;
    }

    const cantReplicas = pregunta.interacciones.reduce((acc, curr) => {
      return acc + (curr.replica ? 1 : 0)
    }, 0);

    if(agregarReplica && cantReplicas === pregunta.cantReplicas - 1){
      pregunta.cantReplicas++;
    }

    pregunta.interacciones[pregunta.interacciones.length - 1].ejecutivoEmail = usrId;
    pregunta.interacciones[pregunta.interacciones.length - 1].ejecutivoNombre = contacto;
    pregunta.interacciones[pregunta.interacciones.length - 1].replica = replica;
    pregunta.interacciones[pregunta.interacciones.length - 1].replicaAt = moment().toISOString();

    await DynamoServices.putPregunta(pregunta)
    callback(null, {});
  } catch (error) {
    console.log(error);
    callback("PREGUNTA_PUT_ERROR");
  }
}