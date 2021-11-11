import { LambdaTypes } from "@defol-cl/libs";

interface BaseEvent {
  usrId: string
}

interface PreguntasPostEvent extends BaseEvent {
  convenioCod: string
  contacto: string
  titulo: string
  antecedentes: string
  pregunta: string
  timestamp?: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<BaseEvent>;
export type PreguntasPostHandler = LambdaTypes.CustomHandler<PreguntasPostEvent>;
