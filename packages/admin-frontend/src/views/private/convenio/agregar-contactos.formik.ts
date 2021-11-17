import * as yup from 'yup';

export interface FormikDialogConvenioAgregarContactos {
  contactos: string
  preguntasMax: number
}

export const validationDialogConvenioAgregarContactos = yup.object({
  contactos: yup.string()
    .min(4, 'Debe tener como mínimo 6 caracteres')
    .matches(/(?:((?:[\w-]+(?:\.[\w-]+)*)@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?:\.[a-z]{2})?))[;,\t\n\r\s]*)+/g)
    .required(),
  preguntasMax: yup.number()
    .integer()
    .min(1, 'Debe tener como mínimo 1 pregunta')
    .required()
});
