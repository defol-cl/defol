import React, { FC, useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
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
import { Auth } from 'aws-amplify';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { FormikRegistro, validationRegistro } from "./registro.formik";
import { publicRoutes } from "../../../navigation";
import { PublicContext } from "../../../layout";

const RegistroForm: FC = () => {
  const history = useHistory();
  const { setUsername } = useContext(PublicContext);
  const [signingUp, setSigningUp] = useState<boolean>(false);
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
        .finally(() => setSigningUp(false))
    }
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values: { name, lastName, username, password, confirmPassword }
  } = formik;
  
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h1">Regístrate en DEFOL</Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>Y resuelve tus dudas con nuestro equipo de
              especialistas</Typography>
            <Alert severity="warning"
                   action={
                     <Button size="small" color="inherit" onClick={() => history.push(publicRoutes.ingreso.route())}>
                       Ingresa
                     </Button>
                   }>
              ¿Recordaste que ya tienes una cuenta?
            </Alert>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  id="name"
                  type="text"
                  variant="filled" fullWidth
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  id="lastName"
                  type="text"
                  variant="filled" fullWidth
                  value={lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
              </Grid>
            </Grid>
            <TextField
              id="username"
              type="text"
              variant="filled" fullWidth
              value={username}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <TextField
              id="password"
              type="password"
              variant="filled" fullWidth
              autoComplete="new-password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <TextField
              id="confirmPassword"
              type="password"
              variant="filled" fullWidth
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="serviceTerms" onChange={handleChange}/>} label={
                <>Acepto los <Link href="#" color="secondary">términos de servicio</Link> de DEFOL</>
              }/>
              <FormControlLabel control={<Checkbox id="privacyPolicy" onChange={handleChange}/>} label={
                <>Acepto la <Link href="#" color="secondary">política de privacidad</Link> respecto al uso de mi
                  información</>
              }/>
            </FormGroup>
            <LoadingButton
              sx={{ mt: 3 }}
              size="large" type="submit" variant="contained" fullWidth
              disabled={!formik.isValid}
              loading={signingUp}>
              Registrar
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </Stack>
  );
}

export default RegistroForm;
