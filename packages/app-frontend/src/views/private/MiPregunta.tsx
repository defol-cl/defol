import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { useHistory, useParams } from "react-router-dom";
import { Grow, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { Dao } from "@defol-cl/root";
import { useFormik } from "formik";
import { privateRoutes } from "src/navigation";
import { PreguntasSvc } from 'src/services';
import { validationNuevaPregunta } from "./nueva-pregunta/nueva-pregunta.formik";
import { FormikMiPregunta } from "./mi-pregunta/mi-pregunta.formik";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Params {
  timestamp: string
}

const MiPregunta: React.FC = () => {
  const { timestamp } = useParams<Params>();
  const history = useHistory();
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
    onSubmit: ({ replica }) => {
      putPregunta();
    }
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
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ pt: 2, color: grey[600] }}>
            {pregunta ? pregunta.titulo : <Skeleton variant="text" width={200}/>}
          </Typography>
          <Typography variant="overline" display="block" color="info.main" gutterBottom>
            {pregunta ? `${pregunta.contactoNombre} - ${pregunta.timestamp} hrs` :
              <Skeleton variant="text" width={100}/>}
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            {pregunta ? <b>Recurro a ustedes bajo los siguientes antecedentes...</b> :
              <Skeleton variant="text" width={120}/>}
          </Typography>
          {pregunta ?
            <Typography variant="body2" sx={{ pb: 2 }}>{pregunta.antecedentes}</Typography> :
            [1, 2, 3].map(i => <Skeleton key={i} variant="text"/>)
          }
          <Box sx={{ py: 2 }}>
            <hr/>
          </Box>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            {pregunta ? <b>Preguntas y respuestas</b> : <Skeleton variant="text" width={70}/>}
          </Typography>
          {pregunta && pregunta.interacciones.map((interaccion, index) => (
            <div key={index}>
              <Typography variant="body1">
                {interaccion.pregunta}
              </Typography>
              <Typography variant="overline" display="block" color="info.main" gutterBottom>
                {interaccion.preguntaAt} hrs
              </Typography>
              {interaccion.replica && (
                <>
                  <Typography variant="body1" sx={{ pb: 2 }}>
                    {interaccion.replica}
                  </Typography>
                  <Typography variant="overline" display="block" color="info.main" gutterBottom>
                    {interaccion.ejecutivoNombre}, Equipo DEFOL - {interaccion.replicaAt} hrs
                  </Typography>
                </>
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
                  label="Pregunta"
                  helperText="Indícanos cuál es tu consulta, siendo lo más claro posible."
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
                  <LoadingButton type="submit" size="large" variant="contained" fullWidth
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
