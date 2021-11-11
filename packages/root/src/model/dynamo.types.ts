export interface ConvenioDynamo {
  cod: string
  fechaVencimiento: string
  nombre: string
}

export interface ConvenioModeradorDynamo {
  activo: boolean
  convenioCod: string
  email: string
}

export interface ConvenioContactoDynamo {
  convenioCod: string
  preguntasMax: number
  email: string
}

export interface InteraccionPreguntaDynamo {
  pregunta: string
  preguntaAt: string
  replica?: string
  replicaAt?: string
  ejecutivoEmail?: string
  ejecutivoNombre?: string
}

export interface PreguntaDynamo {
  contactoEmail: string
  timestamp: number
  contactoNombre: string
  antecedentes: string
  convenioCod: string
  estado: string
  interaccionesCantidad: number
  interaccionesMax: number
  interacciones: InteraccionPreguntaDynamo[]
  titulo: string
  pregunta: string
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