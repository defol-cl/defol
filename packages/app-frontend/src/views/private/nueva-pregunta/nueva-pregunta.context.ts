import { Dao } from "@defol-cl/root";
import { createContext } from "react";

export interface NuevaPreguntaContextState {
  convenio: Dao.Convenio
  titulo: string
  antecedentes: string
  pregunta: string
}

export interface NuevaPreguntaContextProps {
  state?: NuevaPreguntaContextState
  setData: (data: NuevaPreguntaContextState) => void
  clear: () => void
}

const NuevaPreguntaContext = createContext<NuevaPreguntaContextProps>({
  setData: () => {},
  clear: () => {}
});

export default NuevaPreguntaContext;
