import { Callback, Context } from "aws-lambda";

export type Template = 'invitacion' | 'nueva-respuesta';

export interface EmailDetails {
  to: string
  cc?: string
}

interface Event extends EmailDetails {
  template: Template
  data: any
}

export type SendEmailHandler = (event: Event, context: Context, callback: Callback) => void;

export interface EmailConfig {
  subject: string
  html: string
}

export type SubjectConfig = {
  [key in Template]: string
}
