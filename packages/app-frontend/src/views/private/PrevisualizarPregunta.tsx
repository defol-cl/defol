import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

const PrevisualizarPregunta: FC = () => {
  const history = useHistory();
  
  return (
    <>
      <Typography variant="h5" component="h1" >
        Previsualizar pregunta
      </Typography>
      <Typography variant="body1" gutterBottom>
        Revisa la información antes de enviarla a nuestros especialistas
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ pt: 2, color: grey[600] }}>
            El equipo de postventa de la inmobiliaria Surmonte me ha entregado un pésimo servicio
          </Typography>
          <Typography variant="overline" display="block" color="info.main" gutterBottom>
            Jaime Aceite - 15/10/2021
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
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Button size="large" variant="contained" fullWidth>
                Enviar pregunta
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button size="large" fullWidth onClick={() => history.goBack()}>
                Volver y editar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default PrevisualizarPregunta;
