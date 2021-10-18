import { RouteData } from './index.types';

type PublicRouteName =
	'ingreso' |
	'registro' |
	'registroConfirmar' |
	'recuperaContrasena';

export type PublicRoutes = {
	[key in PublicRouteName]: RouteData;
};
