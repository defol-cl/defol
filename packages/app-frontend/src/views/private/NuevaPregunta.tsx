import React, { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { FormikNuevaPregunta, validationNuevaPregunta } from "./nueva-pregunta/nueva-pregunta.formik";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../navigation";
import { Typography } from "@mui/material";
import ConveniosList from "./nueva-pregunta/ConveniosList";
import PreguntaForm from './nueva-pregunta/PreguntaForm';
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

const NuevaPregunta: FC = () => {
  const history = useHistory();
  const [saving, setSaving] = useState<boolean>(false);
  const formik = useFormik<FormikNuevaPregunta>({
    initialValues: {
      titulo: '',
      antecedentes: '',
      pregunta: '',
    },
    validationSchema: validationNuevaPregunta,
    validateOnMount: true,
    onSubmit: ({ titulo, antecedentes }) => {
      console.log(titulo, antecedentes, pregunta);
      setSaving(true);
      history.push(privateRoutes.previsualizarPregunta.route());
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
                <LoadingButton
                  size="large" type="submit" variant="contained" fullWidth
                  disabled={!formik.isValid}
                  loading={saving}>
                  Previsualizar
                </LoadingButton>
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
