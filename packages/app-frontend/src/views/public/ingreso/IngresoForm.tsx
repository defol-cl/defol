import React, { useContext, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from 'aws-amplify';
import { useFormik } from "formik";
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FormikIngreso, validationIngreso } from "./ingreso.formik";
import { privateRoutes, publicRoutes } from "../../../navigation";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { TextField, useTheme } from "@mui/material";
import { PublicContext } from "src/layout";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

const IngresoForm: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();
  const { state } = useContext(PublicContext);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (error) {
      setSigningIn(false);
    }
  }, [error]);
  
  useEffect(() => {
    if (signingIn) {
      setError(false);
    }
  }, [signingIn]);
  
  const formik = useFormik<FormikIngreso>({
    initialValues: {
      username: state.username || '',
      password: '',
      showPassword: false
    },
    validationSchema: validationIngreso,
    validateOnMount: true,
    onSubmit: ({ username, password }) => {
      if (formik.isValid) {
        setSigningIn(true);
        Auth.signIn(username as string, password)
          .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
              //TODO vista de nueva contraseña requerida
            } else {
              history.push(privateRoutes.inicio.route());
            }
          })
          .catch(err => {
            setError(true);
            console.error(err);
          });
      }
    }
  });
  
  const { handleChange, handleBlur, handleSubmit, values: { username, password, showPassword } } = formik;
  
  return (
    <Grid sx={{ minHeight: '100%' }} container direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid container direction="column" justifyContent="flex-start" alignItems="center">
            <Box>
              <Grid container direction="row" justifyContent="flex-start" alignItems="center"
                    className="defol-logo" sx={{ color: theme.palette.text.primary }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                </svg>
                <Box>
                  <span className="defol-logo-text">DEFOL</span>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <br/>
          <br/>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom color="primary.main">
                  ¡Hola! Bienvenido
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                  Ingresa tus credenciales para continuar
                </Typography>
                <TextField
                  id="username"
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ my: 2 }}/>
                <TextField
                  id="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ marginRight: 0, marginLeft: '4px' }}
                          id="showPassword"
                          onClick={() => formik.setFieldValue('showPassword', !showPassword)}
                          edge="end">
                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                  }}
                  sx={{ my: 2 }}/>
                <Grow in={error} mountOnEnter unmountOnExit>
                  <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
                    <AlertTitle>Error al ingresar</AlertTitle>
                    Verifica que las credenciales utilizadas sean las correctas.
                  </Alert>
                </Grow>
                <Grid container direction="row-reverse" justifyContent="space-between" alignItems="center"
                      sx={{ mt: 1, mb: 4 }}>
                  <Link component={RouterLink} to={publicRoutes.recuperaContrasena.route()}>
                    ¿Se te olvidó tu contraseña?
                  </Link>
                </Grid>
                <LoadingButton size="large" type="submit" variant="contained" fullWidth
                               loading={signingIn}
                               loadingIndicator="Ingresando...">
                  Ingresar
                </LoadingButton>
                <Divider sx={{ my: 3 }}/>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Link component={RouterLink} to={publicRoutes.registro.route()} color="textPrimary">
                    ¿Aún no tienes una cuenta?
                  </Link>
                </Grid>
                <br/>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Grid>
  );
}

export default IngresoForm;
