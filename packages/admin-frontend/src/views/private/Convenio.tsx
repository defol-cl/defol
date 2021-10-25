import React, { FC, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ConvenioCorreosTabla from './convenio/ConvenioCorreosTabla';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Badge from "@mui/material/Badge";
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';

interface Params {
  conId: string
}

type Filtro = 'todos' | 'registrados' | 'sin-preguntas';
type TabType = 'correos' | 'usuarios';

const Convenio: FC = () => {
  const { conId } = useParams<Params>();
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [tab, setTab] = useState<TabType>('correos');
  
  const handleChangeFiltro = (event: React.MouseEvent<HTMLElement>, filtro: any) => {
    setFiltro(filtro as Filtro);
  };
  const handleChangeTab = (event: React.SyntheticEvent, tab: any) => {
    setTab(tab as TabType);
  };
  
  return (
    <>
      <Card>
        <CardHeader title="Convenio Municipalidad de Peñalolén"
                    subheader={<><b>Cód: PENA2021</b> - Vigente hasta el 13/10/2024</>}
                    action={
                      <>
                        <Button startIcon={<AddCircleIcon/>}>
                          Agregar correos
                        </Button>
                        <Button startIcon={<ModeEditIcon/>}>
                          Modificar convenio
                        </Button>
                      </>
                    }/>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab value="correos" sx={{ px: 5 }}
                 label={
                   <>
                     <Badge badgeContent={329} max={999} color="warning"><MailIcon/></Badge> Correos
                   </>
                 }/>
            <Tab value="usuarios" sx={{ px: 5 }}
                 label={
                   <>
                     <Badge badgeContent={11} color="warning"><PeopleIcon/></Badge> Administradores
                   </>
                 }/>
          </Tabs>
        </Box>
        {tab === "correos" && (
          <>
            <CardContent>
              <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
                <Grid item>
                  <TextField
                    label="Búsqueda por correo"
                    variant="filled"
                    sx={{ minWidth: '300px' }}
                    InputProps={{
                      endAdornment: <SearchIcon/>
                    }}/>
                </Grid>
                <ToggleButtonGroup color="primary" value={filtro} exclusive
                                   onChange={handleChangeFiltro}>
                  <ToggleButton value="todos">Todos</ToggleButton>
                  <ToggleButton value="registrados">Registrados</ToggleButton>
                  <ToggleButton value="sin-preguntas">Sin preguntas</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </CardContent>
            <ConvenioCorreosTabla conId={conId}/>
          </>
        )}
      </Card>
    </>
  );
}

export default Convenio;
