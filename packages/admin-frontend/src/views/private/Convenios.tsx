import React, { FC, useEffect } from 'react';
import { PreguntasSvc } from '../../services';
import ConvenioLista from './convenios/ConvenioLista';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Convenios: FC = () => {
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  return (
    <Card>
      <CardHeader title="Convenios" subheader="Listado disponible de convenios vigentes/vencidos"
                  action={
                    <Button variant="contained" startIcon={<AddCircleIcon/>}>
                      Crear nuevo
                    </Button>
                  }/>
      <ConvenioLista/>
    </Card>
  );
}

export default Convenios;
