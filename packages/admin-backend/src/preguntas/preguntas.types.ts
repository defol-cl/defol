import { LambdaTypes } from "@defol-cl/libs";
import { DynamoIterator, PreguntaDynamo } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
}

interface PreguntasGetEvent extends BaseEvent {
  ejecutivo?: string
  estado?: string,
  lastKey?: any
}

interface PreguntaDetailEvent extends BaseEvent {
  contactoEmail: string
  timestamp: string
}

interface PreguntaPutEvent extends BaseEvent, PreguntaDetailEvent {
  replica: string
  contacto: string
  agregarReplica?: boolean
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent, DynamoIterator<PreguntaDynamo[]>>;
export type PreguntaDetailHandler = LambdaTypes.CustomHandler<PreguntaDetailEvent, PreguntaDynamo>;
export type PreguntaPutHandler = LambdaTypes.CustomHandler<PreguntaPutEvent>;
