import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import PreguntaLista from "./components/PreguntaLista";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { PreguntaDynamoEstado } from '@defol-cl/root';
import { useHistory, useParams } from "react-router-dom";
import { privateRoutes } from "src/navigation";

const tbSx = { px: 3 };

type Filtro = 'todas' | 'pendientes' | 'cerradas';

interface Params {
  tipo?: Filtro
}

const MisPreguntas: React.FC = () => {
  const history = useHistory();
  const { tipo } = useParams<Params>();
  const [filtro, setFiltro] = useState<Filtro>(tipo ? tipo : 'todas');
  const [estados, setEstados] = useState<PreguntaDynamoEstado[]>();
  
  useEffect(() => {
    if(tipo === 'todas' || tipo === 'pendientes' || tipo === 'cerradas') {
      setFiltro(tipo);
    }
  }, [tipo])
  
  useEffect(() => {
    if (filtro === 'todas') {
      setEstados(undefined);
    } else if (filtro === 'pendientes') {
      setEstados(['INGRESADA', 'REPLICADA', 'RESPONDIDA']);
    } else if (filtro === 'cerradas') {
      setEstados(['FINALIZADA']);
    }
  }, [filtro]);
  
  const handleChange = (event: React.MouseEvent<HTMLElement>, tipo: any) => history.push(privateRoutes.misPreguntas.route({ tipo }));
  
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
      <PreguntaLista estados={estados}/>
    </Card>
  );
}

export default MisPreguntas;
