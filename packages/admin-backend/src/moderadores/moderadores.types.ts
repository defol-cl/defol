import { LambdaTypes } from "@defol-cl/libs";

interface BaseEvent {
  usrId: string
  permissions: string
}

interface ModeradoresPostEvent extends BaseEvent {
  emails: string
  convenioCod: string
  activo: boolean
}

export type ModeradoresPostHandler = LambdaTypes.CustomHandler<ModeradoresPostEvent>;
