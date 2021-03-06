import { RootTypes } from "@defol-cl/root";
import { SendEmailHandler } from "./email.types";
import { sendEmail } from "./email.service";

export const handler: SendEmailHandler = async (event, context, callback) => {
  console.log('event', event);
  const { template, to, cc, data } = event.detail as RootTypes.SignalEmailEvent<RootTypes.SignalEmailData>;
  await sendEmail(template, data, to, cc);
  callback(null, {});
}
