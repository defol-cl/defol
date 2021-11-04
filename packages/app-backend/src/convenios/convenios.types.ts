import { LambdaTypes } from "@defol-cl/libs";
import { ConvenioDynamo } from "@defol-cl/root";

interface ConveniosGetEvent {
  usrId: number
}

export type ConveniosGetHandler = LambdaTypes.CustomHandler<ConveniosGetEvent, ConvenioDynamo[]>;
