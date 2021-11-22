import { LambdaTypes } from "@defol-cl/libs";
import { DynamoIteratorFront, PreguntaDynamo } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
}

interface PreguntasGetEvent extends BaseEvent {
  estado?: string
  token?: string
}

interface PreguntaDetailGetEvent extends BaseEvent {
  timestamp: string
}

interface PreguntasPostEvent extends BaseEvent {
  contacto: string
  pregunta: string
  convenioCod?: string
  titulo?: string
  antecedentes?: string
}

interface PreguntasPutEvent extends BaseEvent {
  pregunta: string
  timestamp: string
}
interface PreguntasLastUpdatesEvent extends BaseEvent {
  token?: string
  limit?: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent, DynamoIteratorFront<PreguntaDynamo>>;
export type PreguntaDetailHandler = LambdaTypes.CustomHandler<PreguntaDetailGetEvent>;
export type PreguntasPostHandler = LambdaTypes.CustomHandler<PreguntasPostEvent>;
export type PreguntasPutHandler = LambdaTypes.CustomHandler<PreguntasPutEvent>;
export type PreguntasLastUpdatesHandler = LambdaTypes.CustomHandler<PreguntasLastUpdatesEvent, DynamoIteratorFront<PreguntaDynamo>>;
