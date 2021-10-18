import { PublicRoutes } from "./public.types";

export const getPublicRoutes = (path: string): PublicRoutes => ({
	ingreso: {
		name: 'Iniciar Sesión',
		subpath: `${path}/ingresar`,
		route: () => `${path}/ingresar`
	},
	recuperaContrasena: {
		name: 'Recuperar Contraseña',
		subpath: `${path}/recuperar-contrasena`,
		route: () => `${path}/recuperar-contrasena`
	}
});
