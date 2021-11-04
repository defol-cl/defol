import { ConveniosGetHandler } from "./convenios.types";
import { DynamoServices } from "@defol-cl/libs";
import { RootUtils } from "@defol-cl/root";

export const get: ConveniosGetHandler = async({ usrId }, context, callback) => {
  RootUtils.logger({usrId});
  try {
    const convenios = await DynamoServices.getConvenios();
    callback(null, convenios);
  } catch (error) {
    console.log(error);
    callback("CONVENIOS_GET_ERROR");
  }
}
