import { PrivateRoutes } from "./private.types";

export const getPrivateRoutes = (path: string): PrivateRoutes => ({
  inicio: {
    name: 'Inicio',
    subpath: `${path}/`,
    route: () => `${path}/`,
  },
  conveniosListado: {
    name: 'Listado de Convenios',
    subpath: `${path}/convenios`,
    route: () => `${path}/convenios`,
  },
  convenioDetalle: {
    name: 'Detalle Convenio',
    subpath: `${path}/convenio/:conId`,
    route: params => `${path}/convenio/${params!['conId']}`,
  },
  preguntasListado: {
    name: 'Listado de Preguntas',
    subpath: `${path}/preguntas`,
    route: (params) => {
      const estado = params && params['estado'] ? params['estado'] : 'pendientes';
      const asignado = params && params['asignado'] ? params['asignado'] : 'mi';
      return `${path}/preguntas?estado=${estado}&asignado=${asignado}`;
    },
  },
  preguntaDetalle: {
    name: 'Detalle Pregunta',
    subpath: `${path}/pregunta/:preEmail/:preTimestamp`,
    route: params => `${path}/pregunta/${params!['preEmail']}/${params!['preTimestamp']}`,
  },
});
