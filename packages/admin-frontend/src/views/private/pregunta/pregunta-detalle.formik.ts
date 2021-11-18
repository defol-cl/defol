import * as yup from 'yup';

export interface FormikPreguntaDetalle {
  respuesta: string
}

export const validationPreguntaDetalle = yup.object({
  respuesta: yup.string()
    .min(3)
    .required(),
});
