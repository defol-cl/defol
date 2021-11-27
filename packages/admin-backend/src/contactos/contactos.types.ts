import { LambdaTypes } from "@defol-cl/libs";
import { Dao } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
  permissions: string
}

interface ContactosPostEvent extends BaseEvent {
  emails: string
  convenioCod: string
  preguntasMax: number
}

interface ContactosMaxPreguntasPutEvent extends BaseEvent {
  email: string
  convenioCod: string
  preguntasMax: number
}

export type ContactosPostHandler = LambdaTypes.CustomHandler<ContactosPostEvent, Dao.ContactoPost>;
export type ContactosMaxPreguntasPutHandler = LambdaTypes.CustomHandler<ContactosMaxPreguntasPutEvent>;
