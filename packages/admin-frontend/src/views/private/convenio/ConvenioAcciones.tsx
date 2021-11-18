import React, { useEffect } from 'react';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import DialogConvenio from "../components/DialogConvenio";
import DialogAgregarContactos from './DialogAgregarContactos';

interface Props {
  conId: string
}

const ConvenioAcciones: React.FC<Props> = ({ conId }) => {
  const [openEditarConvenio, setOpenEditarConvenio] = React.useState(false);
  const [openAgregarContactos, setOpenAgregarContactos] = React.useState(false);
  const [openAgregarModerador, setOpenAgregarModerador] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (openMenu) {
      setOpenMenu(false);
    }
  }, [openEditarConvenio, openAgregarContactos, openAgregarModerador])
  
  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };
  
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpenMenu(false);
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
      <Button variant="contained" disableElevation
              sx={{ mr: 1, mt: 0.5, px: 3 }}
              ref={anchorRef}
              endIcon={<KeyboardArrowDownIcon/>}
              onClick={handleToggle}>
        Acciones
      </Button>
      <Popper open={openMenu}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openMenu}>
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
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AddModeratorIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Agregar moderador</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default ConvenioAcciones;
