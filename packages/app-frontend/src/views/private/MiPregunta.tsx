import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
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

interface Props {
  email: string
  timestamp: string
}

const MiPregunta: React.FC<Props> = ({ email, timestamp }) => {
  const history = useHistory();
  const [pregunta, setPregunta] = useState<Dao.Pregunta>();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.getOne(email, timestamp)
      .then(pregunta => mounted && setPregunta(pregunta));
    return () => {
      mounted = false;
    };
  }, [email, timestamp]);
  
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
  
  const formik = useFormik<FormikMiPregunta>({
    initialValues: {
      replica: '',
    },
    validationSchema: validationNuevaPregunta,
    validateOnMount: true,
    onSubmit: ({ replica }) => {
      console.log(replica);
      setSaving(true);
      history.push(privateRoutes.inicio.route());
    }
  });
  
  const {
    handleChange,
    handleBlur,
    values: { replica }
  } = formik;
  
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
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Button size="large" variant="contained" fullWidth>
                Enviar réplica
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button size="large" fullWidth onClick={() => history.goBack()}>
                Volver
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default MiPregunta;
