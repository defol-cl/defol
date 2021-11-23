export type ParamRoute = (params?: {[param: string]: string | number}) => string

export interface RouteData {
	name: string
	subpath: string | string[]
	route: ParamRoute
}

export interface RouteDataList {
	[name: string]: RouteData
}

export interface RouteInterface extends RouteData {
	exact?: boolean
	component?: any
}

export interface NavigationInterface {
	name: string
	path: string
	guard: React.FC
	layout: React.FC
	loading: React.FC
	otherwise: ParamRoute
	routes: RouteInterface[]
}
