import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Grow, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { Dao } from "@defol-cl/root";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { validationNuevaPregunta } from "./nueva-pregunta/nueva-pregunta.formik";
import { FormikMiPregunta } from "./mi-pregunta/mi-pregunta.formik";
import { privateRoutes } from "src/navigation";
import { PreguntasSvc } from 'src/services';
import Fecha from "src/components/Fecha";

interface Params {
  timestamp: string
}

const MiPregunta: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const { timestamp } = useParams<Params>();
  const [pregunta, setPregunta] = useState<Dao.Pregunta>();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.getOne(timestamp)
      .then(pregunta => mounted && setPregunta(pregunta));
    return () => {
      mounted = false;
    };
  }, [timestamp]);
  
  useEffect(() => {
    if (error) {
      setSaving(false);
    }
  }, [error]);
  
  useEffect(() => {
    if (saving) {
      setError(false);
    }
  }, [saving]);
  
  const putPregunta = () => {
    setSaving(true);
    PreguntasSvc.put(replica, timestamp)
      .then(() => {
        history.push(privateRoutes.inicio.route());
      })
      .catch(() => {
        setError(true);
      });
  }
  
  const formik = useFormik<FormikMiPregunta>({
    initialValues: {
      replica: '',
    },
    validationSchema: validationNuevaPregunta,
    validateOnMount: true,
    onSubmit: () => {}
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values: { replica }
  } = formik;
  
  const replicar = pregunta && pregunta.estado === 'RESPONDIDA';
  
  return (
    <>
      <Typography variant="h5" component="h1">
        Detalles de la pregunta
      </Typography>
      <Typography variant="body1" gutterBottom>
        Revisa aquí toda la interacción asociada a tu pregunta
      </Typography>
      <Card>
        <CardHeader title={pregunta ? pregunta.titulo : <Skeleton variant="text" width={200}/>}
                    subheader={pregunta ?
                      <>{pregunta.contactoNombre} - <Fecha timestamp={pregunta.timestamp}/></> :
                      <Skeleton variant="text" width={100}/>
                    }/>
        <Divider/>
        <CardContent>
          <Typography variant="h6" sx={{ pb: 2, color: theme.palette.primary.light }}>
            {pregunta ? 'Antecedentes' :
              <Skeleton variant="text" width={120}/>}
          </Typography>
          {pregunta ?
            <Typography variant="body2" sx={{ pb: 2, whiteSpace: 'pre-wrap' }}>{pregunta.antecedentes}</Typography> :
            [1, 2, 3].map(i => <Skeleton key={i} variant="text"/>)
          }
          {pregunta && pregunta.interacciones.map((interaccion, index) => (
            <div key={index}>
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
                  <b>{interaccion.pregunta}</b>
                </Typography>
                <Typography variant="body2" display="block" color="primary.main" gutterBottom>
                  {pregunta.contactoNombre} - <Fecha timestamp={interaccion.preguntaAt}/>
                </Typography>
              </Box>
              {interaccion.replica && (
                <Box sx={{
                  border: '1px solid',
                  borderLeft: '6px solid',
                  borderColor: theme.palette.secondary.light,
                  backgroundColor: grey[100],
                  p: 2,
                  pl: 3,
                  mt: 1,
                  mb: 3
                }}>
                  <Typography variant="body1" sx={{ pb: 1, whiteSpace: 'pre-wrap' }}>
                    {interaccion.replica}
                  </Typography>
                  <Typography variant="body2" display="block" color="secondary.main" gutterBottom>
                    Respondido por {interaccion.ejecutivoNombre}, Equipo DEFOL - <Fecha
                    timestamp={interaccion.replicaAt}/>
                  </Typography>
                </Box>
              )}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            {replicar && (
              <>
                <Box sx={{ py: 2 }}>
                  <hr/>
                </Box>
                <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
                  <b>Quiero manifestar la siguiente réplica...</b>
                </Typography>
                <TextField
                  id="replica"
                  helperText="Indícanos cuál es tu réplica, siendo lo más claro posible."
                  multiline
                  minRows={5}
                  fullWidth
                  value={replica}
                  sx={{ mt: 2 }}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
              </>
            )}
            <Grow in={error} mountOnEnter unmountOnExit>
              <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 1 }}
                     action={
                       <Button color="inherit" size="small" onClick={() => putPregunta()}>
                         Reintentar
                       </Button>
                     }>
                <AlertTitle>Esto es un poco incómodo</AlertTitle>
                Ocurrió un error al enviar tu réplica.<br/>Te proponemos 2 alternativas, reintenta ahora mismo o
                conéctate más tarde y vuelve a intentarlo, y danos un poco de tiempo para reparar este problema.
              </Alert>
            </Grow>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={replicar ? 6 : 12}>
                <Button size="large" fullWidth onClick={() => history.goBack()}>
                  Volver
                </Button>
              </Grid>
              {replicar && (
                <Grid item xs={6}>
                  <LoadingButton size="large" variant="contained" fullWidth
                                 onClick={() => putPregunta()}
                                 loading={saving}
                                 loadingIndicator="Enviando réplica...">
                    Enviar réplica
                  </LoadingButton>
                </Grid>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default MiPregunta;
