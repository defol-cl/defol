import moment from "moment";
import { v4 as uuid4 } from "uuid";
import { DynamoServices } from "@defol-cl/libs";
import { RootEnum, RootUtils } from "@defol-cl/root";
import { PreguntasGetHandler, PreguntasPostHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = ({ usrId }, context, callback) => {
  callback(null, { message: 'Not implemented, yet' });
}

export const post: PreguntasPostHandler = async({ usrId, antecendentes, codigoConvenio, pregunta, titulo }, context, callback) => {
  RootUtils.logger({ usrId, antecendentes, codigoConvenio, pregunta, titulo });
  try {
    const convenioPreguntaUsuario = await DynamoServices.getPreguntasByUsrId(usrId, codigoConvenio)

    if(convenioPreguntaUsuario.limitePreguntas > convenioPreguntaUsuario.preguntasRealizadas){
      await DynamoServices.preguntaPut({
        username: usrId,
        convenioCod: codigoConvenio,
        antecedentes: antecendentes,
        interacciones: 0,
        titulo,
        pregunta,
        cantReplicas: 0,
        interaccionesMax: 2,
        estado: RootEnum.EstadoPregunta.INGRESADA,
        timestamp: moment().unix(),
        cod: uuid4()
      })
    } else {
      callback("PREGUNTA_CREATE_FAILED.MAX_PREGUNTAS_REACHED");
      return;
    }

    callback(null, {})
  } catch (error) {
    console.log(error);
    callback("PREGUNTA_CREATE_ERROR")
  }
}
