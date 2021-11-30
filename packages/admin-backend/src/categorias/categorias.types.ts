import { LambdaTypes } from "@defol-cl/libs";
import { CategoriaDynamo, Dao } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
}

export type CategoriasGetHandler = LambdaTypes.CustomHandler<BaseEvent, Dao.Categoria[]>;
