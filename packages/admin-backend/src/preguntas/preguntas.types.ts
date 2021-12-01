import { LambdaTypes } from "@defol-cl/libs";
import { Dao, DynamoIteratorFront, PreguntaDynamo } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
  permissions: string
}

interface PreguntasGetEvent extends BaseEvent {
  ejecutivo?: string
  estado?: string
  token?: string
}

interface PreguntaDetailEvent extends BaseEvent {
  contactoEmail: string
  timestamp: string
}

interface PreguntaPutEvent extends BaseEvent, PreguntaDetailEvent {
  replica: string
  contacto: string
  agregarReplica?: boolean
  categoria?: string
}

interface PreguntasReducedGetEvent extends BaseEvent {
  contacto: string
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent, DynamoIteratorFront<PreguntaDynamo>>;
export type PreguntasReducedGetHandler = LambdaTypes.CustomHandler<PreguntasReducedGetEvent, Dao.PreguntaMini[]>;
export type PreguntaDetailHandler = LambdaTypes.CustomHandler<PreguntaDetailEvent, Dao.Pregunta>;
export type PreguntaPutHandler = LambdaTypes.CustomHandler<PreguntaPutEvent>;
