import React, { FC } from 'react';
import List from '@mui/material/List';
import ConvenioListaItem from "./ConvenioListaItem";

const ConvenioLista: FC = () => {
  return (
    <List disablePadding>
      {[...Array(10)].map((_, key) => (
        <ConvenioListaItem key={key}/>
      ))}
    </List>
  );
}

export default ConvenioLista;
