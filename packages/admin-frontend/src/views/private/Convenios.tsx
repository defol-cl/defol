import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Divider from "@mui/material/Divider";
import { Dao } from "@defol-cl/root";
import { useBoolean } from "react-use";
import { ConveniosSvc } from "src/services";
import ConvenioLista from './convenios/ConvenioLista';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import DialogConvenio from "./components/DialogConvenio";

const Convenios: React.FC = () => {
  const [convenios, setConvenios] = useState<Dao.Convenio[]>();
  const [openCrearConvenio, setOpenCrearConvenio] = React.useState(false);
  const [errorConvenio, setErrorConvenio] = useBoolean(false);
  
  useEffect(() => {
    let mounted = true;
    if (!errorConvenio) {
      ConveniosSvc.get()
        .then(convenios => mounted && setConvenios(convenios))
        .catch(err => {
          console.error(err);
          mounted && setErrorConvenio(true);
        })
    }
    return () => {
      mounted = false;
    };
  }, [errorConvenio]);
  
  useEffect(() => {
    let mounted = true;
    setConvenios(undefined);
    if (!openCrearConvenio) {
      ConveniosSvc.get()
        .then(convenios => mounted && setConvenios(convenios))
        .catch(err => {
          console.error(err);
          mounted && setErrorConvenio(true);
        })
    }
    return () => {
      mounted = false;
    };
  }, [openCrearConvenio]);
  
  return (
    <>
      <DialogConvenio open={openCrearConvenio} onClose={() => setOpenCrearConvenio(false)}/>
      {errorConvenio && (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}
               action={
                 <Button color="inherit" size="small" onClick={() => setErrorConvenio(false)}>
                   Reintentar ahora
                 </Button>
               }>
          <AlertTitle>Esto es un poco incómodo</AlertTitle>
          Ocurrió un error al obtener el listado de convenios disponibles.<br/>Te proponemos 2 alternativas, reintenta
          ahora o conéctate más tarde y vuelve a intentarlo, y danos un poco de tiempo para reparar este problema.
        </Alert>
      )}
      {!errorConvenio && (
        <Card>
          <CardHeader title="Convenios" subheader="Listado disponible de convenios vigentes/vencidos"
                      action={
                        <Button variant="contained" startIcon={<AddCircleIcon/>}
                                onClick={() => setOpenCrearConvenio(true)}>
                          Crear nuevo
                        </Button>
                      }/>
          <Divider/>
          {convenios && convenios.length === 0 && (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center"
                  sx={{ minHeight: 200, p: 3 }}>
              <Grid item>
                <Typography variant="h5" gutterBottom component="h3" align="center" color="textSecondary"
                            sx={{ mt: 3 }}>
                  Aún no se han creado convenios
                </Typography>
                <Typography variant="body1" gutterBottom align="center" color="textPrimary">
                  ¿Qué estas esperando? Puedes crear uno ahora mismo :)
                </Typography>
              </Grid>
            </Grid>
          )}
          {convenios && convenios.length > 0 && <ConvenioLista convenios={convenios}/>}
          {convenios === undefined && (
            <List>
              {[1, 2, 3].map(i => (
                <ListItem key={i} button sx={{ py: 1 }} divider>
                  <ListItemText
                    primary={
                      <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography variant="h6">
                            <Skeleton width={150}/>
                          </Typography>
                          <Typography variant="subtitle2" color="info.main">
                            <Skeleton width={100}/>
                          </Typography>
                        </Grid>
                        <Stack direction="row" spacing={1}>
                          <Typography variant="overline" color="info.main">
                            <Skeleton width={80}/>
                          </Typography>
                        </Stack>
                      </Grid>
                    }/>
                </ListItem>
              ))}
            </List>
          )}
        </Card>
      )}
    </>
  );
}

export default Convenios;
