import React, { useEffect } from 'react';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import DialogConvenio from "../components/DialogConvenio";
import DialogAgregarContactos from './DialogAgregarContactos';
import DialogAgregarModeradores from "./DialogAgregarModeradores";

interface Props {
  conId: string
}

const ConvenioAcciones: React.FC<Props> = ({ conId }) => {
  const [openEditarConvenio, setOpenEditarConvenio] = React.useState(false);
  const [openAgregarContactos, setOpenAgregarContactos] = React.useState(false);
  const [openAgregarModerador, setOpenAgregarModerador] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    if (open) {
      handleClose()
    }
  }, [openEditarConvenio, openAgregarContactos, openAgregarModerador])
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <DialogConvenio conCod={conId} open={openEditarConvenio} onClose={() => setOpenEditarConvenio(false)}/>
      <DialogAgregarContactos conId={conId} open={openAgregarContactos}
                              onClose={(update) => {
                                if (update) {
                                  //TODO reload
                                }
                                setOpenAgregarContactos(false);
                              }}/>
      <DialogAgregarModeradores conId={conId} open={openAgregarModerador}
                              onClose={(update) => {
                                if (update) {
                                  //TODO reload
                                }
                                setOpenAgregarContactos(false);
                              }}/>
      <Button id="acciones" variant="contained" disableElevation
              sx={{ mr: 1, mt: 0.5, px: 3 }}
              endIcon={<KeyboardArrowDownIcon/>}
              onClick={handleClick}>
        Acciones
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'acciones' }}>
        <MenuItem onClick={() => setOpenEditarConvenio(true)}>
          <ListItemIcon>
            <EditIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Modificar convenio</ListItemText>
        </MenuItem>
        <Divider sx={{ my: 0.5 }}/>
        <MenuItem onClick={() => setOpenAgregarContactos(true)}>
          <ListItemIcon>
            <GroupAddIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Agregar contactos</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setOpenAgregarModerador(true)}>
          <ListItemIcon>
            <AddModeratorIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Agregar moderador</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ConvenioAcciones;
