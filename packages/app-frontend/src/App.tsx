import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ParentRoutes from "src/navigation/components/ParentRoutes";
import routeHierarchy from 'src/navigation/routeHierarchy';
import { customTheme } from "src/theme";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const theme = createTheme(customTheme);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ParentRoutes items={routeHierarchy}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
