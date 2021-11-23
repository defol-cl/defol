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

const ReplicasPendientesIndicador: React.FC<Props> = ({ value }) => {
  const history = useHistory();
  
  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardActionArea onClick={() => history.push(privateRoutes.misPreguntas.route({ tipo: 'pendientes' }))}>
        <CardContent>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
            {value !== undefined && (
              <>
                <Typography variant="h1" component="h4">
                  <CountUp end={value} duration={2}/>
                </Typography>
                <Grid item xs={8}>
                  <Typography variant="overline" color="secondary">
                    Réplica(s) pendiente(s)
                  </Typography>
                  <Typography variant="body2">
                    Si te quedó alguno duda, o quieres ahondar en el detalle de la respuesta aprovecha de enviar la
                    correspondiente réplica, recuerda que vencen 14 días después de la respuesta.
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

export default ReplicasPendientesIndicador;
