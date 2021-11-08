import React, { FC, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { PreguntasSvc } from 'src/services';
import ActualizacionLista from "./components/ActualizacionLista";

const Actualizaciones: FC = () => {
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.get()
      .then(response => mounted && console.log(response));
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <Card>
      <CardHeader title="Actualizaciones" subheader="Revisa aquí todas las actualizaciones a tus preguntas"/>
      <Divider/>
      <ActualizacionLista/>
    </Card>
  );
}

export default Actualizaciones;
