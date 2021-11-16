import React from 'react';
import { Grid } from "@mui/material";
import IngresoForm from "./ingreso/IngresoForm";
import IngresoText from "./ingreso/IngresoText";

const Ingreso: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={6} className="public-form">
        <IngresoForm/>
      </Grid>
      <Grid item lg={6} sx={{ display: { xs: 'none', lg: 'block', display: 'flex' } }} className="public-text">
        <IngresoText/>
      </Grid>
    </Grid>
  );
}

export default Ingreso;
