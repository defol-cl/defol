import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import PreguntasRealizadasIndicador from './indicadores/PreguntasRealizadasIndicador';
import ReplicasPendientesIndicador from "./indicadores/ReplicasPendientesIndicador";
import PreguntasPendientesIndicador from "./indicadores/PreguntasPendientesIndicador";
import { DashboardSvc } from "../../../services";
import { Dao } from "@defol-cl/root";

const Indicadores: React.FC = () => {
  const [resumen, setResumen] = useState<Dao.ResumenPreguntas>();
  
  useEffect(() => {
    DashboardSvc.resumenPreguntas()
      .then(resumen => setResumen(resumen));
  }, []);
  
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <PreguntasRealizadasIndicador value={resumen?.totalPreguntasRealizadas}/>
      </Grid>
      <Grid item md={12}>
        <ReplicasPendientesIndicador value={resumen?.totalReplicasPendientes}/>
      </Grid>
      <Grid item md={12}>
        <PreguntasPendientesIndicador value={resumen?.totalPreguntasPendientes}/>
      </Grid>
    </Grid>
  );
}

export default Indicadores;
