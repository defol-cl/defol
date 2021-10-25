import { RouteData } from './index.types';

type PrivateRouteName =
	| 'inicio'
	| 'conveniosListado'
	| 'convenioDetalle'
	| 'preguntasListado'
	| 'preguntaDetalle';

export type PrivateRoutes = {
	[key in PrivateRouteName]: RouteData;
};
