import React, { useContext, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { useTheme } from "@mui/material";
import { Auth } from 'aws-amplify';
import { useFormik } from "formik";
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FormikRegistro, validationRegistro } from "./registro.formik";
import { publicRoutes } from "../../../navigation";
import { PublicContext } from "../../../layout";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grow from "@mui/material/Grow";

const RegistroForm: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();
  const { setUsername } = useContext(PublicContext);
  const [signingUp, setSigningUp] = useState<boolean>(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (error) {
      setSigningUp(false);
    }
  }, [error]);
  
  useEffect(() => {
    if (signingUp) {
      setError(false);
    }
  }, [signingUp]);
  
  const formik = useFormik<FormikRegistro>({
    initialValues: {
      name: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      serviceTerms: false,
      privacyPolicy: false,
    },
    validationSchema: validationRegistro,
    validateOnMount: true,
    onSubmit: ({ name, lastName, username, password }) => {
      if (formik.isValid) {
        setSigningUp(true);
        Auth.signUp({
          username,
          password,
          attributes: {
            given_name: name,
            family_name: lastName
          }
        })
          .then(user => {
            console.log('user', user);
            setUsername(username);
            history.push(publicRoutes.registroConfirmar.route());
          })
          .finally(() => setSigningUp(false));
      }
    }
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    values: { name, lastName, username, password, confirmPassword }
  } = formik;
  
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <Grid direction="column" justifyContent="center" alignItems="center">
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
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" component="h1" align="center" gutterBottom color="primary.main">
                Regístrate en DEFOL
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                Y resuelve tus dudas con nuestro equipo de especialistas
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <TextField
                    id="name"
                    label="Nombre(s)"
                    type="text"
                    variant="outlined" fullWidth
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="lastName"
                    label="Apellido(s)"
                    type="text"
                    variant="outlined" fullWidth
                    value={lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                </Grid>
              </Grid>
              <TextField
                id="username"
                label="Correo electrónico"
                type="text"
                variant="outlined" fullWidth
                value={username}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <TextField
                id="password"
                label="Contraseña"
                type="password"
                variant="outlined" fullWidth
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <TextField
                id="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                variant="outlined" fullWidth
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <FormGroup>
                <FormControlLabel control={<Checkbox id="serviceTerms" color="secondary" onChange={handleChange}/>}
                                  label={
                                    <>Acepto los <Link href="#" color="secondary">términos de servicio</Link> de
                                      DEFOL</>
                                  }/>
                <FormControlLabel control={<Checkbox id="privacyPolicy" color="secondary" onChange={handleChange}/>}
                                  label={
                                    <>Acepto la <Link href="#" color="secondary">política de privacidad</Link> respecto
                                      al uso de mi
                                      información</>
                                  }/>
              </FormGroup>
              <Grow in={error} mountOnEnter unmountOnExit>
                <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
                  <AlertTitle>Error al registrar</AlertTitle>
                  Lo más probable es que el correo registrado ya se encuentra en uso.
                </Alert>
              </Grow>
              <LoadingButton sx={{ mt: 3 }}
                             size="large" type="submit" variant="contained" fullWidth
                             disabled={!isValid}
                             loading={signingUp}
                             loadingIndicator="Registrando...">
                Registrar
              </LoadingButton>
              <Divider sx={{ my: 3 }}/>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Link component={RouterLink} to={publicRoutes.ingreso.route()} color="textPrimary">
                  ¿Ya tienes una cuenta?
                </Link>
              </Grid>
              <br/>
              <br/>
            </Box>
          </form>
        </Grid>
      </Container>
    </Stack>
  );
}

export default RegistroForm;
