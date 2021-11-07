import React, { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import { Dao } from "@defol-cl/root";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "src/navigation";
import { DashboardSvc } from "src/services";
import EsqueletoActualizacionItem from './ultimas-actualizaciones/EsqueletoActualizacionItem';
import ActualizacionItem from "./ultimas-actualizaciones/ActualizacionItem";
import CardActions from '@mui/material/CardActions';

const UltimasActualizaciones: FC = () => {
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
    <Card sx={{ minHeight: '100%' }}>
      <CardHeader
        title="Últimas Actualizaciones"
        subheader="Revisa qué ha pasado desde tu última visita"/>
      <Divider/>
      <CardContent sx={{ pt: 0, px: 0, pb: '0 !important' }}>
        <List disablePadding>
          {actualizaciones === undefined && [1, 2].map(i =>
            <EsqueletoActualizacionItem key={i}/>
          )}
          {actualizaciones && actualizaciones.map(pregunta =>
            <ActualizacionItem pregunta={pregunta}/>
          )}
        </List>
      </CardContent>
      <CardActions>
        <Button color="primary" fullWidth
                onClick={() => history.push(privateRoutes.misActualizaciones.route())}>
          Ver todas
        </Button>
      </CardActions>
    </Card>
  );
}

export default UltimasActualizaciones;
