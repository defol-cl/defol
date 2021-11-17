import { LambdaTypes } from "@defol-cl/libs";
import { DynamoIteratorFront, PreguntaDynamo } from "@defol-cl/root";

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
interface PreguntasLastUpdatesEvent extends BaseEvent {
  token: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<BaseEvent>;
export type PreguntasPostHandler = LambdaTypes.CustomHandler<PreguntasPostEvent>;
export type PreguntasLastUpdatesHandler = LambdaTypes.CustomHandler<PreguntasLastUpdatesEvent, DynamoIteratorFront<PreguntaDynamo>>;
