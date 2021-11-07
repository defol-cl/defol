import React, { FC, useContext } from 'react';
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

const NuevaPregunta: FC = () => {
  const history = useHistory();
  const { setData } = useContext(NuevaPreguntaContext);
  
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
  
  return (
    <>
      <Typography variant="h4" component="h1">
        Realizar una nueva pregunta
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        En esta sección podrás exponer los antecedentes pertinentes y realizar tu consulta.
      </Typography>
      <form onSubmit={handleSubmit}>
        <ConveniosList convenio={convenio} setFieldValue={setFieldValue}/>
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
    </>
  );
}

export default NuevaPregunta;
