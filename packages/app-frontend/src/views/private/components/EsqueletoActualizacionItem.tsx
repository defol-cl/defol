import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import ListItemAvatar from '@mui/material/ListItemAvatar';

const EsqueletoActualizacionItem: React.FC = () => {
  return (
    <ListItem button sx={{ py: 3 }} divider>
      <ListItemAvatar sx={{ minWidth: '35px' }}>
        <Skeleton variant="circular" width={20} height={20} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton width={200}/>}
        primaryTypographyProps={{ variant: 'h5'}}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <>
            <Typography variant="caption" color="info.main">
              <Skeleton width={200}/>
            </Typography>
            <Typography variant="body2">
              <Skeleton width={400}/>
            </Typography>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 3 }}>
              <Stack direction="row" spacing={1}>
                <Skeleton height={30} width={150}/> <Skeleton height={30} width={150}/>
              </Stack>
              <Grid item>
                <Typography variant="subtitle2" color="info.main">
                  <Skeleton width={250}/>
                </Typography>
              </Grid>
            </Grid>
          </>
        }/>
    </ListItem>
  );
}

export default EsqueletoActualizacionItem;
