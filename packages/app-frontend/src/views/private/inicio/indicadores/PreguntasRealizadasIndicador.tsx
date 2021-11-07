import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CountUp from 'react-countup';
import { useHistory } from "react-router-dom";
import EsqueletoInternoIndicador from "./EsqueletoInternoIndicador";
import { privateRoutes } from 'src/navigation';

interface Props {
  value?: number
}

const PreguntasRealizadasIndicador: React.FC<Props> = ({ value }) => {
  const history = useHistory();
  
  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardActionArea onClick={() => history.push(privateRoutes.misPreguntas.route())}>
        <CardContent>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
            {value && (
              <>
                <Typography variant="h1" component="h4">
                  <CountUp end={value} duration={2}/>
                </Typography>
                <Grid item xs={8}>
                  <Typography variant="overline" color="secondary">
                    Preguntas realizadas
                  </Typography>
                  <Typography variant="body2">
                    Puedes revisar el historial de las preguntas que ya has realizado, será tu material de consulta que
                    estará
                    disponible cada vez que lo necesites.
                  </Typography>
                </Grid>
              </>
            )}
            {!value && (
              <EsqueletoInternoIndicador/>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PreguntasRealizadasIndicador;
