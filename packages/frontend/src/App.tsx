import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ParentRoutes from "./navigation/components/ParentRoutes";
import routeHierarchy from './navigation/routeHierarchy';
import { customTheme } from "./theme";

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
