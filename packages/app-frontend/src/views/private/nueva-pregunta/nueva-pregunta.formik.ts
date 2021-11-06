import * as yup from 'yup';
import { Dao } from "@defol-cl/root";

export interface FormikNuevaPregunta {
  convenio?: Dao.Convenio
  titulo: string
  antecedentes: string
  pregunta: string
}

export const validationNuevaPregunta = yup.object({
  convenio: yup.object()
    .required(),
  titulo: yup.string()
    .min(3)
    .required(),
  antecedentes: yup.string()
    .min(10)
    .required(),
  pregunta: yup.string()
    .min(5)
    .required(),
});
