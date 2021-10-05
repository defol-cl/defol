import { PrivateRoutes } from "./private.types";

export const getPrivateRoutes = (path: string): PrivateRoutes => ({
	inicio: {
		name: 'Inicio',
		subpath: `${path}`,
		route: () => `/${path}`,
	}
});
