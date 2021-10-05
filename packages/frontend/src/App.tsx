import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ParentRoutes from "./navigation/components/ParentRoutes";
import routeHierarchy from './navigation/routeHierarchy';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ParentRoutes items={routeHierarchy}/>
    </BrowserRouter>
  );
}

export default App;
