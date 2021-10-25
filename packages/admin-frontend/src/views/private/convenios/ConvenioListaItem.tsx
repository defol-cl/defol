import React, { FC } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../../navigation";
import ListItem from "@mui/material/ListItem";

const ConvenioListaItem: FC = () => {
  const history = useHistory();
  
  return (
    <ListItem button sx={{ py: 1 }} divider
              onClick={() => history.push(privateRoutes.convenioDetalle.route({ conId: 1313 }))}>
      <ListItemText
        primaryTypographyProps={{ component: 'div' }}
        primary={
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                Municipalidad de Peñalolén
              </Typography>
              <Typography variant="subtitle2" color="info.main">
                <b>Cód: PENA2021</b> - Vigente hasta el 13/10/2024
              </Typography>
            </Grid>
            <Stack direction="row" spacing={1}>
              <Chip label="3.159 preguntas"/>
            </Stack>
          </Grid>
        }/>
    </ListItem>
  );
}

export default ConvenioListaItem;
