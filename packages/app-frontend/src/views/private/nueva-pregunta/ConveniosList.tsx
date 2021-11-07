import React, { useEffect, useState } from 'react';
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
import { Dao } from "@defol-cl/root";
import { useBoolean } from "react-use";
import { ConveniosSvc } from "../../../services";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

interface Props {
  convenio?: Dao.Convenio
  setFieldValue: (field: string, value: any) => void
}

const ConveniosList: React.FC<Props> = ({ convenio, setFieldValue }) => {
  
  const [convenios, setConvenios] = useState<Dao.Convenio[]>();
  const [error, setError] = useBoolean(false);
  
  useEffect(() => {
    if (!error) {
      ConveniosSvc.get()
        .then(convenios => setConvenios(convenios))
        .catch(err => {
          console.error(err);
          setError(true);
        })
    }
  }, [error]);
  
  if (error) {
    return (
      <Alert variant="filled" severity="error" sx={{ mb: 2 }}
             action={
               <Button color="inherit" size="small" onClick={() => setError(false)}>
                 Reintentar ahora
               </Button>
             }>
        <AlertTitle>Esto es un poco incómodo</AlertTitle>
        Ocurrió un error al obtener el listado de convenios disponibles.<br/>Te proponemos 2 alternativas, reintenta ahora o conéctate más tarde, y danos un tiempo para reparar este problema.
      </Alert>
    );
  } else {
    return (
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Selecciona tu convenio"
                    subheader="Los convenios activos te habilitan a realizar preguntas a nuestro equipo legal"/>
        <Divider/>
        <List sx={{ py: 0 }}>
          {convenios && convenios.map(c => (
            <ListItem disablePadding divider
                      secondaryAction={
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Typography variant="h6" component="p" sx={{ color: 'info.dark' }}>
                            2 disponibles
                          </Typography>
                          <Typography variant="button" component="p" sx={{ color: 'info.light' }}>
                            de 5 preguntas
                          </Typography>
                        </Grid>
                      }
                      selected={c.cod === convenio?.cod}>
              <ListItemButton>
                <ListItemText primary="Convenio 1"
                              primaryTypographyProps={{ variant: 'h5' }}
                              secondary="Vence el 27/03/2023"
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
}

export default ConveniosList;
