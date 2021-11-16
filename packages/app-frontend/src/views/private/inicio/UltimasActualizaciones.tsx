import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import { Dao } from "@defol-cl/root";
import { Link as RouterLink, useHistory } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { privateRoutes } from "src/navigation";
import { DashboardSvc } from "src/services";
import EsqueletoActualizacionItem from './ultimas-actualizaciones/EsqueletoActualizacionItem';
import ActualizacionItem from "./ultimas-actualizaciones/ActualizacionItem";
import Grid from "@mui/material/Grid";

const UltimasActualizaciones: React.FC = () => {
  const history = useHistory();
  const [actualizaciones, setActualizaciones] = useState<Dao.Pregunta[]>();
  
  useEffect(() => {
    let mounted = true;
    DashboardSvc.ultimasActualizaciones()
      .then(actualizaciones => mounted && setActualizaciones(actualizaciones));
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <Card sx={{ mt: 0 }}>
      <CardHeader
        title="Últimas Actualizaciones"
        subheader="Revisa qué ha pasado desde tu última visita"/>
      <Divider/>
      <CardContent sx={{ pt: 0, px: 0 }}>
        <List disablePadding>
          {actualizaciones === undefined && [1, 2].map(i =>
            <EsqueletoActualizacionItem key={i}/>
          )}
          {actualizaciones && actualizaciones.length > 0 && actualizaciones.map(pregunta =>
            <ActualizacionItem pregunta={pregunta}/>
          )}
        </List>
        {actualizaciones && actualizaciones.length === 0 && (
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
                sx={{ minHeight: 200, p: 3 }}>
            <Grid item>
              <Typography variant="h5" gutterBottom component="h3" align="center" color="textSecondary"
                          sx={{ mt: 3 }}>
                Aún no existen actualizaciones
              </Typography>
              <Typography variant="body1" gutterBottom align="center" color="textPrimary">
                Te invitamos a realizar una <Link component={RouterLink} to={privateRoutes.nuevaPregunta.route()}>
                nueva pregunta</Link> a nuestro equipo legal, las últimas novedades aparecerán listadas aquí
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
      {actualizaciones && actualizaciones.length === 0 && (
        <Divider sx={{ my: 0 }}/>
      )}
      <CardActions>
        <Button color="secondary" fullWidth
                onClick={() => history.push(privateRoutes.misActualizaciones.route())}>
          Ver todas
        </Button>
      </CardActions>
    </Card>
  );
}

export default UltimasActualizaciones;
