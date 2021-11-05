import { RootUtils } from "@defol-cl/root";
import { DynamoServices } from "libs/src/services";
import { ResumenPreguntasGetHandler } from "./dashboard.types";

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