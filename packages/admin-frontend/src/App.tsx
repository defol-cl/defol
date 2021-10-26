import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';
import ParentRoutes from "./navigation/components/ParentRoutes";
import routeHierarchy from './navigation/routeHierarchy';
import { customTheme } from "./theme";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const theme = createTheme(customTheme);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <ParentRoutes items={routeHierarchy}/>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
