import { PrivateRoutes } from "./private.types";

export const getPrivateRoutes = (path: string): PrivateRoutes => ({
  inicio: {
    name: 'Inicio',
    subpath: `${path}/`,
    route: () => `${path}/`,
  },
  nuevaPregunta: {
    name: 'Nueva Pregunta',
    subpath: `${path}/mi-pregunta/nueva`,
    route: () => `${path}/mi-pregunta/nueva`,
  },
  previsualizarPregunta: {
    name: 'Previsualizar Pregunta',
    subpath: `${path}/mi-pregunta/nueva/previsualizar`,
    route: () => `${path}/mi-pregunta/nueva/previsualizar`,
  },
  miPregunta: {
    name: 'Mi Pregunta',
    subpath: `${path}/mi-pregunta/:id`,
    route: params => `${path}/mi-pregunta/${params!['id']}`,
  },
  misPreguntas: {
    name: 'Mis Preguntas',
    subpath: `${path}/mis-preguntas`,
    route: params => `${path}/mis-preguntas${params && params['tipo'] ? `?tipo=${params['tipo']}` : ''}`,
  },
  misActualizaciones: {
    name: 'Mis Actualizaciones',
    subpath: `${path}/mis-actualizaciones`,
    route: () => `${path}/mis-actualizaciones`,
  },
});
