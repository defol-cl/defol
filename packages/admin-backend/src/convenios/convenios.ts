import { DynamoServices } from "@defol-cl/libs";
import { ConvenioDynamo, RootUtils } from "@defol-cl/root";
import { ConvenioDetalleGetHandler, ConveniosGetHandler, ConveniosPostHandler } from "./convenios.types";

export const get: ConveniosGetHandler = async({ usrId, permissions }, context, callback) => {
  RootUtils.logger({usrId, permissions});
  try {
    const permissionList = permissions.split(",");
    let response: ConvenioDynamo[] = [];
    if(permissionList.includes("convenio::view_all")){
      response = await DynamoServices.getConvenios();
    } else if(permissionList.includes("convenio::view")){
      const convenioContactos = await DynamoServices.getConvenioContactoByUser(usrId);
      const requests: Promise<ConvenioDynamo>[] = [];
      for (const convenioContacto of convenioContactos) {
        requests.push(DynamoServices.getConvenio(convenioContacto.convenioCod));
      }

      response = await Promise.all(requests);
    } else {
      callback("CONVENIOS_GET_FORBIDDEN");
      return;
    }

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback("CONVENIOS_GET_ERROR");
  }
}

export const post: ConveniosPostHandler = async({usrId, convenio, permissions}, context, callback) => {
  RootUtils.logger({usrId, convenio, permissions});
  try {
    const permissionList = permissions.split(",");
    if(!permissionList.includes("convenio::add")){
      callback("CONVENIOS_POST_FORBIDDEN");
      return;
    }

    const existConvenio = await DynamoServices.getConvenio(convenio.cod);
    if(existConvenio){
      callback("CONVENIOS_POST_FAILED.CONVENIO_ALREADY_EXISTS");
      return;
    }

    await DynamoServices.putConvenio(convenio);
    callback(null);
  } catch (error) {
    console.log(error);
    callback("CONVENIOS_POST_ERROR");
  }
}

export const detail: ConvenioDetalleGetHandler = async({ usrId, permissions, convenioCod }, context, callback) => {
  RootUtils.logger({usrId, permissions, convenioCod});
  try {
    const permissionList = permissions.split(",");
    const convenio = await DynamoServices.getConvenio(convenioCod);
    const contactos = await DynamoServices.getConvenioContactoByConvenio(convenioCod);
    const moderadores = await DynamoServices.getConvenioModeradorByConvenio(convenioCod);

    const hasPermission = permissionList.includes("convenio::view") || permissionList.includes("convenio::view_all");

    if(!hasPermission || (permissionList.includes("convenio::view") && !moderadores.length)) {
      callback("CONVENIO_DETALLE_GET_FORBIDDEN");
      return;
    }

    callback(null, {
      ...convenio,
      moderadores,
      contactos
    });
  } catch (error) {
    console.log(error);
    callback("CONVENIO_DETALLE_GET_ERROR");
  }
}