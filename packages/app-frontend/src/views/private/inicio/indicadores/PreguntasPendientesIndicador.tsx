import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CountUp from 'react-countup';
import { useHistory } from "react-router-dom";
import { privateRoutes } from "src/navigation";
import EsqueletoInternoIndicador from "./EsqueletoInternoIndicador";

interface Props {
  value?: number
}

const PreguntasPendientesIndicador: React.FC<Props> = ({ value }) => {
  const history = useHistory();
  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardActionArea onClick={() => history.push(privateRoutes.nuevaPregunta.route())}>
        <CardContent>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
            {value !== undefined && (
              <>
                <Typography variant="h1" component="h4">
                  <CountUp end={value} duration={2}/>
                </Typography>
                <Grid item xs={8}>
                  <Typography variant="overline" color="secondary">
                    Pregunta(s) pendiente(s)
                  </Typography>
                  <Typography variant="body2">
                    Son las preguntas pendientes que tienes disponibles para realizar en cualquier momento. Algunos
                    cupones
                    tienen fecha de caducidad, por lo que te invitamos a usarlas antes de que expiren.
                  </Typography>
                </Grid>
              </>
            )}
            {value === undefined && (
              <EsqueletoInternoIndicador/>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PreguntasPendientesIndicador;
