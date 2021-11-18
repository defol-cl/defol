import React from 'react';
import { useParams } from "react-router-dom";
import PreguntaDetalle from "./pregunta/PreguntaDetalle";

interface Params {
  preEmail: string
  preTimestamp: string
}

const Pregunta: React.FC = () => {
  const { preEmail, preTimestamp } = useParams<Params>();
  
  return (
    <PreguntaDetalle email={preEmail} timestamp={preTimestamp}/>
  );
}

export default Pregunta;
