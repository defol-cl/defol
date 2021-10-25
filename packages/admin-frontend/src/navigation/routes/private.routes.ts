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
    route: () => `${path}/preguntas`,
  },
  preguntaDetalle: {
    name: 'Detalle Pregunta',
    subpath: `${path}/pregunta/:preId`,
    route: params => `${path}/pregunta/${params!['preId']}`,
  },
});
