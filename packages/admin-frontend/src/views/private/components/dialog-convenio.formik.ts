import * as yup from 'yup';

export interface FormikDialogConvenio {
  nombre?: string
  fechaVencimiento?: string
}

export const validationDialogConvenio = yup.object({
  nombre: yup.string()
    .min(4, 'Debe tener como mínimo 6 caracteres')
    .required(),
  fechaVencimiento: yup.date()
    .required()
});
