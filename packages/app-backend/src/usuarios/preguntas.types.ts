import { LambdaTypes } from "@defol-cl/libs";

interface PreguntasGetEvent {
  usuId: number
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent>;
