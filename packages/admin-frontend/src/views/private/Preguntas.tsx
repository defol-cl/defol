import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Auth } from "aws-amplify";
import PreguntaLista from "./components/PreguntaLista";
import PrivateLoading from "./Private.loading";

type Filtro = 'todas' | 'pendientes' | 'cerradas';

type FiltroEstados = {
  [key in Filtro]: string[] | undefined
}

const filtroEstados: FiltroEstados = {
  todas: undefined,
  pendientes: ['INGRESADA', 'REPLICADA', 'RESPONDIDA'],
  cerradas: ['FINALIZADA']
}

const Preguntas: React.FC = () => {
  const [estado, setEstado] = useState<Filtro>('todas');
  const [asignado, setAsignado] = useState('mi');
  const [email, setEmail] = useState<string>();
  
  useEffect(() => {
    let mounted = true;
    Auth.currentUserInfo()
      .then(info => {
        mounted && setEmail(info.attributes.email);
      })
    return () => {
      mounted = false;
    };
  }, [estado, asignado]);
  
  const handleChangeEstado = (event: SelectChangeEvent) => {
    setEstado(event.target.value as Filtro);
  };
  
  const handleChangeAsignacion = (event: SelectChangeEvent) => {
    setAsignado(event.target.value);
  };
  
  if(!email) {
    return <PrivateLoading/>
  } else {
    return (
      <Card>
        <CardHeader title="Listado de Preguntas"
                    subheader="Acá encontrarás el listado de preguntas que se han realizado"
                    action={
                      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }}>
                          <InputLabel id="estado-label">Estado</InputLabel>
                          <Select labelId="estado-label" id="estado" label="Estado"
                                  value={estado}
                                  onChange={handleChangeEstado}>
                            <MenuItem value="todas">Todas</MenuItem>
                            <MenuItem value="pendientes">Pendientes</MenuItem>
                            <MenuItem value="cerradas">Cerradas</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }}>
                          <InputLabel id="estado-label">Asignado</InputLabel>
                          <Select labelId="estado-label" id="estado" label="Asignado"
                                  value={asignado}
                                  onChange={handleChangeAsignacion}>
                            <MenuItem value="mi">A mi</MenuItem>
                            <MenuItem value="cualquiera">A cualquiera</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    }/>
        <Divider/>
        <PreguntaLista estados={filtroEstados[estado]} ejecutivo={asignado === "mi" ? email : undefined}/>
      </Card>
    );
  }
}

export default Preguntas;
