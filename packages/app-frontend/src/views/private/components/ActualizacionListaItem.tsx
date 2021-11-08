import React, { FC } from 'react';
import { grey, lightBlue } from '@mui/material/colors';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../../navigation";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircleIcon from "@mui/icons-material/Circle";
import ListItem from "@mui/material/ListItem";

const ActualizacionListaItem: FC = () => {
  const history = useHistory();
  
  return (
    <ListItem button divider sx={{ py: 3, backgroundColor: lightBlue[50] }}
              onClick={() => history.push(privateRoutes.miPregunta.route({ id: 1313 }))}>
      <ListItemAvatar sx={{ minWidth: '35px' }}>
        <CircleIcon fontSize="small" sx={{ color: 'info.dark' }}/>
      </ListItemAvatar>
      <ListItemText
        primary="¿Cómo puedo hacer para regularizar los planos de mi propiedad en la municipalidad?"
        primaryTypographyProps={{ variant: 'h5', color: grey[800] }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <>
            <Typography variant="caption" color="info.main">
              Realizada el 13/10/2021
            </Typography>
            <Typography variant="body2">
              Siendo lo más importante no tener que gastar una excesiva cantidad de dinero en posibles multas y...
            </Typography>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
              <Stack direction="row" spacing={1}>
                <Chip label="Ley de Propiedad"/>
                <Chip label="Réplica pendiente" color="warning"/>
              </Stack>
              <Grid item>
                <Typography variant="subtitle2" color="info.main">
                  Actualizado hace 25 min
                </Typography>
              </Grid>
            </Grid>
          </>
        }/>
    </ListItem>
  );
}

export default ActualizacionListaItem;
