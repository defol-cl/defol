import React, { FC, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { PreguntasSvc } from '../../services';
import Indicadores from "./inicio/Indicadores";
import UltimasActualizaciones from './inicio/UltimasActualizaciones';

const Inicio: FC = () => {
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  return (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <UltimasActualizaciones/>
      </Grid>
      <Grid item md={4}>
        <Indicadores/>
      </Grid>
    </Grid>
  );
}

export default Inicio;
