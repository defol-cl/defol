import React from 'react';
import Container from "@mui/material/Container";
import Topbar from "./private/Topbar";

const PrivateLayout: React.FC = ({ children }) => {
  return (
    <div className="private-layout">
      <Topbar/>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 5 }}>
        {children}
      </Container>
    </div>
  );
};

export default PrivateLayout;
