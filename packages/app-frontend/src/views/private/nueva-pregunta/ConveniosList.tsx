import React from 'react';
import Card from '@mui/material/Card';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import Radio from "@mui/material/Radio";
import { Dao } from "@defol-cl/root";
import Fecha from "src/components/Fecha";

interface Props {
  convenios?: Dao.Convenio[]
  convenio?: Dao.Convenio
  setFieldValue: (field: string, value: any) => void
}

const ConveniosList: React.FC<Props> = ({ convenios, convenio, setFieldValue }) => {
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader title="Selecciona tu convenio"
                  subheader="Los convenios activos te habilitan a realizar preguntas a nuestro equipo legal"/>
      <Divider/>
      <List sx={{ py: 0 }}>
        {convenios && convenios.length === 0 && (
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
                sx={{ minHeight: 200, p: 3 }}>
            <Grid item>
              <Typography variant="h5" gutterBottom component="h3" align="center" color="textSecondary"
                          sx={{ mt: 3 }}>
                Aún no se han creado convenios
              </Typography>
              <Typography variant="body1" gutterBottom align="center" color="textPrimary">
                Si crees que es un error escríbenos a <b>soporte@defol.cl</b>
              </Typography>
            </Grid>
          </Grid>
        )}
        {convenios && convenios.map(c => (
          <ListItem key={c.cod} disablePadding divider
                    secondaryAction={
                      <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" component="p" sx={{ color: 'info.dark' }}>
                          {c.limitePreguntas - c.preguntasRealizadas} disponibles
                        </Typography>
                        <Typography variant="button" component="p" sx={{ color: 'info.light' }}>
                          de {c.limitePreguntas} preguntas
                        </Typography>
                      </Grid>
                    }
                    selected={c.cod === convenio?.cod}>
            <ListItemButton onClick={() => setFieldValue('convenio', c)}>
              <ListItemIcon>
                <Radio color="secondary" checked={c.cod === convenio?.cod}
                       onChange={() => setFieldValue('convenio', c)}/>
              </ListItemIcon>
              <ListItemText primary={c.nombre}
                            primaryTypographyProps={{ variant: 'h5' }}
                            secondary={<>Vence el <Fecha text={c.fechaVencimiento}/></>}
                            secondaryTypographyProps={{ variant: 'overline' }}/>
            </ListItemButton>
          </ListItem>
        ))}
        {convenios === undefined && [1, 2].map(i => (
          <ListItem key={i} disablePadding divider
                    secondaryAction={
                      <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6">
                          <Skeleton width={150}/>
                        </Typography>
                        <Typography variant="button">
                          <Skeleton width={90}/>
                        </Typography>
                      </Grid>
                    }>
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography variant="h5">
                    <Skeleton width={200}/>
                  </Typography>
                }
                secondary={
                  <Typography variant="overline">
                    <Skeleton width={300}/>
                  </Typography>
                }/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default ConveniosList;
