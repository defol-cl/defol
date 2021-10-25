import React, { FC } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TopBarUsuario from "./TopBarUsuario";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "../../navigation";

const TopBar: FC = () => {
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
        <Toolbar>
          <Button
            color='inherit'
            onClick={() => history.push(privateRoutes.inicio.route())}>
            ADMIN DEFOL
          </Button>
          <Box ml={2} flexGrow={1}/>
          <TopBarUsuario/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
