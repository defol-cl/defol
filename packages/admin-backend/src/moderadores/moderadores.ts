import { DynamoServices } from "@defol-cl/libs";
import { RootUtils } from "@defol-cl/root";
import { ModeradoresPostHandler } from "./moderadores.types";

export const post: ModeradoresPostHandler = async({ usrId, convenioCod, emails, activo, permissions }, context, callback) => {
  RootUtils.logger({ usrId, convenioCod, emails, activo, permissions });
  try {
    const permissionList = permissions.split(",");

    if(!permissionList.includes("convenio::moderador_edit_all")){
      callback("MODERADORES_POST_FORBIDDEN");
      return;
    }

    const emailList = emails.split(/[,;\s\t\n\r]+/);
    const emailFailed: string[] = [];
    for (const email of emailList) {
      try {
        await DynamoServices.putConvenioModerador({
          convenioCod,
          email,
          activo
        })
      } catch (error) {
        console.log(error, `Email: ${email}`);
        emailFailed.push(email);
      }
    }
    if(emailFailed.length){
      console.log("Falló la carga de algunos moderadores:", RootUtils.logger(emailFailed))
      callback("MODERADORES_POST_ERROR", emailFailed);
    } else {
      callback(null, {});
    }
  } catch (error) {
    console.log(error);
    callback("MODERADORES_POST_ERROR");
  }
}
