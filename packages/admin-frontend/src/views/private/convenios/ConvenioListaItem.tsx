import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../../navigation";
import ListItem from "@mui/material/ListItem";
import { Dao } from "@defol-cl/root";

interface Props {
  convenio: Dao.Convenio
}

const ConvenioListaItem: React.FC<Props> = ({ convenio }) => {
  const history = useHistory();
  
  return (
    <ListItem button sx={{ py: 1 }} divider
              onClick={() => history.push(privateRoutes.convenioDetalle.route({ conId: convenio.cod }))}>
      <ListItemText
        primaryTypographyProps={{ component: 'div' }}
        primary={
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                {convenio.nombre}
              </Typography>
              <Typography variant="subtitle2" color="info.main">
                Cód: {convenio.cod}
              </Typography>
            </Grid>
            <Stack direction="row" spacing={1}>
              <Typography variant="overline" color="info.main">
                Vigencia {convenio.fechaVencimiento}
              </Typography>
            </Stack>
          </Grid>
        }/>
    </ListItem>
  );
}

export default ConvenioListaItem;
