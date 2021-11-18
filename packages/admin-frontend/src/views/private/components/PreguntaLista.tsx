import React, { useEffect } from 'react';
import List from '@mui/material/List';
import PreguntaListaItem from "./PreguntaListaItem";
import { PreguntasSvc } from "src/services";
import { Dao, DynamoIteratorFront } from "@defol-cl/root";

interface Props {
  estados?: string[]
  ejecutivo?: string
}

const PreguntaLista: React.FC<Props> = ({estados, ejecutivo}) => {
  const [iterator, setIterator] = React.useState<DynamoIteratorFront<Dao.Pregunta>>();
  
  useEffect(() => {
    let mounted = true;
    PreguntasSvc.get({estados, ejecutivo})
      .then(iterator => mounted && setIterator(iterator));
    return () => {
      mounted = false;
    };
  }, [estados, ejecutivo]);
  
  if(!iterator) {
    return null;
  } else {
    return (
      <List disablePadding>
        {iterator.items.map((pregunta, key) => (
          <PreguntaListaItem key={key} pregunta={pregunta}/>
        ))}
      </List>
    );
  }
}

export default PreguntaLista;
