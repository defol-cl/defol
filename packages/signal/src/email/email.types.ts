import { Callback, Context } from "aws-lambda";
import { RootTypes } from "@defol-cl/root";

export type SendEmailHandler = (event: any, context: Context, callback: Callback) => void;

export interface EmailConfig {
  subject: string
  html: string
}

export type SubjectConfig = {
  [key in RootTypes.SignalEmailTemplate]: string
}
