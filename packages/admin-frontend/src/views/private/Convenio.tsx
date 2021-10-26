import React, { FC, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import ConvenioAcciones from "./convenio/ConvenioAcciones";
import ConvenioContactos from "./convenio/ConvenioContactos";
import { Typography } from "@mui/material";
import ConvenioModeradores from "./convenio/ConvenioModeradores";

interface Params {
  conId: string
}

type TabType = 'contactos' | 'moderadores';

const Convenio: FC = () => {
  const { conId } = useParams<Params>();
  const [tab, setTab] = useState<TabType>('contactos');
  
  const handleChangeTab = (event: React.SyntheticEvent, tab: any) => {
    setTab(tab as TabType);
  };
  
  return (
    <>
      <Card>
        <CardHeader title="Convenio Municipalidad de Peñalolén"
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
    </>
  );
}

export default Convenio;
