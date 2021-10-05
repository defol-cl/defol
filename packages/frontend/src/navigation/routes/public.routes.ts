import { PublicRoutes } from "./public.types";

export const getPublicRoutes = (path: string): PublicRoutes => ({
	ingreso: {
		name: 'Iniciar Sesión',
		subpath: `${path}/ingresar`,
		route: () => `${path}/ingresar`
	},
	registro: {
		name: 'Registro',
		subpath: `${path}/registrar`,
		route: () => `${path}/registrar`
	},
	registroConfirmar: {
		name: 'Confirmar Registro',
		subpath: `${path}/confirmar-registro`,
		route: () => `${path}/confirmar-registro`
	},
	recuperaContrasena: {
		name: 'Recuperar Contraseña',
		subpath: `${path}/recuperar-contrasena`,
		route: () => `${path}/recuperar-contrasena`
	}
});
