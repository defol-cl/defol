import React, { FC } from 'react';
import { grey, lightBlue } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CircleIcon from '@mui/icons-material/Circle';
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../../navigation";

const UltimasActualizaciones: FC = () => {
  const history = useHistory();
  
  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardHeader
        title="Últimas Actualizaciones"
        subheader="Revisa qué ha pasado desde tu última visita"
        action={
          <Button color="secondary" onClick={() => history.push(privateRoutes.misActualizaciones.route())}>
            Ver todas
          </Button>
        }/>
      <CardContent sx={{ pt: 0, px: 0 }}>
        <List disablePadding>
          <ListItem button sx={{ py: 3, backgroundColor: lightBlue[50] }}
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
          <ListItem button sx={{ py: 3 }}
                    onClick={() => history.push(privateRoutes.miPregunta.route({ id: 1313 }))}>
            <ListItemAvatar sx={{ minWidth: '35px' }}>
              <CircleIcon fontSize="small" sx={{ color: 'white' }}/>
            </ListItemAvatar>
            <ListItemText
              primary="Mi hermano lleva viviendo en mi hogar por 5 años, la propiedad recientemente pasó a mi nombre"
              primaryTypographyProps={{ variant: 'h5', color: grey[800] }}
              secondaryTypographyProps={{ component: 'div' }}
              secondary={
                <>
                  <Typography variant="caption" color="info.main">
                    Realizada el 23/09/2021
                  </Typography>
                  <Typography variant="body2">
                    Cómo puedo ejercer presión legal para que mi hermano deba desalojar mi vivienda, él ya tiene una...
                  </Typography>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Recurso Protección"/>
                      <Chip label="Réplica respondida" color="success"/>
                    </Stack>
                    <Grid item>
                      <Typography variant="subtitle2" color="info.main">
                        Actualizado hace 13 hrs
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              }/>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default UltimasActualizaciones;
