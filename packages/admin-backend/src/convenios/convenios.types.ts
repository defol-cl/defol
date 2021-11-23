import { LambdaTypes } from "@defol-cl/libs";
import { ConvenioDynamo, Dao } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
  permissions: string
}
interface ConveniosGetEvent extends BaseEvent {
}

interface ConveniosPostEvent extends BaseEvent {
  convenio: ConvenioDynamo
}

interface ConvenioDetalleGetEvent extends BaseEvent {
  convenioCod: string
}

export type ConveniosGetHandler = LambdaTypes.CustomHandler<ConveniosGetEvent, ConvenioDynamo[]>;
export type ConvenioDetalleGetHandler = LambdaTypes.CustomHandler<ConvenioDetalleGetEvent, Dao.ConvenioContactoModerador>;
export type ConveniosPostHandler = LambdaTypes.CustomHandler<ConveniosPostEvent>;
