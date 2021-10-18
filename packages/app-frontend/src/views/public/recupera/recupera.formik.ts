import * as yup from "yup";

export interface FormikRecupera {
  username?: string
}

export const validationRecupera = yup.object({
  username: yup.string()
    .email()
    .required()
});
