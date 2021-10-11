import React from 'react';
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const PublicLoading: React.FC = () => {
  return (
    <Stack sx={{ color: 'white' }} spacing={2} direction="column" alignItems="center">
      <CircularProgress color="inherit" />
      <Typography variant="h5" component="h1">
        Danos un par de segundos
      </Typography>
      <Typography variant="body1">
        No es que seamos lentos, nos gusta tomarnos nuestro tiempo :)
      </Typography>
    </Stack>
  );
};

export default PublicLoading;
