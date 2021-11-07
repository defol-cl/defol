import React, { FC, useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Redirect, useHistory } from "react-router-dom";
import moment from "moment";
import NuevaPreguntaContext from "./nueva-pregunta.context";
import { privateRoutes } from "src/navigation";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import { PreguntasSvc } from "../../../services";

const NuevaPreguntaPaso2: FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state, clear } = useContext(NuevaPreguntaContext);
  
  if (state && state.convenio) {
    const { convenio, titulo, antecedentes, pregunta } = state;
    
    const enviarPregunta = () => {
      setLoading(true);
      PreguntasSvc.post({ convenioCod: convenio.cod, titulo, antecedentes, pregunta })
        .then(() => {
          clear();
          history.push(privateRoutes.inicio.route());
        })
        .catch(() => setError(false))
        .finally(() => setLoading(false));
    };
    
    return (
      <>
        <Typography variant="h5" component="h1">
          Previsualizar pregunta
        </Typography>
        <Typography variant="body1" gutterBottom>
          Revisa la información antes de enviarla a nuestros especialistas
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom sx={{ pt: 2, color: grey[600] }}>
              {titulo}
            </Typography>
            <Typography variant="overline" display="block" color="info.main" gutterBottom>
              Jaime Aceite - {moment().format('DD-MM-YYYY')}
            </Typography>
            <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
              <b>Recurro a ustedes bajo los siguientes antecedentes...</b>
            </Typography>
            {antecedentes.split('\n').map((antecedente, index) => (
              <Typography key={index} variant="body2" sx={{ pb: 2 }}>
                {antecedente}
              </Typography>
            ))}
            <Divider sx={{ py: 2 }}/>
            <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
              <b>Para realizar la siguiente consulta...</b>
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: grey[600] }}>
              {pregunta}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={6}>
                <LoadingButton size="large" variant="contained" fullWidth
                               onClick={enviarPregunta}
                               loading={loading}
                               loadingIndicator="Enviando pregunta...">
                  Enviar pregunta
                </LoadingButton>
              </Grid>
              <Grid item xs={6}>
                <Button size="large" fullWidth
                        onClick={() => history.goBack()}
                        disabled={loading}>
                  Volver y editar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return <Redirect to={privateRoutes.nuevaPregunta.route()}/>;
  }
}

export default NuevaPreguntaPaso2;
