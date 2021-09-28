import React, { FC, useEffect, useState } from 'react';
import { Figura, Genero } from '@defol-cl/root';
import { useParams } from "react-router-dom";

interface Params {
  slug: string
}

const FiguraView: FC = () => {
  const { slug } = useParams<Params>();
  const [ figura, setFigura ] = useState<Figura>();
  
  useEffect(() => {
    setFigura({
      slug,
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      genero: Genero.Masculino
    })
  }, [slug])
  
  return (
    <>
      <h1>figura</h1>
      {JSON.stringify(figura)}
    </>
  );
}

export default FiguraView;
