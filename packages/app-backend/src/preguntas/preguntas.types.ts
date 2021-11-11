import { LambdaTypes } from "@defol-cl/libs";

interface BaseEvent {
  usrId: string
}

interface PreguntasPostEvent extends BaseEvent {
  convenioCod: string
  titulo: string
  antecedentes: string
  pregunta: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<BaseEvent>;
export type PreguntasPostHandler = LambdaTypes.CustomHandler<PreguntasPostEvent>;
