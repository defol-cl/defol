import * as yup from 'yup';

export interface FormikMiPregunta {
  replica: string
}

export const validationNuevaPregunta = yup.object({
  replica: yup.string()
    .min(3)
    .required(),
});
