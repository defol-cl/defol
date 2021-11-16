import React from 'react';
import { Grid } from "@mui/material";
import RegistroForm from "./registro/RegistroForm";
import RegistroText from "./registro/RegistroText";

const Registro: React.FC = () => {
  
  return (
    <Grid container>
      <Grid item xs={12} lg={6} className="public-form">
        <RegistroForm/>
      </Grid>
      <Grid item lg={6} sx={{ display: { xs: 'none', lg: 'block', display: 'flex' } }} className="public-text">
        <RegistroText/>
      </Grid>
    </Grid>
  );
}

export default Registro;
