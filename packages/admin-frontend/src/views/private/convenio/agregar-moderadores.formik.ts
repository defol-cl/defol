import * as yup from 'yup';

export interface FormikAgregarModeradores {
  moderadores?: string
}

export const validationAgregarModeradores = yup.object({
  moderadores: yup.string()
    .min(4, 'Debe tener como mínimo 6 caracteres')
    .matches(/(?:((?:[\w-]+(?:\.[\w-]+)*)@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?:\.[a-z]{2})?))[;,\t\n\r\s]*)+/g)
    .required()
});
