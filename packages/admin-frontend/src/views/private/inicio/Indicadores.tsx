import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../../navigation";

const Indicadores: FC = () => {
  const history = useHistory();
  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <Card sx={{ minHeight: '100%' }}>
          <CardActionArea onClick={() => history.push(privateRoutes.conveniosListado.route())}>
            <CardContent>
              <Typography variant="h1" component="h4">27</Typography>
              <Typography variant="overline" color="secondary">
                Convenios vigentes
              </Typography>
              <Typography variant="body2">
                4 nuevos en los últimos 30 días
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card sx={{ minHeight: '100%' }}>
          <CardActionArea
            onClick={() => history.push(privateRoutes.preguntasListado.route({ tipo: 'respuesta-pendiente' }))}>
            <CardContent>
              <Typography variant="h1" component="h4">313</Typography>
              <Typography variant="overline" color="secondary">
                Nuevas Preguntas
              </Typography>
              <Typography variant="body2">
                Últimos 7 días
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card sx={{ minHeight: '100%' }}>
          <CardActionArea onClick={() => history.push(privateRoutes.preguntasListado.route())}>
            <CardContent>
              <Typography variant="h1" component="h4">20</Typography>
              <Typography variant="overline" color="secondary">
                Respuestas pendientes
              </Typography>
              <Typography variant="body2">
                Con más de 12 hrs desde su ingreso
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Indicadores;
