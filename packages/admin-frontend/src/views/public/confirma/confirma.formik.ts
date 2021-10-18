import * as yup from 'yup';

export interface FormikConfirma {
  username: string
  code: string
}

export const validationConfirma = yup.object({
  username: yup.string()
    .email()
    .required(),
  code: yup.string()
    .min(4, 'Debe tener como mínimo 4 caracteres')
    .required(),
});
