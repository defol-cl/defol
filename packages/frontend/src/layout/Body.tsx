import React, { FC } from 'react';
import Container from '@mui/material/Container';
import { Redirect, Route, Switch } from "react-router-dom";
import Topbar from './Topbar';
import InicioView from "../views/Inicio";
import FiguraView from '../views/Figura';

const Body: FC = () => {
  return (
    <>
      <Topbar/>
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/figura/:slug">
            <FiguraView/>
          </Route>
          <Route exact path="/">
            <InicioView/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </Container>
    </>
  );
}

export default Body;
