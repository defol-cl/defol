import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices, S3Services } from "@defol-cl/libs";
import { InteraccionPreguntaDynamo, RootEnum, RootUtils } from "@defol-cl/root";
import { PreguntaDetailHandler, PreguntasGetHandler, PreguntasLastUpdatesHandler, PreguntasPostHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = async({ usrId }, context, callback) => {
  callback(null, "Not yet implemented");
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

export const post: PreguntasPostHandler = async({ usrId, antecedentes, convenioCod, pregunta, titulo, timestamp, contacto }, context, callback) => {
  RootUtils.logger({ usrId, antecedentes, convenioCod, pregunta, titulo, timestamp, contacto });
  try {
    const convenioPreguntaUsuario = await DynamoServices.getLimitAndCountPreguntasByUsrId(usrId, convenioCod)
    const now = moment();

    if(!timestamp && convenioPreguntaUsuario.limitePreguntas <= convenioPreguntaUsuario.preguntasRealizadas){
      callback("PREGUNTAS_POST_FAILED.MAX_PREGUNTAS_REACHED");
      return;
    }

    const nuevaInteraccion: InteraccionPreguntaDynamo = {
      pregunta,
      preguntaAt: now.toISOString()
    }

    if(timestamp){
      const preguntaT = await DynamoServices.getPregunta(usrId, timestamp);
      if(!preguntaT){
        callback("PREGUNTAS_PUT_NOT_FOUND");
      }

      await DynamoServices.putPregunta({
        ...preguntaT,
        interacciones: preguntaT.interacciones.concat(nuevaInteraccion),
        estado: RootEnum.EstadoPregunta.RESPONDIDA,
        fechaActualizacion: now.toISOString(),
      })
    } else {
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
        fechaActualizacion: now.toISOString(),
        fechaUltimoAcceso: now.toISOString(),
        timestamp: now.toISOString(),
      })
    }

    callback(null, {})
  } catch (error) {
    console.log(error);
    if(timestamp)
      callback("PREGUNTAS_PUT_ERROR")
    else
      callback("PREGUNTAS_POST_ERROR")
  }
}

export const lastUpdates: PreguntasLastUpdatesHandler = async({ usrId, token }, context, callback) => {
  RootUtils.logger({ usrId, token });
  try {
    const prefix = 'preguntas-last-updates-get';
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