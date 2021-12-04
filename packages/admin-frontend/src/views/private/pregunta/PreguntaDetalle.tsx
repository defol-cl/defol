import React, { useEffect, useState } from 'react';
import { grey } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
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
import Fecha from "src/components/Fecha";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";

interface Props {
  email: string
  timestamp: string
}

const PreguntaDetalle: React.FC<Props> = ({ email, timestamp }) => {
  const theme = useTheme();
  const history = useHistory();
  const [pregunta, setPregunta] = useState<Dao.Pregunta>();
  const [categorias, setCategorias] = useState<Dao.Categoria[]>([]);
  const [contraPregunta, setContraPregunta] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.getOne(email, timestamp)
      .then(pregunta => {
        if (mounted) {
          setPregunta(pregunta);
          CategoriasSvc.get()
            .then(categorias => {
              if (mounted) {
                setCategorias(categorias);
                pregunta.categoria && setFieldValue('categoria', pregunta.categoria);
              }
            });
        }
      });
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
  
  let hasRespuesta = false, hasContraPregunta = false;
  if (pregunta && pregunta.interacciones.length > 0 && pregunta.interacciones[pregunta.interacciones.length - 1].replica === undefined) {
    hasRespuesta = true;
    if (pregunta.interaccionesCantidad + 1 === pregunta.interaccionesMax) {
      hasContraPregunta = true;
    }
  }
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
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
                borderColor: theme.palette.info.light,
                backgroundColor: grey[100],
                p: 2,
                pl: 3,
                mt: 2,
                mb: 1
              }}>
                <Typography variant="body1" sx={{ pb: 0 }}>
                  <b>{interaccion.pregunta}</b>
                </Typography>
                <Typography variant="body2" display="block" color="info.main" gutterBottom>
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
