import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { Dao } from "@defol-cl/root";
import { DashboardSvc } from "../../../services";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { privateRoutes } from "../../../navigation";
import EsqueletoActualizacionItem from "./EsqueletoActualizacionItem";
import PreguntaItem from "./PreguntaItem";

const ActualizacionLista: React.FC = () => {
  const [actualizaciones, setActualizaciones] = useState<Dao.Pregunta[]>();
  
  useEffect(() => {
    let mounted = true;
    DashboardSvc.ultimasActualizaciones()
      .then(actualizaciones => mounted && setActualizaciones(actualizaciones.items));
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <>
      <List disablePadding>
        {actualizaciones === undefined && [1, 2].map(i =>
          <EsqueletoActualizacionItem key={i}/>
        )}
        {actualizaciones && actualizaciones.length > 0 && actualizaciones.map((pregunta, index) =>
          <PreguntaItem key={index} pregunta={pregunta}/>
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
    </>
  );
}

export default ActualizacionLista;
