import { RouteData } from './index.types';

type PrivateRouteName =
	'inicio';

export type PrivateRoutes = {
	[key in PrivateRouteName]: RouteData;
};
