import { DynamoServices } from "@defol-cl/libs";
import { PreguntasGetHandler } from "./usuarios.types";

export const post: PreguntasGetHandler = async({ usrId, convenioCod, emails, preguntasMax }, context, callback) => {
    const emailList = emails.split(";");
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
      callback("USUARIOS_POST_ERROR", emailFailed);
    } else {
      callback(null, {});
    }
}
