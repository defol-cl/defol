import { RootUtils } from "@defol-cl/root";
import { DynamoServices } from "@defol-cl/libs";
import {
  ResumenPreguntasGetHandler,
  UltimasActualizacionesGetHandler
} from "./dashboard.types";

export const resumenPreguntasGet: ResumenPreguntasGetHandler = async({ usrId }, context, callback) => {
  RootUtils.logger({usrId});
  try {
    const totalRealizadas = DynamoServices.countPreguntasByUser(usrId);
    const totalPendientes = DynamoServices.countPreguntasPendientesByUser(usrId);
    const totalReplicas = DynamoServices.countReplicasPendientesByUser(usrId);

    const totalPreguntasRealizadas = await totalRealizadas;
    const totalPreguntasPendientes = await totalPendientes;
    const totalReplicasPendientes = await totalReplicas;

    callback(null, {
      totalPreguntasPendientes,
      totalPreguntasRealizadas,
      totalReplicasPendientes
    });
  } catch (error) {
    console.log(error);
    callback(error);
  }
}

export const ultimasActualizacionesGet: UltimasActualizacionesGetHandler = async({ usrId }, context, callback) => {
  RootUtils.logger({usrId});
  try {
    const preguntas = await DynamoServices.getLastPreguntasByUserId(usrId, {limit: 5});
    callback(null, preguntas.items);
  } catch (error) {
    console.log(error);
    callback(error);
  }
}