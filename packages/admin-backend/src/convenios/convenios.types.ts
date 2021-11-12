import { LambdaTypes } from "@defol-cl/libs";
import { ConvenioDynamo, DynamoIterator } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
}
interface ConveniosGetEvent extends BaseEvent {
  groups: string
}

interface ConveniosPostEvent extends BaseEvent {
  convenio: ConvenioDynamo
}

export type ConveniosGetHandler = LambdaTypes.CustomHandler<ConveniosGetEvent, ConvenioDynamo[]>;
export type ConveniosPostHandler = LambdaTypes.CustomHandler<ConveniosPostEvent>;
