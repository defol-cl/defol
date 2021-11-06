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
  cod: string
  convenioCod: string
  estado: string
  interacciones: number
  interaccionesMax: number
  timestamp: number
  titulo: string
  antecedentes: string
  pregunta: string
  username: string
  fechaActualizacion?: string
  fechaUltimoAcceso?: string
  cantReplicas?: number
  categoria?: string
  usernameEjecutivo?: string
}

export interface CategoriaDynamo {
  cod: string
  nombre: string
}