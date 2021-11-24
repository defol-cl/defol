import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Dao, DynamoIteratorFront, RootEnum } from "@defol-cl/root";
import { Link as RouterLink } from "react-router-dom";
import { privateRoutes } from "src/navigation";
import { PreguntasSvc } from "src/services";
import EsqueletoActualizacionItem from "./EsqueletoActualizacionItem";
import PreguntaItem from "./PreguntaItem";

interface Props {
  estados?: RootEnum.EstadoPregunta[]
}

const PreguntaLista: React.FC<Props> = ({ estados }) => {
  const [response, setResponse] = useState<DynamoIteratorFront<Dao.Pregunta>>();
  
  useEffect(() => {
    let mounted = true;
    setResponse(undefined)
    PreguntasSvc.get(estados)
      .then(response => mounted && setResponse(response));
    return () => {
      mounted = false;
    };
  }, [estados]);
  
  return (
    <>
      <List disablePadding>
        {response === undefined && [1, 2].map(i =>
          <EsqueletoActualizacionItem key={i}/>
        )}
        {response && response.items.length > 0 && response.items.map((pregunta, index) =>
          <PreguntaItem key={index} pregunta={pregunta}/>
        )}
      </List>
      {response && response.items.length === 0 && (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
              sx={{ minHeight: 200, p: 3 }}>
          <Grid item>
            <Typography variant="h5" gutterBottom component="h3" align="center" color="textSecondary"
                        sx={{ mt: 3 }}>
              Aún no existen preguntas
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

export default PreguntaLista;
