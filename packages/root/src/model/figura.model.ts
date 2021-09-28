import { Genero } from ".";

export interface Figura {
  slug: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  nacimiento?: string
  genero: Genero
}
