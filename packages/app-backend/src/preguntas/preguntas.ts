import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices, S3Services } from "@defol-cl/libs";
import { DynamoIterator, InteraccionPreguntaDynamo, PreguntaDynamo, RootUtils } from "@defol-cl/root";
import { PreguntaDetailHandler, PreguntasGetHandler, PreguntasLastUpdatesHandler, PreguntasPostHandler, PreguntasPutHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = async({ usrId, estado, token }, context, callback) => {
  RootUtils.logger({ usrId, estado, token });
  try {
    const prefix = 'app/preguntas-get';
    const uuid = uuid4();
    const estados = estado ? estado.split(";") : undefined;
    let parsedToken;
    try {
      parsedToken = token ? await S3Services.getDynamoToken(`${prefix}/${token}.json`) : undefined;
    } catch (error) {
      console.log(error);
      callback("PREGUNTAS_GET_ERROR.EXPIRED_TOKEN");
      return;
    }

    const response = await DynamoServices.getPreguntasByContactoEmail(usrId, estados, {limit: 20, lastKey: parsedToken});

    if(response.items.length && response.token){
      const key = `${prefix}/${uuid}.json`;
      await S3Services.putDynamoToken(response.token, key);
    }

    callback(null, {
      items: response.items,
      token: response.items.length && response.token ? uuid : undefined
    });
  } catch (error){
    console.log(error);
    callback("PREGUNTAS_GET_ERROR");
  }
}

export const detail: PreguntaDetailHandler = async({ usrId, timestamp }, context, callback) => {
  RootUtils.logger({ usrId, timestamp });
  try {
    const pregunta = await DynamoServices.getPregunta(usrId, timestamp);
    if(!pregunta){
      callback("PREGUNTA_DETAIL_GET_NOT_FOUND");
      return;
    }

    pregunta.fechaUltimoAcceso = moment().toISOString();
    await DynamoServices.putPregunta(pregunta);

    callback(null, pregunta);
  } catch (error) {
    console.log(error);
    callback("PREGUNTA_DETAIL_GET_ERROR");
  }
}

export const post: PreguntasPostHandler = async({ usrId, antecedentes, convenioCod, pregunta, titulo, contacto }, context, callback) => {
  RootUtils.logger({ usrId, antecedentes, convenioCod, pregunta, titulo, contacto });
  try {
    const convenioPreguntaUsuario = await DynamoServices.getLimitAndCountPreguntasByUsrId(usrId, convenioCod)
    const now = moment().toISOString();

    if(convenioPreguntaUsuario.limitePreguntas <= convenioPreguntaUsuario.preguntasRealizadas){
      callback("PREGUNTAS_POST_FAILED.MAX_PREGUNTAS_REACHED");
      return;
    }

    const nuevaInteraccion: InteraccionPreguntaDynamo = {
      pregunta,
      preguntaAt: now
    }

    await DynamoServices.putPregunta({
      contactoEmail: usrId,
      contactoNombre: contacto.trim(),
      convenioCod,
      antecedentes,
      interaccionesCantidad: 0,
      interacciones: [nuevaInteraccion],
      titulo,
      pregunta,
      interaccionesMax: 2,
      estado: "INGRESADA",
      fechaActualizacion: now,
      fechaUltimoAcceso: now,
      timestamp: now,
    })

    callback(null, {})
  } catch (error) {
    console.log(error);
    callback("PREGUNTAS_POST_ERROR")
  }
}

export const lastUpdates: PreguntasLastUpdatesHandler = async({ usrId, token, limit }, context, callback) => {
  RootUtils.logger({ usrId, token, limit });
  try {
    const prefix = 'app/preguntas-last-updates-get';
    const uuid = uuid4();
    let parsedToken;
    try {
      parsedToken = token ? await S3Services.getDynamoToken(`${prefix}/${token}.json`) : undefined;
    } catch (error) {
      console.log(error);
      callback("PREGUNTAS_ULTIMAS_ACTUALIZACIONES_GET_ERROR.EXPIRED_TOKEN");
      return;
    }

    const response = await DynamoServices.getLastPreguntasByContactoEmail(usrId, {limit: +limit, lastKey: parsedToken});

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
    callback("PREGUNTAS_ULTIMAS_ACTUALIZACIONES_GET_ERROR");
  }
}

const checkConditionsPregunta = (pregunta: PreguntaDynamo) : string | undefined => {
  let error;
  if(pregunta.estado !== "RESPONDIDA"){
    error = "PREGUNTA_PUT_FAILED.PREGUNTA_CANNOT_UPDATE";
  } else if(pregunta.interaccionesCantidad >= pregunta.interaccionesMax){
    error = "PREGUNTA_PUT_FAILED.PREGUNTA_LIMIT_REACHED";
  }

  return error;
}

export const put: PreguntasPutHandler = async({ usrId, pregunta, timestamp }, context, callback) => {
  RootUtils.logger({ usrId, pregunta, timestamp });
  try {
    const preguntaDetalle = await DynamoServices.getPregunta(usrId, timestamp);
    if(!preguntaDetalle){
      callback("PREGUNTAS_PUT_NOT_FOUND");
      return;
    }

    const preguntaHasError = checkConditionsPregunta(preguntaDetalle);

    if(preguntaHasError) {
      callback(preguntaHasError);
      return;
    }

    const now = moment().toISOString();
    const nuevaInteraccion: InteraccionPreguntaDynamo = {
      pregunta,
      preguntaAt: now
    }

    await DynamoServices.putPregunta({
      ...preguntaDetalle,
      interacciones: preguntaDetalle.interacciones.concat(nuevaInteraccion),
      estado: "REPLICADA",
      fechaActualizacion: now,
      fechaUltimoAcceso: now
    });
  } catch (error) {
    console.log(error);
    callback("PREGUNTAS_PUT_ERROR");
  }
}