import * as yup from 'yup';

export interface FormikIngreso {
  username?: string
  password?: string
  showPassword: boolean
}

export const validationIngreso = yup.object({
  username: yup.string()
    .email()
    .required(),
  password: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required()
});
