import { SendSlackMessageHandler } from "./slack.types";
import { sendMessage } from "./slack.service";

export const handler: SendSlackMessageHandler = async ({ channel, username, text, title, value }, context, callback) => {
  await sendMessage(channel, username, text, title, value);
  callback(null, {});
}
