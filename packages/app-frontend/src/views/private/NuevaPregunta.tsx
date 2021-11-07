import React from 'react';
import Collapse from '@mui/material/Collapse';
import { Redirect, useParams } from 'react-router-dom';
import { privateRoutes } from "../../navigation";
import NuevaPreguntaContext, {
  NuevaPreguntaContextProps,
  NuevaPreguntaContextState
} from './nueva-pregunta/nueva-pregunta.context';
import NuevaPreguntaPaso1 from "./nueva-pregunta/NuevaPreguntaPaso1";
import NuevaPreguntaPaso2 from "./nueva-pregunta/NuevaPreguntaPaso2";

interface Params {
  paso: string
}

enum Paso {
  paso1 = 'paso1',
  paso2 = 'paso2',
}

const NuevaPregunta: React.FC = () => {
  const { paso } = useParams<Params>();
  const [state, setState] = React.useState<NuevaPreguntaContextState>();
  
  const setData = (data: NuevaPreguntaContextState) => setState(data);
  const clear = () => setState(undefined);
  const context: NuevaPreguntaContextProps = { state, setData, clear };
  
  if (paso in Paso) {
    return (
      <NuevaPreguntaContext.Provider value={context}>
        <Collapse in={paso === 'paso1'}>
          <NuevaPreguntaPaso1/>
        </Collapse>
        <Collapse in={paso === 'paso2'}>
          <NuevaPreguntaPaso2/>
        </Collapse>
      </NuevaPreguntaContext.Provider>
    );
  } else {
    return <Redirect to={privateRoutes.nuevaPregunta.route()}/>;
  }
}

export default NuevaPregunta;
