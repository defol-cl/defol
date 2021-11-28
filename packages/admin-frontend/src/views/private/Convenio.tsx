import React, { FC, useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from '@mui/lab/Skeleton/Skeleton';
import { Dao } from "@defol-cl/root";
import { useParams } from "react-router-dom";
import { useBoolean } from "react-use";
import { ConveniosSvc } from "src/services";
import ConvenioAcciones from "./convenio/ConvenioAcciones";
import ConvenioContactos from "./convenio/ConvenioContactos";
import ConvenioModeradores from "./convenio/ConvenioModeradores";

interface Params {
  conId: string
}

type TabType = 'contactos' | 'moderadores';

const Convenio: FC = () => {
  const { conId } = useParams<Params>();
  const [convenio, setConvenio] = useState<Dao.Convenio>();
  const [error, setError] = useBoolean(false);
  const [tab, setTab] = useState<TabType>('contactos');
  
  useEffect(() => {
    let mounted = true;
    if (!error) {
      ConveniosSvc.getOne(conId)
        .then(convenio => mounted && setConvenio(convenio))
        .catch(err => {
          console.error(err);
          mounted && setError(true);
        })
    }
    return () => {
      mounted = false;
    };
  }, [conId, error]);
  
  const handleChangeTab = (event: React.SyntheticEvent, tab: any) => {
    setTab(tab as TabType);
  };
  
  console.log(convenio);
  
  return (
    <>
      {error && (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}
               action={
                 <Button color="inherit" size="small" onClick={() => setError(false)}>
                   Reintentar ahora
                 </Button>
               }>
          <AlertTitle>Esto es un poco incómodo</AlertTitle>
          Ocurrió un error al obtener el detalle del convenio.<br/>Te proponemos 2 alternativas, reintenta
          ahora o conéctate más tarde y vuelve a intentarlo, y danos un poco de tiempo para reparar este problema.
        </Alert>
      )}
      {!error && (
        <Card>
          <CardHeader title={convenio ? convenio.nombre : <Skeleton width={300}/>}
                      subheader={
                        <>
                          <Typography variant="subtitle1" sx={{color: 'primary.dark'}}>Cód: PENA2021</Typography>
                          <Typography variant="caption" color="textSecondary">Vigente hasta el 13/10/2024</Typography>
                        </>
                      }
                      action={<ConvenioAcciones conId={conId}/>}/>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab value="contactos" sx={{ px: 5 }}
                   label={
                     <>
                       <Badge badgeContent={329} max={999} color="warning"><MailIcon/></Badge> Contactos
                     </>
                   }/>
              <Tab value="moderadores" sx={{ px: 5 }}
                   label={
                     <>
                       <Badge badgeContent={3} color="warning"><PeopleIcon/></Badge> Moderadores
                     </>
                   }/>
            </Tabs>
          </Box>
          {tab === "contactos" && (
            <ConvenioContactos conId={conId}/>
          )}
          {tab === "moderadores" && (
            <ConvenioModeradores conId={conId}/>
          )}
        </Card>
      )}
    </>
  );
}

export default Convenio;
