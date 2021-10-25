import React, { FC, useEffect } from 'react';
import { PreguntasSvc } from '../../services';
import Indicadores from "./inicio/Indicadores";

const Inicio: FC = () => {
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  return (
    <Indicadores/>
  );
}

export default Inicio;
