import React, { FC, useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { FormikNuevaPregunta, validationNuevaPregunta } from "./nueva-pregunta.formik";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "src/navigation";
import { Typography } from "@mui/material";
import ConveniosList from "./ConveniosList";
import PreguntaForm from './PreguntaForm';
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import NuevaPreguntaContext from "./nueva-pregunta.context";
import { Dao } from "@defol-cl/root";
import { useBoolean } from "react-use";
import { ConveniosSvc } from "../../../services";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const NuevaPregunta: FC = () => {
  const history = useHistory();
  const { setData } = useContext(NuevaPreguntaContext);
  const [convenios, setConvenios] = useState<Dao.Convenio[]>();
  const [errorConvenio, setErrorConvenio] = useBoolean(false);
  
  useEffect(() => {
    let mounted = true;
    if (!errorConvenio) {
      ConveniosSvc.get()
        .then(convenios => mounted && setConvenios(convenios))
        .catch(err => {
          console.error(err);
          mounted && setErrorConvenio(true);
        })
    }
    return () => {
      mounted = false;
    };
  }, [errorConvenio]);
  
  const formik = useFormik<FormikNuevaPregunta>({
    initialValues: {
      titulo: '',
      antecedentes: '',
      pregunta: '',
    },
    validationSchema: validationNuevaPregunta,
    validateOnMount: true,
    onSubmit: ({ convenio, titulo, antecedentes, pregunta }) => {
      convenio && setData({ convenio, titulo, antecedentes, pregunta })
      history.push(privateRoutes.nuevaPreguntaPaso.route({ paso: 'paso2' }));
    }
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values: { convenio, titulo, antecedentes, pregunta }
  } = formik;
  
  if (errorConvenio) {
    return (
      <Alert variant="outlined" severity="error" sx={{ mb: 2 }}
             action={
               <Button color="inherit" size="small" onClick={() => setErrorConvenio(false)}>
                 Reintentar ahora
               </Button>
             }>
        <AlertTitle>Esto es un poco incómodo</AlertTitle>
        Ocurrió un error al obtener el listado de convenios disponibles.<br/>Te proponemos 2 alternativas, reintenta
        ahora o conéctate más tarde y vuelve a intentarlo, y danos un poco de tiempo para reparar este problema.
      </Alert>
    );
  } else {
    return (
      <>
        <Typography variant="h4" component="h1">
          Realizar una nueva pregunta
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          En esta sección podrás exponer los antecedentes pertinentes y realizar tu consulta.
        </Typography>
        {errorConvenio && (
          <Alert variant="outlined" severity="error" sx={{ mb: 2 }}
                 action={
                   <Button color="inherit" size="small" onClick={() => setErrorConvenio(false)}>
                     Reintentar ahora
                   </Button>
                 }>
            <AlertTitle>Esto es un poco incómodo</AlertTitle>
            Ocurrió un error al obtener el listado de convenios disponibles.<br/>Te proponemos 2 alternativas, reintenta
            ahora o conéctate más tarde y vuelve a intentarlo, y danos un poco de tiempo para reparar este problema.
          </Alert>
        )}
        {!errorConvenio && (
          <>
            {convenios && convenios.length === 0 && (
              <Card>
                <CardHeader title="No cuentas con un convenio activo"
                            subheader="Los convenios te permiten realizar una cantidad limitada de preguntas"/>
                <Divider/>
                <CardContent>
                  <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
                        sx={{ minHeight: 200, p: 3 }}>
                    <Grid item>
                      <Typography variant="h5" gutterBottom component="h3" align="center" color="textSecondary"
                                  sx={{ mt: 3 }}>
                        Muy pronto podrás realizar preguntas sin necesidad de convenios
                      </Typography>
                      <Typography variant="body1" gutterBottom align="center" color="textPrimary">
                        Estamos trabajando para ir ampliando la gama de funcionalidades de la plataforma, y que no sólo
                        sea a través de convenios con instituciones, esperamos poder ofrecerte esta funcionalidad
                        prontamente
                      </Typography>
                    </Grid>
                  
                  </Grid>
                </CardContent>
              </Card>
            )}
            {convenios && convenios.length > 0 && (
              <form onSubmit={handleSubmit}>
                <ConveniosList convenios={convenios} convenio={convenio} setFieldValue={setFieldValue}/>
                <Card>
                  <CardHeader title="Detalle de la pregunta" subheader="Cuéntanos en detalle cómo podemos orientarte"/>
                  <Divider/>
                  <CardContent>
                    <PreguntaForm titulo={titulo} antecedentes={antecedentes} pregunta={pregunta}
                                  handleChange={handleChange} handleBlur={handleBlur}/>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                      <Grid item xs={6}>
                        <Button
                          size="large" type="submit" variant="contained" fullWidth
                          disabled={!formik.isValid}>
                          Previsualizar
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button size="large" fullWidth onClick={() => history.goBack()}>
                          Cancelar
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            )}
          </>
        )}
      </>
    );
  }
}

export default NuevaPregunta;
