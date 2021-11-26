import { Callback, Context } from "aws-lambda";

export type SendSlackMessageHandler = (event: any, context: Context, callback: Callback) => void;
