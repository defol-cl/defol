import { LambdaTypes } from "@defol/libs";

interface PreguntasGetEvent {
  usuId: number
}

export type PreguntasGetHandler = LambdaTypes.CustomHandler<PreguntasGetEvent>;
