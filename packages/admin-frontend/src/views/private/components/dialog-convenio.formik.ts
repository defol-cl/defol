import * as yup from 'yup';

export interface FormikDialogConvenio {
  codigo: string
  nombre: string
  fechaVencimiento?: string
}

export const validationDialogConvenio = yup.object({
  codigo: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
  nombre: yup.string()
    .min(6, 'Debe tener como mínimo 6 caracteres')
    .required(),
  fechaVencimiento: yup.date()
    .required()
});
