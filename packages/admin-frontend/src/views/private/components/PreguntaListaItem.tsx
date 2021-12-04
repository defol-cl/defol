import React from 'react';
import { grey } from '@mui/material/colors';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import { Dao } from '@defol-cl/root';
import { privateRoutes } from "src/navigation";
import Fecha from "../../../components/Fecha";

interface Props {
  pregunta: Dao.Pregunta
}

const PreguntaListaItem: React.FC<Props> = ({ pregunta }) => {
  const history = useHistory();
  console.log(pregunta);
  return (
    <ListItem button divider sx={{ py: 3 }}
              onClick={() => history.push(privateRoutes.preguntaDetalle.route({
                preEmail: pregunta.contactoEmail, preTimestamp: pregunta.timestamp
              }))}>
      <ListItemText
        primary={pregunta.titulo}
        primaryTypographyProps={{ variant: 'h5', color: grey[800] }}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <>
            <Typography variant="caption" color="info.main">
              <Fecha timestamp={pregunta.timestamp}/>
            </Typography>
            <Typography variant="body2">
              {pregunta.antecedentes.length < 60 ? pregunta.antecedentes : `${pregunta.antecedentes.substr(0, 60)}...`}
            </Typography>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
              <Stack direction="row" spacing={1}>
                {pregunta.categoria && (
                  <Chip label={pregunta.categoria} color="info"/>
                )}
                <Chip label={pregunta.estado} color="warning"/>
                {pregunta.ejecutivoEmail && (
                  <Chip label={pregunta.ejecutivoEmail}/>
                )}
              </Stack>
              <Grid item>
                <Typography variant="subtitle2" color="info.main">
                  Actualizado <Fecha timestamp={pregunta.fechaActualizacion}/>
                </Typography>
              </Grid>
            </Grid>
          </>
        }/>
    </ListItem>
  );
}

export default PreguntaListaItem;
