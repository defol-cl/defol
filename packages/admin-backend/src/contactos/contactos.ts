import { DynamoServices, SignalServices } from "@defol-cl/libs";
import { ConvenioContactoDynamo, ConvenioDynamo, PreguntaDynamo, RootTypes, RootUtils } from "@defol-cl/root";
import { ContactosMaxPreguntasPutHandler, ContactosPostHandler } from "./contactos.types";

const checkPermissionsModerador = async(usrId: string, permissions: string, convenioCod: string): Promise<boolean> => {
  const permissionList = permissions.split(",");
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

const getEmailEvent = (email: string, convenio: ConvenioDynamo): RootTypes.SignalEmailEvent<RootTypes.SignalEmailInvitacion> => {
  return {
    data: {
      url: process.env.APP_FRONTEND_URL,
      convenio
    },
    template: "invitacion",
    to: email,
    type: "email"
  }
}

export const post: ContactosPostHandler = async({ usrId, convenioCod, emails, preguntasMax, permissions }, context, callback) => {
  RootUtils.logger({ usrId, convenioCod, emails, preguntasMax, permissions });
  try {
    const hasPermission = await checkPermissionsModerador(usrId, permissions, convenioCod);

    if(!hasPermission){
      callback("CONTACTOS_POST_FORBIDDEN");
      return;
    }

    const emailList = emails.split(/[,;\s\t\n\r]+/);
    const succeededEmails: string[] = [];
    const failedEmails: string[] = [];
    const convenio = await DynamoServices.getConvenio(convenioCod);
    for (const email of emailList) {
      try {
        await DynamoServices.putConvenioContacto({
          convenioCod,
          email,
          preguntasMax
        })
        await SignalServices.putEvent(getEmailEvent(email, convenio));
        succeededEmails.push(email);
      } catch (error) {
        console.log(error, `Email: ${email}`);
        failedEmails.push(email);
      }
    }

    callback(null, {
      succeededEmails,
      failedEmails
    })

  } catch (error) {
    console.log(error);
    callback("CONTACTOS_POST_ERROR");
  }
}

const hasErrorUpdateMaxPreguntas = (
  preguntas: PreguntaDynamo[],
  preguntasMax: number,
  convenioContacto: ConvenioContactoDynamo,
): string | undefined => {
  let error;

  if(!convenioContacto){
    error = "CONTACTOS_MAX_PREGUNTAS_PUT_FAILED.CONTACTO_NOT_FOUND";
  } else if(preguntas.length > preguntasMax){
    error = "CONTACTOS_MAX_PREGUNTAS_PUT_FAILED.MAX_PREGUNTAS_IS_LOWER_THAN_TOTAL_PREGUNTAS";
  }

  return error;
}

export const maxPreguntasPut: ContactosMaxPreguntasPutHandler = async({usrId, permissions, convenioCod, email, preguntasMax}, context, callback) => {
  RootUtils.logger({usrId, permissions, convenioCod, email, preguntasMax});
  try {
    const hasPermission = await checkPermissionsModerador(usrId, permissions, convenioCod);
    if(!hasPermission){
      callback("CONTACTOS_MAX_PREGUNTAS_PUT_FORBIDDEN");
      return;
    }

    const preguntasPromise = DynamoServices.getPreguntasByContactoAndConvenio(email, convenioCod);
    const convenioContactoPromise = DynamoServices.getConvenioContactoByContactoAndConvenio(email, convenioCod);

    const convenioContacto = await convenioContactoPromise;
    const preguntas = await preguntasPromise;

    const hasError = hasErrorUpdateMaxPreguntas(preguntas, preguntasMax, convenioContacto);

    if(hasError){
      callback(hasError);
      return;
    }

    await DynamoServices.putConvenioContacto({
      ...convenioContacto,
      preguntasMax
    });

    callback(null, {});
  } catch (error) {
    console.log(error);
    callback("CONTACTOS_MAX_PREGUNTAS_PUT_ERROR");
  }
}