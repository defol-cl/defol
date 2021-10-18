import React, { FC, useState } from 'react';
import Card from '@mui/material/Card';
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { validationNuevaPregunta } from "./nueva-pregunta/nueva-pregunta.formik";
import { privateRoutes } from "../../navigation";
import { FormikMiPregunta } from "./mi-pregunta/mi-pregunta.formik";

const MiPregunta: FC = () => {
  const history = useHistory();
  const [saving, setSaving] = useState<boolean>(false);
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
            El equipo de postventa de la inmobiliaria Surmonte me ha entregado un pésimo servicio
          </Typography>
          <Typography variant="overline" display="block" color="info.main" gutterBottom>
            Jaime Aceite - 15/10/2021 18:09 hrs
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            <b>Recurro a ustedes bajo los siguientes antecedentes...</b>
          </Typography>
          <Typography variant="body2" sx={{ pb: 2 }}>
            Me entregaron mi departamento hace más de 1 año y medio, y aún existen observaciones que están pendientes
            desde el día de la entrega, que fueron levantadas en conjunto con el supervisor asignado de la empresa.
          </Typography>
          <Typography variant="body2" sx={{ pb: 2 }}>
            Entre los incontables problemas que he tenido que vivenciar puedo mencionar: incongruencias en los planos
            eléctricos y de gas, entre las cuales puedo mencionar instalaciones inexistentes, filtraciones de agua,
            trabajos realizados por el mismo equipo de postventa que no cumple lo indicado en la norma, incumplimiento
            de
            plazos.
          </Typography>
          <Typography variant="body2" sx={{ pb: 2 }}>
            Todo lo anterior ha impactado en una dedicación de mi tiempo laboral y personal, por constantes trabajos de
            reparación en los que debo estar presente. Desafortunadamente los defectos siguen apareciendo.
          </Typography>
          <Box sx={{ py: 2 }}>
            <hr/>
          </Box>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            <b>Para realizar la siguiente consulta...</b>
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom sx={{ color: grey[600] }}>
            ¿Qué recurso es el más adecuado para poder conseguir una compensación monetaria justa por el incumplimiento
            en la entrega del servicio por parte de la inmobiliaria?
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            Señor Aceite, entendiendo lo complejo de su situación, y de acuerdo a los antecedentes puestos a nuestra
            disposición, la figura legal que le recomendaríamos tomar es una demanda por estafa. En ella debe hacer
            presente todas las afecciones materiales, de tiempo, trabajos pendientes e incluso daños morales realizados
            hacia usted y quienes habiten el inmueble, para ser presentada en los Tribunales de Justicia Civil.
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            Le recomendamos evaluar la posibilidad de realizar una evaluación de afectaciones psicológicas que pudieran
            haberse producido en función del servicio de la Inmobiliaria, según lo que nos menciona, de modo de contar
            con una evaluación por parte de profesionales, que permita identificar daños inherentes pero no evidentes.
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            Podemos agregar que en caso de dar curso a la demanda, los tiempos estimados de resolución van de los 10
            meses a 3 años, y que en los últimos años la resolución de los tribunales ha favorecido a los clientes
            afectados.
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            El proceso es complejo por lo que se hace necesario pueda asesorarse con abogados calificados y con
            experiencia en este tipo de litigios.
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, color: grey[600] }}>
            Si existe algo más en lo que podamos asistirlo, lo invitamos a realizar la correspondiente réplica, antes de
            que venza el plazo de los 14 días.
          </Typography>
          <Typography variant="overline" display="block" color="info.main" gutterBottom>
            Beatriz, Equipo DEFOL - 16/10/2021 14:32 hrs
          </Typography>
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
