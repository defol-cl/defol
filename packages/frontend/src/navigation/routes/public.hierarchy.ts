import { lazy } from "react";
import { getPublicRoutes } from "./public.routes";
import { NavigationInterface } from "./index.types";
import PublicGuard from "../../guards/public.guard";
import PublicLayout from "../../layout/public.layout";
import PublicLoading from "../../views/public/Public.loading";

const getPublicHierarchy = (path: string): NavigationInterface => {
  const publicRoutes = getPublicRoutes(path);
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
        component: lazy(() => import('../../views/public/ValidaCorreo')),
      },
      {
        ...publicRoutes.recuperaContrasena,
        component: lazy(() => import('../../views/public/RecuperaContrasena')),
      },
    ],
  };
};

export const publicHierarchy = getPublicHierarchy('/autenticacion');
