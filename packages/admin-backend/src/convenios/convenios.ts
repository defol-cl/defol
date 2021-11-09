import { DynamoServices } from "@defol-cl/libs";
import { ConvenioDynamo, RootUtils } from "@defol-cl/root";
import { ConveniosGetHandler } from "./convenios.types";

export const get: ConveniosGetHandler = async({ usrId, groups }, context, callback) => {
  RootUtils.logger({usrId, groups});
  try {
    let response: ConvenioDynamo[] = [];
    if(groups.includes("SUPER_ADMIN") || groups.includes("SUPER_ADMIN")){
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
    callback(error);
  }
}
