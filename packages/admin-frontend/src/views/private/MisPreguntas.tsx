import React, { FC, useEffect, useState } from 'react';
import { PreguntasSvc } from '../../services';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import PreguntaLista from "./components/PreguntaLista";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const tbSx = { px: 3 };

type Filtro = 'todas' | 'pendientes' | 'cerradas';

const MisPreguntas: FC = () => {
  const [filtro, setFiltro] = useState<Filtro>('todas');
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  const handleChange = (event: React.MouseEvent<HTMLElement>, filtro: any) => {
    setFiltro(filtro as Filtro);
  };
  
  return (
    <Card>
      <CardHeader title="Mis Preguntas" subheader="Acá encontrarás el listado de preguntas que hayas realizado"
                  action={
                    <ToggleButtonGroup sx={{ mt: 1, mx: 2 }} color="primary" size="small" value={filtro} exclusive
                                       onChange={handleChange}>
                      <ToggleButton sx={tbSx} value="todas">Todas</ToggleButton>
                      <ToggleButton sx={tbSx} value="pendientes">Pendientes</ToggleButton>
                      <ToggleButton sx={tbSx} value="cerradas">Cerradas</ToggleButton>
                    </ToggleButtonGroup>
                  }/>
      <PreguntaLista/>
    </Card>
  );
}

export default MisPreguntas;
