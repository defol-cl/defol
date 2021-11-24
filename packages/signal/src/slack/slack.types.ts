import { Callback, Context } from "aws-lambda";

interface Event {
  channel: string
  username: string
  text: string
  title: string
  value: string
}

export type SendSlackMessageHandler = (event: Event, context: Context, callback: Callback) => void;
