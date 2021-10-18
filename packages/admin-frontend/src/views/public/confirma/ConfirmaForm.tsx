import React, { FC, useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { Auth } from 'aws-amplify';
import { useFormik } from "formik";
import { FormikConfirma, validationConfirma } from "./confirma.formik";
import { PublicContext } from "../../../layout";
import { useHistory } from "react-router-dom";
import { publicRoutes } from "../../../navigation";

const ConfirmaForm: FC = () => {
  const history = useHistory();
  const { state } = useContext(PublicContext);
  const [confirming, setConfirming] = useState<boolean>(false);
  const formik = useFormik<FormikConfirma>({
    initialValues: {
      username: state.username || '',
      code: ''
    },
    validationSchema: validationConfirma,
    validateOnMount: true,
    onSubmit: ({ username, code }) => {
      setConfirming(true);
      Auth.confirmSignUp(username, code)
        .then(user => {
          history.push(publicRoutes.ingreso.route())
          console.log('user', user);
        })
        .catch(error => console.error(error))
        .finally(() => setConfirming(false))
    }
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values: { username, code }
  } = formik;
  
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h1">Confirma tu Registro</Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Estás a un paso para comenzar a operar con DEFOL.
            </Typography>
            <Typography variant="body1">
              Te hemos enviado un correo con un código, si no lo encuentras espera unos segundos.
            </Typography>
            <Typography variant="body1" gutterBottom>
              No olvides revisar en la bandeja de correos no deseados, a veces los filtros se confunden.
            </Typography>
            <FormControl sx={{ my: 1 }} variant="filled" fullWidth>
              <InputLabel htmlFor="username">Correo electrónico</InputLabel>
              <OutlinedInput
                id="username"
                type="text"
                disabled={state.username !== undefined}
                value={username}
                onChange={handleChange}
                onBlur={handleBlur}/>
            </FormControl>
            <FormControl sx={{ my: 1 }} variant="filled" fullWidth>
              <InputLabel htmlFor="code">Código de validación</InputLabel>
              <OutlinedInput
                id="code"
                type="text"
                value={code}
                onChange={handleChange}
                onBlur={handleBlur}/>
            </FormControl>
            <LoadingButton
              sx={{ mt: 3 }}
              size="large" type="submit" variant="contained" fullWidth
              disabled={!formik.isValid}
              loading={confirming}>
              Confirmar registro
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </Stack>
  );
}

export default ConfirmaForm;
