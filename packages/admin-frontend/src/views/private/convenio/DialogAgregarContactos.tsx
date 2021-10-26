import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useFormik } from "formik";
import {
  FormikDialogConvenioAgregarContactos,
  validationDialogConvenioAgregarContactos
} from "./agregar-contactos.formik";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

interface Props {
  conId: string
  open: boolean
  onClose: () => void
}

const DialogAgregarContactos: React.FC<Props> = ({ conId, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const formik = useFormik<FormikDialogConvenioAgregarContactos>({
    initialValues: {
      contactos: ''
    },
    validationSchema: validationDialogConvenioAgregarContactos,
    validateOnMount: true,
    onSubmit: ({ contactos }) => {
      console.log(contactos);
    }
  });
  
  const {
    handleChange, handleBlur, handleSubmit, isValid, values: { contactos }
  } = formik;
  
  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen={fullScreen}>
        <DialogTitle >
          <GroupAddIcon fontSize="large"/> Asociar contactos al convenio - cód. '{conId}'
        </DialogTitle>
        <DialogContent>
          <TextField
            id="contactos"
            label="Listado de correos electrónicos de los contactos"
            helperText="Pueden estar separados por espacios, tabs, saltos de línea, coma (,) o punto y coma (;)"
            placeholder="paco@mail.com, luis@mail.com"
            variant="filled"
            multiline
            minRows={5}
            fullWidth
            value={contactos}
            onChange={handleChange}
            onBlur={handleBlur}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onClose} disabled={!isValid}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default DialogAgregarContactos;
