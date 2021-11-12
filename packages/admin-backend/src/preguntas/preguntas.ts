import { DynamoServices } from "@defol-cl/libs";
import { DynamoIterator, PreguntaDynamo, RootUtils } from "@defol-cl/root";
import { PreguntasGetHandler } from "./preguntas.types";

export const get: PreguntasGetHandler = async({ usrId, ejecutivo, estado, lastKey }, context, callback) => {
  RootUtils.logger({ usrId, ejecutivo, estado, lastKey });
  try {
    let response: DynamoIterator<PreguntaDynamo[]> = {items: []};
    if(!ejecutivo && !estado) {
      response = await DynamoServices.getPreguntas(lastKey);
    } else {
      response = await DynamoServices.getPreguntasByEjecutivoEstados(ejecutivo, estado, lastKey);
    }

    callback(null, {
      items: response.items,
      token: response.items.length ? response.token : undefined
    });
  } catch (error) {
    console.log(error);
    callback("PREGUNTAS_GET_ERROR");
  }
}
