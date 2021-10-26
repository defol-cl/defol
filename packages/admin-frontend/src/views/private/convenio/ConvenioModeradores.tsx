import React from 'react';
import ConvenioModeradoresTabla from "./ConvenioModeradoresTabla";

interface Props {
  conId: string
}

const ConvenioModeradores: React.FC<Props> = ({ conId }) => {
  
  return (
    <>
      <ConvenioModeradoresTabla conId={conId}/>
    </>
  );
}

export default ConvenioModeradores;
