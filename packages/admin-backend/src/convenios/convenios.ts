import { DynamoServices } from "@defol-cl/libs";
import { ConvenioDynamo, RootTypes, RootUtils } from "@defol-cl/root";
import { ConveniosGetHandler } from "./convenios.types";

export const get: ConveniosGetHandler = async({ usrId, groups }, context, callback) => {
  RootUtils.logger({usrId, groups});
  try {
    const grupos = groups.split(",") as RootTypes.Group[];
    let response: ConvenioDynamo[] = [];
    if(grupos.includes("SUPER_ADMIN") || grupos.includes("EQUIPO_LEGAL")){
      response = await DynamoServices.getConvenios();
    } else {
      const convenioContactos = await DynamoServices.getConvenioContactoByUser(usrId);
      const requests: Promise<ConvenioDynamo>[] = [];
      for (const convenioContacto of convenioContactos) {
        requests.push(DynamoServices.getConvenio(convenioContacto.convenioCod));
      }

      response = await Promise.all(requests);
    }

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback("CONVENIOS_GET_ERROR");
  }
}
