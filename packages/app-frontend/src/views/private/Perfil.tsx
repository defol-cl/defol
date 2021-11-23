import React, { useEffect, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Auth } from "aws-amplify";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { FormikPerfil, validationPerfil } from "./perfil/perfil.formik";
import CardContent from "@mui/material/CardContent";

interface UserInfo {
  email: string;
  given_name: string;
  family_name: boolean;
}

const Perfil: React.FC = () => {
  const [user, setUser] = React.useState<any>();
  const [changingPassword, setChangingPassword] = useState<boolean>(false);
  
  useEffect(() => {
    Auth.currentUserInfo()
      .then(user => {
        setUser(user);
      });
  }, []);
  
  const formik = useFormik<FormikPerfil>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationPerfil,
    validateOnMount: true,
    onSubmit: ({ oldPassword, newPassword }) => {
      if (formik.isValid) {
        setChangingPassword(true);
        Auth.changePassword(user, oldPassword, newPassword)
          .then(() => {
            setFieldValue('oldPassword', '');
            setFieldValue('newPassword', '');
            setFieldValue('confirmPassword', '');
          })
          .catch()
          .finally(() => setChangingPassword(false));
      }
    }
  });
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
    values: { oldPassword, newPassword, confirmPassword }
  } = formik;
  
  const userInfo = user?.attributes as UserInfo;
  
  return (
    <>
      <Card>
        <CardHeader title="Perfil del Usuario"
                    subheader="Revisa tu información"/>
        <Divider/>
        <List>
          <ListItem>
            <ListItemText primary="Nombres"
                          secondary={
                            userInfo ? userInfo.given_name : <Skeleton variant="text" width={300}/>
                          }/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Apellidos"
                          secondary={
                            userInfo ? userInfo.family_name : <Skeleton variant="text" width={300}/>
                          }/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Correo Electrónico"
                          secondary={
                            userInfo ? userInfo.email : <Skeleton variant="text" width={300}/>
                          }/>
          </ListItem>
        </List>
      </Card>
      <Card>
        <CardHeader title="Cambia tus credenciales"/>
        <Divider/>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              id="oldPassword"
              label="Contraseña Actual"
              type="password"
              variant="outlined" fullWidth
              autoComplete="password"
              value={oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <TextField
              id="newPassword"
              label="Nueva Contraseña"
              type="password"
              variant="outlined" fullWidth
              autoComplete="new-password"
              value={newPassword}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <TextField
              id="confirmPassword"
              label="Confirmar nueva contraseña"
              type="password"
              variant="outlined" fullWidth
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}/>
            <LoadingButton sx={{ mt: 3 }} size="large" type="submit" variant="contained" fullWidth
                           disabled={!isValid}
                           loading={changingPassword}
                           loadingIndicator="Cambiando Contraseña...">
              Cambiar Contraseña
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default Perfil;
