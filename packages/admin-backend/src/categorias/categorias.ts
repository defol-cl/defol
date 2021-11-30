import { DynamoServices } from "@defol-cl/libs";
import { RootUtils } from "@defol-cl/root";
import { CategoriasGetHandler } from "./categorias.types";

export const get: CategoriasGetHandler = async({ usrId }, context, callback) => {
  RootUtils.logger({usrId});
  try {
    let response = await DynamoServices.getCategorias();
    callback(null, response);
  } catch (error) {
    console.log(error);
    callback("CATEGORIAS_GET_ERROR");
  }
}