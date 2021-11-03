export interface ConvenioDynamo {
  cod: string
  fechaVencimiento: string
  nombre: string
}

export interface ConvenioModeradorDynamo {
  activo: boolean
  convenioCod: string
  username: string
}

export interface ConvenioContactoDynamo {
  convenioCod: string
  preguntasMax: number
  username: string
}

export interface PreguntaDynamo {
  antecedentes: string
  cantReplicas: number
  categoria: string
  cod: string
  convenioCod: string
  estado: string
  fechaActualizacion: string
  fechaUltimoAcceso: string
  interacciones: string[]
  interaccionesMax: number
  timestamp: number
  titulo: string
  username: string
  usernameEjecutivo: string
}

export interface CategoriaDynamo {
  cod: string
  nombre: string
}