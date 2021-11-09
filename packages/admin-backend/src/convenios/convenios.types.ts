import { LambdaTypes } from "@defol-cl/libs";
import { ConvenioDynamo, RootTypes } from "@defol-cl/root";

interface ConveniosGetEvent {
  usrId: string
  groups: string
}

export type ConveniosGetHandler = LambdaTypes.CustomHandler<ConveniosGetEvent, ConvenioDynamo[]>;
