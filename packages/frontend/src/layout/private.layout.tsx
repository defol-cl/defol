import React from 'react';
import Topbar from "./private/Topbar";
import Container from "@mui/material/Container";

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
