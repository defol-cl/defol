import React, { FC } from 'react';
import List from '@mui/material/List';
import ActualizacionListaItem from './ActualizacionListaItem';

const ActualizacionLista: FC = () => {
  return (
    <List disablePadding>
      {[...Array(10)].map((_, key) => (
        <ActualizacionListaItem key={key}/>
      ))}
    </List>
  );
}

export default ActualizacionLista;
