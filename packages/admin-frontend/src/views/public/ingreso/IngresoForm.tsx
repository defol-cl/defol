import React, { FC, useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from 'aws-amplify';
import { useFormik } from "formik";
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FormikIngreso, validationIngreso } from "./ingreso.formik";
import { privateRoutes, publicRoutes } from "../../../navigation";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { PublicContext } from "../../../layout";

const IngresoForm: FC = () => {
  const history = useHistory();
  const { state } = useContext(PublicContext);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const formik = useFormik<FormikIngreso>({
    initialValues: {
      username: state.username || '',
      password: '',
      showPassword: false
    },
    validationSchema: validationIngreso,
    validateOnMount: true,
    onSubmit: ({ username, password }) => {
      setSigningIn(true);
      Auth.signIn(username as string, password)
        .then(user => {
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            //TODO vista de nueva contraseña requerida
          } else {
            history.push(privateRoutes.inicio.route());
          }
        })
        .finally(() => setSigningIn(false))
    }
  });
  
  const { handleChange, handleBlur, handleSubmit, values: { username, password, showPassword } } = formik;
  
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h1">Ingresa a DEFOL</Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>Y consulta ya a nuestro equipo de especialistas</Typography>
            <Alert severity="warning"
                   action={
                     <Button size="small" color="inherit" onClick={() => history.push(publicRoutes.registro.route())}>
                       Regístrate
                     </Button>
                   }>
              ¿Aún no tienes una cuenta?
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
            <FormControl sx={{ my: 1 }} variant="filled" fullWidth>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      id="showPassword"
                      onClick={() => formik.setFieldValue('showPassword', !showPassword)}
                      edge="end">
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }/>
            </FormControl>
            <Grid container spacing={2} sx={{mt: 3}}>
              <Grid item xs={6}>
                <LoadingButton
                  size="large" type="submit" variant="contained" fullWidth
                  disabled={!formik.isValid}
                  loading={signingIn}>
                  Ingresar
                </LoadingButton>
              </Grid>
              <Grid item xs={6}>
                <Button size="large" component={RouterLink} to={publicRoutes.recuperaContrasena.route()} fullWidth>
                  Recupera tu contraseña
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </Stack>
  );
}

export default IngresoForm;
