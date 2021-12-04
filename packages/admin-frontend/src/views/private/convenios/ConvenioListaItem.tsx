import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../../navigation";
import ListItem from "@mui/material/ListItem";
import { Dao } from "@defol-cl/root";
import FechaSimple from "src/components/FechaSimple";

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
        primary={convenio.nombre}
        secondary={`Cód: ${convenio.cod}`}/>
      <Typography variant="overline" color="info.main">
        Vigencia <FechaSimple timestamp={convenio.fechaVencimiento}/>
      </Typography>
    </ListItem>
  );
}

export default ConvenioListaItem;
