import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices, S3Services } from "@defol-cl/libs";
import { DynamoIterator, InteraccionPreguntaDynamo, PreguntaDynamo, RootEnum, RootUtils } from "@defol-cl/root";
import { PreguntaDetailHandler, PreguntasGetHandler, PreguntasLastUpdatesHandler, PreguntasPostHandler, PreguntasPutHandler } from "./preguntas.types";

const checkConditionsPregunta = (pregunta: PreguntaDynamo) : boolean => {
  //TODO: Revisar cuales son las condiciones en que no puede actualizar la pregunta
  return false;
}

export const get: PreguntasGetHandler = async({ usrId, estado, token }, context, callback) => {
  RootUtils.logger({ usrId, estado, token });
  try {
    const prefix = 'app/preguntas-get';
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

    if(!estado) {
      response = await DynamoServices.getPreguntasByContactoEmail(usrId, parsedToken);
    } else {
      response = await DynamoServices.getPreguntasByContactoEmailEstados(usrId, estado, parsedToken);
    }

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
      estado: RootEnum.EstadoPregunta.INGRESADA,
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

export const lastUpdates: PreguntasLastUpdatesHandler = async({ usrId, token }, context, callback) => {
  RootUtils.logger({ usrId, token });
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

    const response = await DynamoServices.getLastPreguntasByUserId(usrId, {lastKey: parsedToken});

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

export const put: PreguntasPutHandler = async({ usrId, pregunta, timestamp }, context, callback) => {
  RootUtils.logger({ usrId, pregunta, timestamp });
  try {
    const preguntaDetalle = await DynamoServices.getPregunta(usrId, timestamp);
    if(!preguntaDetalle){
      callback("PREGUNTAS_PUT_NOT_FOUND");
      return;
    }

    const canUpdatePregunta = checkConditionsPregunta(preguntaDetalle);

    const now = moment().toISOString();
    const nuevaInteraccion: InteraccionPreguntaDynamo = {
      pregunta,
      preguntaAt: now
    }

    await DynamoServices.putPregunta({
      ...preguntaDetalle,
      interacciones: preguntaDetalle.interacciones.concat(nuevaInteraccion),
      estado: RootEnum.EstadoPregunta.RESPONDIDA,
      fechaActualizacion: now,
      fechaUltimoAcceso: now
    });
  } catch (error) {
    console.log(error);
    callback("PREGUNTAS_PUT_ERROR");
  }
}