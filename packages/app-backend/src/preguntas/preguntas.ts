import moment from "moment";
import { DynamoServices } from "@defol-cl/libs";
import { InteraccionPreguntaDynamo, RootEnum, RootUtils } from "@defol-cl/root";
import { PreguntasGetHandler, PreguntasPostHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = ({ usrId }, context, callback) => {
  callback(null, { message: 'Not implemented, yet' });
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
      preguntaAt: now.format("YYYY-MM-DD HH:mm:ss")
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
        fechaActualizacion: now.format("YYYY-MM-DD HH:mm:ss"),
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
        cantReplicas: 0,
        interaccionesMax: 2,
        estado: RootEnum.EstadoPregunta.INGRESADA,
        fechaActualizacion: now.format("YYYY-MM-DD HH:mm:ss"),
        fechaUltimoAcceso: now.format("YYYY-MM-DD HH:mm:ss"),
        timestamp: now.unix(),
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
