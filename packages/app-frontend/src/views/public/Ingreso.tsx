import React, { FC } from 'react';
import { Grid } from "@mui/material";
import IngresoForm from "./ingreso/IngresoForm";
import IngresoText from "./ingreso/IngresoText";

const Ingreso: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6} className="public-form">
        <IngresoForm/>
      </Grid>
      <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }} className="public-text">
        <IngresoText/>
      </Grid>
    </Grid>
  );
}

export default Ingreso;
