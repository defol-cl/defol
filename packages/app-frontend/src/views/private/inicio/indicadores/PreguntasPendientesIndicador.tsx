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
      <CardActionArea onClick={() => history.push(privateRoutes.misPreguntas.route())}>
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
                    Son las preguntas que aún no se han cerrado, que están a la espera de que el equipo DEFOL responda o
                    que tú hagas tu réplica.
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
