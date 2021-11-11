import React from 'react';
import List from '@mui/material/List';
import ConvenioListaItem from "./ConvenioListaItem";
import { Dao } from "@defol-cl/root";

interface Props {
  convenios: Dao.Convenio[]
}

const ConvenioLista: React.FC<Props> = ({ convenios }) => {
  return (
    <List disablePadding>
      {convenios.map((convenio, key) => (
        <ConvenioListaItem key={key} convenio={convenio}/>
      ))}
    </List>
  );
}

export default ConvenioLista;
