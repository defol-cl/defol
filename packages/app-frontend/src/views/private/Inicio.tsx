import React, { FC, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { PreguntasSvc } from 'src/services';
import Indicadores from "./inicio/Indicadores";
import UltimasActualizaciones from './inicio/UltimasActualizaciones';

const Inicio: FC = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.get()
      .then(response => mounted && console.log(response));
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <UltimasActualizaciones/>
      </Grid>
      {mdUp && (
        <Grid item xs={12} md={4}>
          <Indicadores/>
        </Grid>
      )}
    </Grid>
  );
}

export default Inicio;
