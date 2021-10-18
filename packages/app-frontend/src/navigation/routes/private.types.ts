import { RouteData } from './index.types';

type PrivateRouteName =
	| 'inicio'
	| 'nuevaPregunta'
	| 'previsualizarPregunta'
	| 'miPregunta'
	| 'misPreguntas'
	| 'misActualizaciones';

export type PrivateRoutes = {
	[key in PrivateRouteName]: RouteData;
};
