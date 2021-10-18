import { RouteData } from './index.types';

type PublicRouteName =
	'ingreso' |
	'recuperaContrasena';

export type PublicRoutes = {
	[key in PublicRouteName]: RouteData;
};
