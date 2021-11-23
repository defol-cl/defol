import { DynamoServices } from "@defol-cl/libs";
import { RootUtils } from "@defol-cl/root";
import { ContactosPostHandler } from "./contactos.types";

const checkPermissionsPost = async(usrId: string, permissionList: string[], convenioCod: string): Promise<boolean> => {
  const hasPermission = permissionList.includes("convenio::contacto_edit") || permissionList.includes("convenio::contacto_edit_all");
  if(permissionList.includes("convenio::contacto_edit")){
    const moderador = await DynamoServices.getConvenioModeradorByModeradorAndConvenio(usrId, convenioCod);
    if(!moderador) {
      return false;
    }
  } else if(!hasPermission) {
    return false
  } else {
    return true;
  }
}

export const post: ContactosPostHandler = async({ usrId, convenioCod, emails, preguntasMax, permissions }, context, callback) => {
  RootUtils.logger({ usrId, convenioCod, emails, preguntasMax, permissions });
  try {
    const permissionList = permissions.split(",");
    const hasPermission = await checkPermissionsPost(usrId, permissionList, convenioCod);

    if(!hasPermission){
      callback("CONTACTOS_POST_FORBIDDEN");
      return;
    }

    const emailList = emails.split(/[,;\s\t\n\r]+/);
    const emailFailed: string[] = [];
    for (const email of emailList) {
      try {
        await DynamoServices.putConvenioContacto({
          convenioCod,
          email,
          preguntasMax
        })
      } catch (error) {
        console.log(error, `Email: ${email}`);
        emailFailed.push(email);
      }
    }
    if(emailFailed.length){
      callback("CONTACTOS_POST_ERROR", emailFailed);
    } else {
      callback(null, {});
    }
  } catch (error) {
    console.log(error);
    callback("CONTACTOS_POST_ERROR");
  }
}
