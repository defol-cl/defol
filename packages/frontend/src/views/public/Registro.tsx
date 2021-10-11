import React, { FC } from 'react';
import { Grid } from "@mui/material";
import RegistroForm from "./registro/RegistroForm";
import RegistroText from "./registro/RegistroText";

const Registro: FC = () => {
  
  return (
    <Grid container>
      <Grid item xs={12} md={6} className="public-form">
        <RegistroForm/>
      </Grid>
      <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }} className="public-text">
        <RegistroText/>
      </Grid>
    </Grid>
  );
}

export default Registro;
