import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Skeleton from '@mui/material/Skeleton';
import { Dao } from '@defol-cl/root';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { CategoriasSvc, PreguntasSvc } from "src/services";
import { privateRoutes } from 'src/navigation';
import { FormikPreguntaDetalle, validationPreguntaDetalle } from "./pregunta-detalle.formik";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Select } from "@mui/material";

interface Props {
  email: string
  timestamp: string
}

const PreguntaDetalle: React.FC<Props> = ({ email, timestamp }) => {
  const history = useHistory();
  const [pregunta, setPregunta] = useState<Dao.Pregunta>();
  const [categorias, setCategorias] = useState<Dao.Categoria[]>([]);
  const [contraPregunta, setContraPregunta] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.getOne(email, timestamp)
      .then(pregunta => mounted && setPregunta(pregunta));
    CategoriasSvc.get()
      .then(categorias => mounted && setCategorias(categorias));
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
  
  const enviarRespuesta = () => {
    setSaving(true);
    PreguntasSvc.put(email, timestamp, respuesta, categoria, contraPregunta)
      .then(() => {
        history.push(privateRoutes.preguntasListado.route());
      })
      .catch(() => {
        setError(false);
      })
      .finally(() => setSaving(false))
  };
  
  const formik = useFormik<FormikPreguntaDetalle>({
    initialValues: {
      respuesta: '',
      categoria: '',
    },
    validationSchema: validationPreguntaDetalle,
    validateOnMount: true,
    onSubmit: () => {
      enviarRespuesta();
    }
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
    values: { respuesta, categoria }
  } = formik;
  
  let hasRespuesta = false;
  let hasContraPregunta = false;
  if (pregunta && pregunta.interacciones.length > 0 && pregunta.interacciones[pregunta.interacciones.length - 1].replica === undefined) {
    hasRespuesta = true;
    if (pregunta.interaccionesCantidad === pregunta.interaccionesMax) {
      hasContraPregunta = true;
    }
  }
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
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
          {hasRespuesta && (
            <>
              <TextField
                id="respuesta"
                label="Respuesta"
                multiline
                minRows={5}
                fullWidth
                value={respuesta}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <FormControl fullWidth>
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select labelId="categoria-label" id="categoria" label="Categoria"
                        value={categoria === null ? undefined : categoria}
                        onChange={event => setFieldValue('categoria', event.target.value)}>
                  <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem>
                  {categorias.map(categoria => (
                    <MenuItem key={categoria.cod} value={categoria.nombre}>{categoria.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {hasContraPregunta && (
            <FormControlLabel
              label={<>Si seleccionas esta opción habilitarás la posibilidad de que el usuario pueda generar <b>una
                nueva
                contra pregunta</b>.</>}
              control={
                <Checkbox color="secondary" value={contraPregunta}
                          onChange={event => setContraPregunta(event.target.checked)}/>
              }/>
          )}
          <Grow in={error} mountOnEnter unmountOnExit>
            <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 1 }}
                   action={
                     <Button color="inherit" size="small" onClick={() => enviarRespuesta()}>
                       Reintentar
                     </Button>
                   }>
              <AlertTitle>Esto es un poco incómodo</AlertTitle>
              Ocurrió un error al enviar la respuesta.<br/>Te proponemos 2 alternativas, reintenta ahora mismo o
              reporta este error para que podamos solucionarlo.
            </Alert>
          </Grow>
        </CardContent>
        <CardActions>
          <Grid container spacing={2} sx={{ mx: 1, mb: 1 }}>
            <Grid item xs={6}>
              <Button size="large" fullWidth onClick={() => history.push(privateRoutes.preguntasListado.route())}>
                Volver
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton type="submit" size="large" variant="contained"
                             fullWidth disabled={!pregunta || !isValid}
                             loading={saving}
                             loadingIndicator="Enviando réplica...">
                Enviar réplica
              </LoadingButton>
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
}

export default PreguntaDetalle;
