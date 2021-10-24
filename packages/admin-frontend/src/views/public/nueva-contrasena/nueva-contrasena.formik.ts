import * as yup from 'yup';

export interface FormikNuevaContrasena {
  name: string
  lastName: string
  password1: string
  password2: string
  showPassword1: boolean
  showPassword2: boolean
}

export const validationNuevaContrasena = yup.object({
  name: yup.string()
    .min(3, 'Debe tener como mínimo 6 caracteres')
    .required(),
  lastName: yup.string()
    .min(3, 'Debe tener como mínimo 6 caracteres')
    .required(),
  password1: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
  password2: yup.string()
    .oneOf([yup.ref('password1'), null], 'Las contraseñas deben coincidir')
    .required(),
});
