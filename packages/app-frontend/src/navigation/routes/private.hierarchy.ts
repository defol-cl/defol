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
        ...privateRoutes.nuevaPregunta,
        component: lazy(() => import('../../views/private/NuevaPregunta')),
      },
      {
        ...privateRoutes.nuevaPreguntaPaso,
        component: lazy(() => import('../../views/private/NuevaPregunta')),
      },
      {
        ...privateRoutes.misActualizaciones,
        component: lazy(() => import('../../views/private/Actualizaciones')),
      },
      {
        ...privateRoutes.miPregunta,
        component: lazy(() => import('../../views/private/MiPregunta')),
      },
      {
        ...privateRoutes.misPreguntas,
        component: lazy(() => import('../../views/private/MisPreguntas')),
      }
    ],
  };
};

const privateHierarchy = getPrivateHierarchy(privatePath);

export { privatePath, privateRoutes, privateHierarchy };
