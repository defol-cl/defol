import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from "@mui/material/Skeleton";

const EsqueletoInternoIndicador: React.FC = () => {
  return (
    <>
      <Typography variant="h1" component="h4">
        <Skeleton width={50}/>
      </Typography>
      <Grid item xs={8}>
        <Typography variant="overline" color="secondary">
          <Skeleton/>
        </Typography>
        <Typography variant="body2">
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </Typography>
      </Grid>
    </>
  );
}

export default EsqueletoInternoIndicador;
