import Stack from '@mui/material/Stack';
import React, { FC } from 'react';
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";
import CardContent from '@mui/material/CardContent';

const IngresoText: FC = () => {
  
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="xs">
        <Card className="card-transparent">
          <CardContent>
            <Typography variant="h4" component="h1">
              Servicios Jurídicos de Consultoría Legal
            </Typography>
            <Typography variant="subtitle1" gutterBottom>Equivalente a tener un equipo legal al alcance y con precios razonables</Typography>
            <ul>
              <li>Plantea cualquier duda legal que tengas</li>
              <li>Contamos con un amplio equipo de especialistas legales</li>
              <li>Nuestro tiempo de respuesta es de 1 día hábil</li>
              <li>La primera consulta es gratuita, en adelante el valor por consulta es de $14.990</li>
              <li>Contamos con convenios a instituciones</li>
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
}

export default IngresoText;
