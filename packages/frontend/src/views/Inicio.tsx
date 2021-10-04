import React, { FC, useEffect } from 'react';
import { PreguntasSvc } from '../services';

const Inicio: FC = () => {
  
  useEffect(() => {
    PreguntasSvc.get()
      .then(response => console.log(response))
  }, []);
  
  return (
    <div>
      <h1>Inicio</h1>
    </div>
  );
}

export default Inicio;
