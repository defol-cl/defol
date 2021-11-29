import React from 'react';
import ConvenioModeradoresTabla from "./ConvenioModeradoresTabla";
import { ConvenioModeradorDynamo } from "@defol-cl/root";

interface Props {
  moderadores?: ConvenioModeradorDynamo[]
}

const ConvenioModeradores: React.FC<Props> = ({ moderadores }) => {
  
  return (
    <ConvenioModeradoresTabla moderadores={moderadores}/>
  );
}

export default ConvenioModeradores;
