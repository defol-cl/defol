import { LambdaTypes } from "@defol-cl/libs";

interface BaseEvent {
  usrId: string
}

interface PreguntasPostEvent extends BaseEvent {
  contacto: string
  pregunta: string
  convenioCod?: string
  titulo?: string
  antecedentes?: string
  timestamp?: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<BaseEvent>;
export type PreguntasPostHandler = LambdaTypes.CustomHandler<PreguntasPostEvent>;
