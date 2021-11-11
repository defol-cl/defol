import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices } from "@defol-cl/libs";
import { RootEnum, RootUtils } from "@defol-cl/root";
import { PreguntasGetHandler, PreguntasPostHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = ({ usrId }, context, callback) => {
  callback(null, { message: 'Not implemented, yet' });
}

export const post: PreguntasPostHandler = async({ usrId, antecedentes, convenioCod, pregunta, titulo }, context, callback) => {
  RootUtils.logger({ usrId, antecedentes, convenioCod, pregunta, titulo });
  try {
    const convenioPreguntaUsuario = await DynamoServices.getLimitAndCountPreguntasByUsrId(usrId, convenioCod)
    const now = moment();

    if(convenioPreguntaUsuario.limitePreguntas > convenioPreguntaUsuario.preguntasRealizadas){
      await DynamoServices.preguntaPut({
        username: usrId,
        convenioCod,
        antecedentes,
        interacciones: 0,
        titulo,
        pregunta,
        cantReplicas: 0,
        interaccionesMax: 2,
        estado: RootEnum.EstadoPregunta.INGRESADA,
        fechaActualizacion: now.format("YYYY-MM-DD HH:mm:ss"),
        fechaUltimoAcceso: now.format("YYYY-MM-DD HH:mm:ss"),
        timestamp: now.unix(),
        cod: uuid4()
      })
    } else {
      callback("PREGUNTAS_POST_FAILED.MAX_PREGUNTAS_REACHED");
      return;
    }

    callback(null, {})
  } catch (error) {
    console.log(error);
    callback("PREGUNTAS_POST_ERROR")
  }
}
