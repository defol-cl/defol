import { PublicRoutes } from "./public.types";

export const getPublicRoutes = (path: string): PublicRoutes => ({
	ingreso: {
		name: 'Iniciar Sesión',
		subpath: `${path}/ingresar`,
		route: () => `${path}/ingresar`
	},
	completarNuevaContrasena: {
		name: 'Completar Nueva Contraseña',
		subpath: `${path}/nueva-contrasena`,
		route: () => `${path}/nueva-contrasena`
	},
	recuperaContrasena: {
		name: 'Recuperar Contraseña',
		subpath: `${path}/recuperar-contrasena`,
		route: () => `${path}/recuperar-contrasena`
	}
});
