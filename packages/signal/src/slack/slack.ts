import { RootTypes } from "@defol-cl/root";
import { SendSlackMessageHandler } from "./slack.types";
import { sendMessage } from "./slack.service";

export const handler: SendSlackMessageHandler = async (event, context, callback) => {
  console.log('event', event);
  const { channel, username, text, title, value } = event as RootTypes.SignalSlackEvent;
  await sendMessage(channel, username, text, title, value);
  callback(null, {});
}
