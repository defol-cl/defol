import { RootTypes } from "@defol-cl/root";
import { SendEmailHandler } from "./email.types";
import { sendEmail } from "./email.service";

export const handler: SendEmailHandler = async (event, context, callback) => {
  console.log('event', event);
  const { template, to, cc, data } = event as RootTypes.SignalEmailEvent;
  await sendEmail(template, { to, cc }, data);
  callback(null, {});
}
