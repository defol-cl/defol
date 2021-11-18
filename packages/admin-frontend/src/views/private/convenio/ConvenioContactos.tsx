import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ConvenioContactosTabla from "./ConvenioContactosTabla";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { FilledInput, ListSubheader, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  conId: string
}

type Filtro =
  'todos'
  | 'con-registro'
  | 'sin-registro'
  | 'preguntas-pendientes-todas'
  | 'preguntas-pendientes'
  | 'preguntas-consumidas';

const ConvenioContactos: React.FC<Props> = ({ conId }) => {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  
  return (
    <>
      <Box m={2}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
          <TextField label="Búsqueda por correo" variant="outlined" size="small"
                     sx={{ minWidth: '300px' }}
                     InputProps={{
                       endAdornment: <SearchIcon/>
                     }}/>
          <TextField label="Filtrar" variant="outlined" size="small" select
                     value={filtro}
                     onChange={event => setFiltro(event.target.value as Filtro)}
                     sx={{ minWidth: '300px' }}>
            <MenuItem value="todos">
              Mostrar todo
            </MenuItem>
            <ListSubheader sx={{ color: 'primary.main' }}>Proceso de registro</ListSubheader>
            <MenuItem value="con-registro">
              Sólo registrados
            </MenuItem>
            <MenuItem value="sin-registro">
              Sólo pendientes de registro
            </MenuItem>
            <ListSubheader sx={{ color: 'primary.main' }}>Realización de preguntas</ListSubheader>
            <MenuItem value="preguntas-pendientes-todas">
              Sin preguntas realizadas
            </MenuItem>
            <MenuItem value="preguntas-pendientes">
              Con preguntas realizadas
            </MenuItem>
            <MenuItem value="preguntas-consumidas">
              Sin preguntas restantes
            </MenuItem>
          </TextField>
        </Grid>
      </Box>
      <ConvenioContactosTabla conId={conId}/>
    </>
  );
}

export default ConvenioContactos;
