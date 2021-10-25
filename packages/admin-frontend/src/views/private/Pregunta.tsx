import React, { FC } from 'react';
import { useParams } from "react-router-dom";

interface Params {
  preId: string
}

const Pregunta: FC = () => {
  const { preId } = useParams<Params>();
  
  return (
    <>
      <h1>Detalle Pregunta {preId}</h1>
    </>
  );
}

export default Pregunta;
