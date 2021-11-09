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
import { Dao } from "@defol-cl/root";

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

export default ConveniosList;
