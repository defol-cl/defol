import { ConveniosGetHandler } from "./convenios.types";
import { DynamoServices } from "@defol-cl/libs";
import { Dao, RootUtils } from "@defol-cl/root";

export const get: ConveniosGetHandler = async({ usrId }, context, callback) => {
  RootUtils.logger({usrId});
  try {
    const convenioContactos = await DynamoServices.getConvenioContactoByUser(usrId);
    const response: Dao.Convenio[] = [];

    for (const convenioContacto of convenioContactos) {
      const preguntaUsuario = await DynamoServices.getPreguntasByUsrId(usrId, convenioContacto.convenioCod);
      const convenio = await DynamoServices.getConvenio(convenioContacto.convenioCod);
      if(preguntaUsuario.limitePreguntas){
        response.push({
          ...convenio,
          preguntasRealizadas: preguntaUsuario.preguntasRealizadas,
          limitePreguntas: preguntaUsuario.limitePreguntas,
        });
      }
    }

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback("CONVENIOS_GET_ERROR");
  }
}
