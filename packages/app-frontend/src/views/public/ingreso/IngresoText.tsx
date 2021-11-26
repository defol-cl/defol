import Stack from '@mui/material/Stack';
import React from 'react';
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import shelawyer from "src/assets/img/shelawyer.png"

const IngresoText: React.FC = () => {
  return (
    <Stack sx={{ minHeight: '100%' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <Card className="card-transparent" sx={{ height: 500 }}>
          <CardContent>
            <Typography variant="h4" component="h1" align="center" color="secondary" gutterBottom>
              Servicios Jurídicos de Consultoría Legal
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">
              Equivalente a tener un equipo legal al alcance y con precios razonables
            </Typography>
            <Box sx={{ maxWidth: 333, color: 'text.secondary' }}>
              <ul>
                <li>Plantea cualquier duda legal que tengas</li>
                <li>Contamos con un amplio equipo de especialistas legales</li>
                <li>Nuestro tiempo de respuesta es de <b>1 día hábil</b></li>
                <li>La primera consulta es <b>gratuita</b>, en adelante el valor por consulta es de <b>$14.990</b></li>
                <li>Contamos con convenios a instituciones</li>
              </ul>
            </Box>
            <img src={shelawyer} className="shelawyer"/>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
}

export default IngresoText;
