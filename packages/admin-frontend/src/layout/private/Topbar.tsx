import React, { FC } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Divider from "@mui/material/Divider";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { privateRoutes, publicRoutes } from "src/navigation";
import ElevationScroll from './ElevationScroll';
import { useTheme } from "@mui/material";

const TopBar: FC = () => {
  const history = useHistory();
  const theme = useTheme();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const cerrarSesion = () => {
    Auth.signOut()
      .then(() => history.push(publicRoutes.ingreso.route()))
      .catch(err => console.error(err));
  };
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ElevationScroll>
          <AppBar position="fixed" color="transparent" sx={{ height: 80, backgroundColor: 'white' }}>
            <Container maxWidth="lg" sx={{ height: '100%' }}>
              <Toolbar sx={{ height: '100%', mx: 0 }} className="defol-toolbar">
                <Box flexGrow={1}>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center"
                        className="defol-logo" sx={{ color: theme.palette.text.primary }}>
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                    </svg>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <span className="defol-logo-text">DEFOL Admin</span>
                    </Box>
                  </Grid>
                </Box>
                <Box ml={2} flexGrow={1}/>
                <Button sx={{ mr: 1 }}
                        onClick={() => history.push(privateRoutes.inicio.route())}>
                  Inicio
                </Button>
                <IconButton id="perfil" sx={{ ml: 1 }} onClick={handleClick}>
                  <PersonIcon fontSize="inherit"/>
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>
        </ElevationScroll>
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'perfil' }}>
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <Divider/>
        <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
      </Menu>
    </>
  );
}

export default TopBar;
