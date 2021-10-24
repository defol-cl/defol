import React, { useContext, useEffect, useState } from 'react';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { FormikNuevaContrasena, validationNuevaContrasena } from "./nueva-contrasena.formik";
import { PublicContext } from "../../../layout";
import { privateRoutes, publicRoutes } from "../../../navigation";

const NuevaContrasenaForm: React.FC = () => {
  const history = useHistory();
  const { state: { cognitoUser }, clearCognitoUser } = useContext(PublicContext);
  const [completingPassword, setCompletingPassword] = useState<boolean>(false);
  const formik = useFormik<FormikNuevaContrasena>({
    initialValues: {
      name: '',
      lastName: '',
      password1: '',
      password2: '',
      showPassword1: false,
      showPassword2: false
    },
    validationSchema: validationNuevaContrasena,
    validateOnMount: true,
    onSubmit: ({ name, lastName, password1 }) => {
      setCompletingPassword(true)
      Auth.completeNewPassword(
        cognitoUser,
        password1,
        {
          given_name: name,
          family_name: lastName
        }
      )
        .then(() => {
          clearCognitoUser();
          history.push(privateRoutes.inicio.route());
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => setCompletingPassword(false));
    }
  });
  
  useEffect(() => {
    if (cognitoUser) {
      setFieldValue('name', cognitoUser.challengeParam.userAttributes.given_name);
      setFieldValue('lastName', cognitoUser.challengeParam.userAttributes.family_name);
    }
  }, [])
  
  useEffect(() => {
    if (!cognitoUser) {
      Auth.currentAuthenticatedUser()
        .catch(() => {
          history.push(publicRoutes.ingreso.route());
        });
    }
  }, [cognitoUser])
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values: { name, lastName, password1, password2, showPassword1, showPassword2 }
  } = formik;
  
  console.log(errors);
  
  if (cognitoUser)
    return (
      <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" component="h1">Administración DEFOL</Typography>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Por motivos de seguridad te solicitamos definir una nueva contraseña
              </Typography>
              <TextField
                label="Usuario"
                variant="filled"
                fullWidth disabled
                value={cognitoUser.challengeParam.userAttributes.email}/>
              <TextField
                id="name"
                label="Nombres"
                variant="filled"
                fullWidth
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <TextField
                id="lastName"
                label="Apellidos"
                variant="filled"
                fullWidth
                value={lastName}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <TextField
                id="password1"
                autoComplete="new-password"
                label="Nueva contraseña"
                variant="filled"
                fullWidth
                type={showPassword1 ? 'text' : 'password'}
                value={password1}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ marginRight: 0, marginLeft: '4px' }}
                        id="showPassword"
                        onClick={() => formik.setFieldValue('showPassword1', !showPassword1)}
                        edge="end">
                        {showPassword1 ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                }}/>
              <TextField
                id="password2"
                autoComplete="new-password"
                label="Confirmar contraseña"
                variant="filled"
                fullWidth
                type={showPassword2 ? 'text' : 'password'}
                value={password2}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ marginRight: 0, marginLeft: '4px' }}
                        id="showPassword"
                        onClick={() => formik.setFieldValue('showPassword2', !showPassword2)}
                        edge="end">
                        {showPassword2 ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                }}/>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={6}>
                  <LoadingButton
                    size="large" type="submit" variant="contained" fullWidth
                    disabled={!formik.isValid}
                    loading={completingPassword}>
                    Cambiar contraseña
                  </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                  <Button size="large" fullWidth
                          onClick={() => clearCognitoUser()}>
                    Volver al ingreso
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Container>
      </Stack>
    )
  else return null;
}

export default NuevaContrasenaForm;
