import * as yup from 'yup';

export interface FormikDialogConvenioAgregarContactos {
  contactos: string
  preguntasMax: number
}

export const validationDialogConvenioAgregarContactos = yup.object({
  contactos: yup.string()
    .min(4, 'Debe tener como mínimo 6 caracteres')
    .test('email-list', value => {
      if (value) {
        return value.split(/[,;\s\t\n\r]+/).every(email => {
          if (email.trim().length > 0) {
            return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email)
          }
          return true;
        })
      }
      return false;
    })
    .required(),
  preguntasMax: yup.number()
    .integer()
    .min(1, 'Debe tener como mínimo 1 pregunta')
    .required()
});
