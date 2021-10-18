import React, { FC, useState } from 'react';
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { InputLabel, OutlinedInput } from "@mui/material";
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { FormikRecupera, validationRecupera } from "./recupera.formik";
import { publicRoutes } from "../../../navigation";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const RecuperaForm: FC = () => {
  const history = useHistory();
  const [recovering, setRecovering] = useState<boolean>(false);
  const formik = useFormik<FormikRecupera>({
    initialValues: {
      username: ''
    },
    validationSchema: validationRecupera,
    validateOnMount: true,
    onSubmit: ({ username }) => {
      setRecovering(true);
      Auth.forgotPassword(username as string)
        .then(() => {
        
        })
        .finally(() => setRecovering(false));
    }
  });
  
  const { handleChange, handleBlur, handleSubmit, values: { username } } = formik;
  
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h1">Recupera tu contraseña</Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              No te sientas mal, a nosotros también nos ha pasado :P
            </Typography>
            <Alert severity="warning"
                   action={
                     <Button color="inherit" size="small" onClick={() => history.push(publicRoutes.ingreso.route())}>
                       Inicia sesión
                     </Button>
                   }>
              ¿La recordaste?
            </Alert>
            <FormControl sx={{ my: 1 }} variant="filled" fullWidth>
              <InputLabel htmlFor="username">Correo electrónico</InputLabel>
              <OutlinedInput
                id="username"
                type="text"
                value={username}
                onChange={handleChange}
                onBlur={handleBlur}/>
            </FormControl>
            <LoadingButton
              sx={{mt: 3}}
              size="large" type="submit" variant="contained" fullWidth
              disabled={!formik.isValid}
              loading={recovering}>
              Recuperar
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </Stack>
  );
}

export default RecuperaForm;
