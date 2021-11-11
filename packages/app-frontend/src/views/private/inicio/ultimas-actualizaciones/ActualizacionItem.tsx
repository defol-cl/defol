import React from 'react';
import { grey, lightBlue } from '@mui/material/colors';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CircleIcon from '@mui/icons-material/Circle';
import { useHistory } from "react-router-dom";
import { privateRoutes } from "src/navigation";
import { Dao } from "@defol-cl/root";

interface Props {
  pregunta: Dao.Pregunta
}

const ActualizacionItem: React.FC<Props> = ({ pregunta }) => {
  const history = useHistory();
  
  const noLeida = pregunta.fechaUltimoAcceso === undefined
    || pregunta.fechaActualizacion === undefined
    || pregunta.fechaUltimoAcceso < pregunta.fechaActualizacion;
  
  return (
    <ListItem button sx={{ py: 3, backgroundColor: noLeida ? lightBlue[50] : 'white' }}
              onClick={() => history.push(privateRoutes.miPregunta.route({ conCod: pregunta.convenioCod, fecha: pregunta.timestamp }))}>
      <ListItemAvatar sx={{ minWidth: '35px' }}>
        <CircleIcon fontSize="small" sx={{ color: noLeida ? 'info.dark' : 'white' }}/>
      </ListItemAvatar>
      <ListItemText
        primary={pregunta.titulo}
        primaryTypographyProps={{ variant: 'h5', color: grey[800] }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <>
            <Typography variant="caption" color="info.main">
              Realizada el {pregunta.timestamp}
            </Typography>
            <Typography variant="body2">
              {pregunta.antecedentes.length < 60 ? pregunta.antecedentes : `${pregunta.antecedentes.substr(0, 60)}...`}
            </Typography>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
              <Stack direction="row" spacing={1}>
                {pregunta.categoria && (
                  <Chip label={pregunta.categoria}/>
                )}
                <Chip label={pregunta.estado} color="warning"/>
              </Stack>
              <Grid item>
                <Typography variant="subtitle2" color="info.main">
                  Actualizado {pregunta.fechaActualizacion}
                </Typography>
              </Grid>
            </Grid>
          </>
        }/>
    </ListItem>
  );
}

export default ActualizacionItem;
