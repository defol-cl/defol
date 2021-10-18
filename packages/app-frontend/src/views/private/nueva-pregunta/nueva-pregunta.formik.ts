import * as yup from 'yup';

export interface FormikNuevaPregunta {
  titulo: string
  antecedentes: string
  pregunta: string
}

export const validationNuevaPregunta = yup.object({
  titulo: yup.string()
    .min(3)
    .required(),
  antecedentes: yup.string()
    .min(10)
    .required(),
  pregunta: yup.string()
    .min(5)
    .required(),
});
