import React, { FC, useEffect } from 'react';
import { PreguntasSvc } from '../../services';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";

const Actualizaciones: FC = () => {
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  return (
    <Card>
      <CardHeader title="Actualizaciones" subheader="Revisa aquí todas las actualizaciones a tus preguntas"/>
    </Card>
  );
}

export default Actualizaciones;
