import React, { FC } from 'react';
import { Grid } from "@mui/material";
import ConfirmaForm from "./confirma/ConfirmaForm";
import ConfirmaText from "./confirma/ConfirmaText";

const Confirma: FC = () => {
  
  return (
    <Grid container>
      <Grid item xs={12} md={6} className="public-form">
        <ConfirmaForm/>
      </Grid>
      <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }} className="public-text">
        <ConfirmaText/>
      </Grid>
    </Grid>
  );
}

export default Confirma;
