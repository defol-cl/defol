import React, { FC } from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Inicio: FC = () => {
  
  return (
    <Card>
      <CardHeader title="Bienvenido al Administrador de DEFOL"
                  subheader="Utiliza el menu superior para navegar por las disintas opciones de la aplicación"/>
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          Convenios
        </Typography>
        <Typography variant="body1" gutterBottom>
          Son el elemento esencial establecido por un contrato de servicios entre DEFOL y alguna institución privada o
          pública, a la cuál se asocian contactos o moderadores.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Los contactos al registrarse como usarios de la plataforma podrán realizar la cantidad de preguntas
          habilitadas según el convenio.
        </Typography>
        <br/>
        <Typography variant="h5" gutterBottom component="div">
          Preguntas
        </Typography>
        <Typography variant="body1" gutterBottom>
          Como su nombre lo indica, es la pregunta que realizan los usuarios de la plataforma a nuestro equipo legal de
          DEFOL. Asociada a la pregunta existe un título (algo así como el asunto de un correo), antecedentes y
          finalmente el texto referente a la consulta. Por defecto los usarios pueden realizar una única réplica, pero
          si el equipo legal lo estima conveniente, se podrá habilitar en la plataforma una nueva réplica.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Inicio;
