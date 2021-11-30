import React, { useContext, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material';
import Grid from "@mui/material/Grid";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { FormikConfirma, validationConfirma } from "./confirma.formik";
import { PublicContext } from "src/layout";
import { publicRoutes } from "src/navigation";

const ConfirmaForm: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();
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
      if (formik.isValid) {
        setConfirming(true);
        Auth.confirmSignUp(username, code)
          .then(user => {
            history.push(publicRoutes.ingreso.route())
            console.log('user', user);
          })
          .catch(error => console.error(error))
          .finally(() => setConfirming(false));
      }
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
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom color="primary.main">
                  Sólo falta confirmar el registro
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 1 }}>
                  Estás a un paso para comenzar a operar con DEFOL.
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 1 }}>
                  Te hemos enviado un correo con un código, si no lo encuentras espera unos segundos.
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                  No olvides revisar en la bandeja de correos no deseados, a veces los filtros se confunden.
                </Typography>
                <TextField
                  id="username"
                  label="Correo electrónico"
                  type="text"
                  variant="outlined" fullWidth
                  disabled={state.username !== undefined}
                  value={username}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
                <TextField
                  id="code"
                  label="Código de validación"
                  type="text"
                  variant="outlined" fullWidth
                  value={code}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
                <LoadingButton
                  sx={{ mt: 3 }}
                  size="large" type="submit" variant="contained" fullWidth
                  loading={confirming}>
                  Confirmar registro
                </LoadingButton>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Stack>
  );
}

export default ConfirmaForm;
