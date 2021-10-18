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
  console.log(privateRoutes.nuevaPregunta.route());
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Card sx={{ minHeight: '100%' }}>
          <CardActionArea onClick={() => history.push(privateRoutes.misPreguntas.route())}>
            <CardContent>
              <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <Typography variant="h1" component="h4">4</Typography>
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
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item md={12}>
        <Card sx={{ minHeight: '100%' }}>
          <CardActionArea onClick={() => history.push(privateRoutes.misPreguntas.route({tipo: 'replica-pendiente'}))}>
            <CardContent>
              <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <Typography variant="h1" component="h4">3</Typography>
                <Grid item xs={8}>
                  <Typography variant="overline" color="secondary">
                    Réplica(s) pendiente(s)
                  </Typography>
                  <Typography variant="body2">
                    Si te quedó alguno duda, o quieres ahondar en el detalle de la respuesta aprovecha de enviar la
                    correspondiente réplica, recuerda que vencen 14 días después de la respuesta.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item md={12}>
        <Card sx={{ minHeight: '100%' }}>
          <CardActionArea onClick={() => history.push(privateRoutes.nuevaPregunta.route())}>
            <CardContent>
              <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <Typography variant="h1" component="h4">1</Typography>
                <Grid item xs={8}>
                  <Typography variant="overline" color="secondary">
                    Pregunta(s) pendiente(s)
                  </Typography>
                  <Typography variant="body2">
                    Son las preguntas pendientes que tienes disponibles para realizar en cualquier momento. Algunos cupones
                    tienen fecha de caducidad, por lo que te invitamos a usarlas antes de que expiren.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Indicadores;
