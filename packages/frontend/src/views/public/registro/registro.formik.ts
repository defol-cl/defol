import * as yup from 'yup';

export interface FormikRegistro {
  name: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
  serviceTerms: boolean
  privacyPolicy: boolean
}

export const validationRegistro = yup.object({
  name: yup.string()
    .min(3)
    .required(),
  lastName: yup.string()
    .min(3)
    .required(),
  username: yup.string()
    .email()
    .required(),
  password: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
  confirmPassword: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
  serviceTerms: yup.bool()
    .oneOf([true], 'Los términos del servicio deben ser aceptados'),
  privacyPolicy: yup.bool()
    .oneOf([true], 'La política de privacidad debe ser aceptada')
});
