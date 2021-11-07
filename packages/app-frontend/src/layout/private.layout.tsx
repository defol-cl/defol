import React from 'react';
import Container from "@mui/material/Container";
import Topbar from "./private/Topbar";

const PrivateLayout: React.FC = ({ children }) => {
  return (
    <div className="private-layout">
      <Topbar/>
      <Container maxWidth="lg" sx={{ pt: 14, pb: 5, height: '100vh' }}>
        {children}
      </Container>
    </div>
  );
};

export default PrivateLayout;
