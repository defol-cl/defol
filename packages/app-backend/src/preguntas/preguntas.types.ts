import { LambdaTypes } from "@defol-cl/libs";

interface BaseEvent {
  usrId: string
}

interface PreguntasPostEvent extends BaseEvent {
  codigoConvenio: string
  titulo: string
  antecendentes: string
  pregunta: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<BaseEvent>;
export type PreguntasPostHandler = LambdaTypes.CustomHandler<PreguntasPostEvent>;
