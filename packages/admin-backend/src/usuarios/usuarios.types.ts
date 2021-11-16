import { LambdaTypes } from "@defol-cl/libs";

interface BaseEvent {
  usrId: string
}

interface UsuariosPostEvent extends BaseEvent {
  emails: string
  convenioCod: string
  preguntasMax: number
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<UsuariosPostEvent>;
