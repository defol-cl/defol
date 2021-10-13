import React, { FC, useEffect } from 'react';
import { PreguntasSvc } from '../../services';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";

const MisPreguntas: FC = () => {
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  return (
    <Card>
      <CardHeader title="Mis Preguntas" subheader="Acá encontrarás el listado de preguntas que hayas realizado"/>
    </Card>
  );
}

export default MisPreguntas;
