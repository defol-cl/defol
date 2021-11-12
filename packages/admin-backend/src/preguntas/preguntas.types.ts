import { LambdaTypes } from "@defol-cl/libs";
import { DynamoIterator, PreguntaDynamo } from "@defol-cl/root";

interface BaseEvent {
  usrId: number
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

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent, DynamoIterator<PreguntaDynamo[]>>;
export type PreguntaDetailHandler = LambdaTypes.CustomHandler<PreguntaDetailEvent, PreguntaDynamo>;
