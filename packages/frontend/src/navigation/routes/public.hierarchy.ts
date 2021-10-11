import { lazy } from "react";
import { getPublicRoutes } from "./public.routes";
import { NavigationInterface } from "./index.types";
import PublicGuard from "../../guards/public.guard";
import { PublicLayout } from "../../layout";
import PublicLoading from "../../views/public/Public.loading";

export const publicPath = '/autenticacion';
export const publicRoutes = getPublicRoutes(publicPath);

const getPublicHierarchy = (path: string): NavigationInterface => {
  return {
    name: 'Public',
    guard: PublicGuard,
    path,
    layout: PublicLayout,
    loading: PublicLoading,
    otherwise: () => publicRoutes.ingreso.route(),
    routes: [
      {
        ...publicRoutes.ingreso,
        component: lazy(() => import('../../views/public/Ingreso')),
      },
      {
        ...publicRoutes.registro,
        component: lazy(() => import('../../views/public/Registro')),
      },
      {
        ...publicRoutes.registroConfirmar,
        component: lazy(() => import('../../views/public/Confirma')),
      },
      {
        ...publicRoutes.recuperaContrasena,
        component: lazy(() => import('../../views/public/Recupera')),
      },
    ],
  };
};

export const publicHierarchy = getPublicHierarchy(publicPath);
