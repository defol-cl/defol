import { PrivateRoutes } from "./private.types";

export const getPrivateRoutes = (path: string): PrivateRoutes => ({
  loading: {
    name: 'Cargando',
    subpath: `${path}/loading`,
    route: () => `${path}/loading`,
  },
  inicio: {
    name: 'Inicio',
    subpath: `${path}/`,
    route: () => `${path}/`,
  },
  perfil: {
    name: 'Perfil',
    subpath: `${path}/perfil`,
    route: () => `${path}/perfil`,
  },
  nuevaPregunta: {
    name: 'Nueva Pregunta',
    subpath: `${path}/nueva-pregunta`,
    route: () => `${path}/nueva-pregunta/paso1`,
  },
  nuevaPreguntaPaso: {
    name: 'Nueva Pregunta',
    subpath: `${path}/nueva-pregunta/:paso`,
    route: params => `${path}/nueva-pregunta/${params!['paso']}`,
  },
  miPregunta: {
    name: 'Mi Pregunta',
    subpath: `${path}/mi-pregunta/:timestamp`,
    route: params => `${path}/mi-pregunta/${params!['preTimestamp']}`,
  },
  misPreguntas: {
    name: 'Mis Preguntas',
    subpath: [`${path}/mis-preguntas`, `${path}/mis-preguntas/:tipo`],
    route: params => `${path}/mis-preguntas/${params && params['tipo'] ? `${params['tipo']}` : ''}`,
  },
  misActualizaciones: {
    name: 'Mis Actualizaciones',
    subpath: `${path}/mis-actualizaciones`,
    route: () => `${path}/mis-actualizaciones`,
  },
});
