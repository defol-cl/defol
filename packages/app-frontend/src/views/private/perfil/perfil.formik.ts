import * as yup from 'yup';

export interface FormikPerfil {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const validationPerfil = yup.object({
  oldPassword: yup.string()
    .required(),
  newPassword: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
  confirmPassword: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
});
