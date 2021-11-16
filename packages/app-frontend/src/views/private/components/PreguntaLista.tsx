import React from 'react';
import List from '@mui/material/List';
import PreguntaListaItem from "./PreguntaListaItem";

const PreguntaLista: React.FC = () => {
  return (
    <List disablePadding>
      {[...Array(10)].map((_, key) => (
        <PreguntaListaItem key={key}/>
      ))}
    </List>
  );
}

export default PreguntaLista;
