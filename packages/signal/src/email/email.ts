import { SendEmailHandler } from "./email.types";
import { sendEmail } from "./email.service";

export const handler: SendEmailHandler = async ({ template, data, to, cc }, context, callback) => {
  await sendEmail(template, { to, cc }, data);
  callback(null, { });
}
