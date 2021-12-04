import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
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
import { privateRoutes } from "../../navigation";

type Filtro = 'todas' | 'pendientes' | 'cerradas';

type FiltroEstados = {
  [key in Filtro]: string[] | undefined
}

const filtroEstados: FiltroEstados = {
  todas: undefined,
  pendientes: ['INGRESADA', 'REPLICADA'],
  cerradas: ['RESPONDIDA', 'FINALIZADA']
}

interface State {
  asignado: string;
  estado: Filtro;
}

const Preguntas: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState<string>();
  const [state, setState] = useState<State>({
    asignado: 'mi',
    estado: 'pendientes'
  });
  
  useEffect(() => {
    let mounted = true;
    if (!email) {
      Auth.currentUserInfo()
        .then(info => {
          mounted && setEmail(info.attributes.email);
        })
    }
    return () => {
      mounted = false;
    };
  }, []);
  
  useEffect(() => {
    history.replace(privateRoutes.preguntasListado.route({
      asignado: state.asignado,
      estado: state.estado
    }));
  }, [state]);
  
  const handleChangeEstado = (event: SelectChangeEvent) => {
    setState({ ...state, estado: event.target.value as Filtro });
  };
  
  const handleChangeAsignacion = (event: SelectChangeEvent) => {
    setState({ ...state, asignado: event.target.value as string });
  };
  
  if (!email) {
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
                                  value={state.estado}
                                  onChange={handleChangeEstado}>
                            <MenuItem value="todas">Todas</MenuItem>
                            <MenuItem value="pendientes">Pendientes</MenuItem>
                            <MenuItem value="cerradas">Cerradas</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }}>
                          <InputLabel id="estado-label">Asignado</InputLabel>
                          <Select labelId="estado-label" id="estado" label="Asignado"
                                  value={state.asignado}
                                  onChange={handleChangeAsignacion}>
                            <MenuItem value="mi">A mi</MenuItem>
                            <MenuItem value="cualquiera">A cualquiera</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    }/>
        <Divider/>
        <PreguntaLista estados={filtroEstados[state.estado]} ejecutivo={state.asignado === "mi" ? email : undefined}/>
      </Card>
    );
  }
}

export default Preguntas;
