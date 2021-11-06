import { PreguntaDynamo } from "..";

export interface ResumenPreguntas {
  totalPreguntasPendientes: number
  totalPreguntasRealizadas: number
  totalReplicasPendientes: number
}

export interface Pregunta extends PreguntaDynamo {
  
}