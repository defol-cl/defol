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
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";
import { useTheme } from "@mui/material/styles";
import { Auth } from "aws-amplify";
import moment from "moment";
import { Redirect, useHistory } from "react-router-dom";
import { privateRoutes } from "src/navigation";
import { PreguntasSvc } from "src/services";
import Fecha from 'src/components/Fecha';
import NuevaPreguntaContext from "./nueva-pregunta.context";
import Box from "@mui/material/Box";

const NuevaPreguntaPaso2: React.FC = () => {
  const theme = useTheme();
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
          <CardHeader title={titulo}
                      subheader={
                        <>
                          {fullName && (
                            <Typography variant="overline" display="block" color="info.main" gutterBottom>
                              {fullName} - {moment().format('DD-MM-YYYY')}
                            </Typography>
                          )}
                        </>
                      }/>
          <Divider/>
          <CardContent>
            <Typography variant="h6" sx={{ pb: 2, color: theme.palette.primary.light }}>
              Antecedentes
            </Typography>
            <Typography variant="body2" sx={{ pb: 2, whiteSpace: 'pre-wrap' }}>{antecedentes}</Typography>
            <Box sx={{
              border: '1px solid',
              borderLeft: '6px solid',
              borderColor: theme.palette.primary.light,
              backgroundColor: grey[100],
              p: 2,
              pl: 3,
              mt: 2,
              mb: 1
            }}>
              <Typography variant="body1" sx={{ pb: 0 }}>
                <b>{pregunta}</b>
              </Typography>
              <Typography variant="body2" display="block" color="primary.main" gutterBottom>
                {fullName}
              </Typography>
            </Box>
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
