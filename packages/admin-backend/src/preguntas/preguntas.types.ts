import { LambdaTypes } from "@defol-cl/libs";
import { DynamoIterator, PreguntaDynamo } from "@defol-cl/root";

interface PreguntasGetEvent {
  usrId: number
  ejecutivo?: string
  estado?: string,
  lastKey?: any
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent, DynamoIterator<PreguntaDynamo[]>>;
