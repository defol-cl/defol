import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const PrivateLoading: React.FC = () => {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center"
          sx={{ px: 3, height: '100%' }}>
      <Typography variant="h3" align="center" gutterBottom component="h2">
        Danos unos momentos
      </Typography>
      <LinearProgress sx={{ width: '60%' }}/>
      <br/>
      <Typography variant="body1" align="center" gutterBottom>
        A veces toma un poco más de tiempo cargar la página, ten paciencia
      </Typography>
      <Typography variant="caption" align="center" color="textSecondary" gutterBottom>
        Un buen computador y una buena conexión aportan con el objetivo
      </Typography>
    </Grid>
  );
};

export default PrivateLoading;
