import { LambdaTypes } from "@defol-cl/libs";
import { Dao } from "@defol-cl/root";

interface ConveniosGetEvent {
  usrId: string
}

export type ConveniosGetHandler = LambdaTypes.CustomHandler<ConveniosGetEvent, Dao.Convenio[]>;
