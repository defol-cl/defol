import React from 'react';
import Container from "@mui/material/Container";
import Topbar from "./private/Topbar";

const PrivateLayout: React.FC = ({ children }) => {
  return (
    <div className="private-layout">
      <Topbar/>
      <Container maxWidth="lg">
        {children}
      </Container>
    </div>
  );
};

export default PrivateLayout;
