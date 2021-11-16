import React, { useState } from 'react';
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import { InputLabel, OutlinedInput, useTheme } from "@mui/material";
import { Auth } from 'aws-amplify';
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import { FormikRecupera, validationRecupera } from "./recupera.formik";
import { publicRoutes } from "../../../navigation";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

const RecuperaForm: React.FC = () => {
  const theme = useTheme();
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
                  Recupera tu contraseña
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 1 }}>
                  No te sientas mal, a nosotros también nos ha pasado :P
                </Typography>
                <FormControl sx={{ my: 2 }} variant="outlined" fullWidth>
                  <InputLabel htmlFor="username">Correo electrónico</InputLabel>
                  <OutlinedInput
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                </FormControl>
                <LoadingButton sx={{ mt: 3 }}
                               size="large" type="submit" variant="contained" fullWidth
                               loadingIndicator="Recuperando..."
                               loading={recovering}>
                  Recuperar
                </LoadingButton>
                <Divider sx={{ my: 3 }}/>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Link component={RouterLink} to={publicRoutes.ingreso.route()} color="textPrimary">
                    ¿Recordaste la contraseña?
                  </Link>
                </Grid>
                <br/>
                <br/>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Stack>
  );
}

export default RecuperaForm;
