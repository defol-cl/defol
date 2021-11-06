import { LambdaTypes } from "@defol-cl/libs";
import { Dao } from "@defol-cl/root";

interface BaseEvent {
  usrId: string
}

export type ResumenPreguntasGetHandler = LambdaTypes.CustomHandler<BaseEvent, Dao.ResumenPreguntas>;
export type UltimasActualizacionesGetHandler = LambdaTypes.CustomHandler<BaseEvent, Dao.Pregunta[]>;