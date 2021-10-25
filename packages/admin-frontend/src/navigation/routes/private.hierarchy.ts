import { lazy } from "react";
import { getPrivateRoutes } from "./private.routes";
import { NavigationInterface } from "./index.types";
import PrivateGuard from "../../guards/private.guard";
import { PrivateLayout } from "../../layout";
import PrivateLoading from "../../views/private/Private.loading";

const privatePath = '';
const privateRoutes = getPrivateRoutes(privatePath);

const getPrivateHierarchy = (path: string): NavigationInterface => {
  const privateRoutes = getPrivateRoutes(path);
  return {
    name: 'Private',
    guard: PrivateGuard,
    path,
    layout: PrivateLayout,
    loading: PrivateLoading,
    otherwise: () => privateRoutes.inicio.route(),
    routes: [
      {
        ...privateRoutes.inicio,
        exact: true,
        component: lazy(() => import('../../views/private/Inicio')),
      },
      {
        ...privateRoutes.conveniosListado,
        component: lazy(() => import('../../views/private/Convenios')),
      },
      {
        ...privateRoutes.convenioDetalle,
        component: lazy(() => import('../../views/private/Convenio')),
      },
      {
        ...privateRoutes.preguntasListado,
        component: lazy(() => import('../../views/private/Preguntas')),
      },
      {
        ...privateRoutes.preguntaDetalle,
        component: lazy(() => import('../../views/private/Pregunta')),
      },
    ],
  };
};

const privateHierarchy = getPrivateHierarchy(privatePath);

export { privatePath, privateRoutes, privateHierarchy };
