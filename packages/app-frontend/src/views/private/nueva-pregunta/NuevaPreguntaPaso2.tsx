import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import { CardActions, Grow, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import { Auth } from "aws-amplify";
import moment from "moment";
import { Redirect, useHistory } from "react-router-dom";
import NuevaPreguntaContext from "./nueva-pregunta.context";
import { privateRoutes } from "src/navigation";
import { PreguntasSvc } from "src/services";

const NuevaPreguntaPaso2: React.FC = () => {
  const history = useHistory();
  const [fullName, setFullName] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state, clear } = useContext(NuevaPreguntaContext);
  
  useEffect(() => {
    let mounted = true;
    Auth.currentUserInfo()
      .then(info => {
        mounted && info && setFullName(`${info.attributes.given_name} ${info.attributes.family_name}`);
      })
      .catch(() => mounted && setError(true));
    return () => {
      mounted = false;
    };
  }, []);
  
  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error]);
  
  useEffect(() => {
    if(loading) {
      setError(false);
    }
  }, [loading]);
  
  if (state && state.convenio) {
    const { convenio, titulo, antecedentes, pregunta } = state;
    const enviarPregunta = () => {
      setLoading(true);
      PreguntasSvc.post({ convenioCod: convenio.cod, titulo, antecedentes, pregunta })
        .then(() => {
          clear();
          history.push(privateRoutes.inicio.route());
        })
        .catch(() => setError(true))
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
            {fullName && (
              <Typography variant="overline" display="block" color="info.main" gutterBottom>
                {fullName} - {moment().format('DD-MM-YYYY')}
              </Typography>
            )}
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
            <Grow in={error} mountOnEnter unmountOnExit>
              <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 1 }}
                     action={
                       <Button color="inherit" size="small" onClick={() => enviarPregunta()}>
                         Reintentar
                       </Button>
                     }>
                <AlertTitle>Esto es un poco incómodo</AlertTitle>
                Ocurrió un error al crear la nueva pregunta.<br/>Te proponemos 2 alternativas, reintenta ahora mismo o
                conéctate más tarde y vuelve a intentarlo, y danos un poco de tiempo para reparar este problema.
              </Alert>
            </Grow>
          </CardContent>
          <Divider/>
          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button size="large" fullWidth
                        onClick={() => history.goBack()}
                        disabled={loading}>
                  Volver y editar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <LoadingButton size="large" variant="contained" fullWidth
                               onClick={enviarPregunta}
                               loading={loading}
                               loadingIndicator="Enviando pregunta...">
                  Enviar pregunta
                </LoadingButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </>
    );
  } else {
    return <Redirect to={privateRoutes.nuevaPregunta.route()}/>;
  }
}

export default NuevaPreguntaPaso2;
