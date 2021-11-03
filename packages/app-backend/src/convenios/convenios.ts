import { ConveniosGetHandler } from "./convenios.types";
import { DynamoServices } from "@defol-cl/libs";

export const get: ConveniosGetHandler = async({ userId }, context, callback) => {
  try {
    const convenios = await DynamoServices.getConvenios();
    callback(null, convenios);
  } catch (error) {
    console.log(error);
    callback("CONVENIOS_GET_ERROR");
  }
}
