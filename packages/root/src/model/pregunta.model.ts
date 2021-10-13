export interface PreguntaRespuesta {
  pregunta: string
  respuesta: string
}

export interface Pregunta {
  titulo: string
  antecedentes: string
  interaccion: PreguntaRespuesta[]
}
