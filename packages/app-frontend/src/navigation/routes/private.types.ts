import { RouteData } from './index.types';

type PrivateRouteName =
	| 'inicio'
	| 'nuevaPregunta'
	| 'nuevaPreguntaPaso'
	| 'miPregunta'
	| 'misPreguntas'
	| 'misActualizaciones';

export type PrivateRoutes = {
	[key in PrivateRouteName]: RouteData;
};
