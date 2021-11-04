import { LambdaTypes } from "@defol-cl/libs";

interface PreguntasGetEvent {
  usrId: number
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent>;
