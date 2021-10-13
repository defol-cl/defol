import React, { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { FormikNuevaPregunta, validationNuevaPregunta } from "./nueva-pregunta/nueva-pregunta.formik";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../navigation";
import { Typography } from "@mui/material";

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
    values: { titulo, antecedentes, pregunta }
  } = formik;
  
  return (
    <>
      <Typography variant="h5" component="h1">
        Realizar una pregunta
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cuéntanos en detalle cómo podemos orientarte
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <TextField
              id="titulo"
              label="Título"
              helperText="Algo parecido al asunto de un correo, que resuma el contenido de la pregunta. O si queda más claro, sería como el título de la canción."
              fullWidth
              value={titulo}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <TextField
              id="antecedentes"
              label="Antecedentes de tu consulta"
              helperText="Información importante respecto de tu consulta, antecedentes importantes que nuestro equipo legal deba conocer como parte del contexto."
              multiline
              minRows={5}
              fullWidth
              value={antecedentes}
              sx={{ mt: 2 }}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <TextField
              id="pregunta"
              label="Pregunta"
              helperText="Indícanos cuál es tu consulta, siendo lo más claro posible."
              fullWidth
              value={pregunta}
              sx={{ mt: 2 }}
              onChange={handleChange}
              onBlur={handleBlur}/>
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
