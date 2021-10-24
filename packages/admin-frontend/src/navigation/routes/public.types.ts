import { RouteData } from './index.types';

type PublicRouteName =
	'ingreso' |
	'completarNuevaContrasena' |
	'recuperaContrasena';

export type PublicRoutes = {
	[key in PublicRouteName]: RouteData;
};
