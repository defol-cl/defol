import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DatePicker from '@mui/lab/DatePicker';
import { useFormik } from "formik";
import { FormikDialogConvenio, validationDialogConvenio } from "./dialog-convenio.formik";
import moment from "moment";

interface Props {
  conId?: string
  open: boolean
  onClose: () => void
}

const DialogConvenio: React.FC<Props> = ({ conId, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const formik = useFormik<FormikDialogConvenio>({
    initialValues: {
      nombre: ''
    },
    validationSchema: validationDialogConvenio,
    validateOnMount: true,
    onSubmit: ({ nombre, fechaVencimiento }) => {
      console.log(nombre, fechaVencimiento);
    }
  });
  
  const {
    handleChange, handleBlur, handleSubmit, isValid, setFieldValue, values: { nombre, fechaVencimiento }
  } = formik;
  
  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen={fullScreen}>
        <DialogTitle>
          {conId ? `Editar convenio - cód. '${conId}'` : 'Crear Convenio'}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="nombre"
            label="Nombre"
            variant="filled"
            fullWidth
            value={nombre}
            onChange={handleChange}
            onBlur={handleBlur}/>
          <DatePicker
            openTo="year"
            views={['year', 'month', 'day']}
            label="Fecha vencimiento"
            value={fechaVencimiento ? moment(fechaVencimiento) : null}
            onChange={(newValue) => {
              newValue && setFieldValue('fechaVencimiento', newValue.format('YYYY-MM-DD'));
            }}
            renderInput={
              params =>
                <TextField {...params} variant="filled" fullWidth placeholder="dd/mm/aaaa"
                           onBlur={handleBlur}
                           helperText={fechaVencimiento ? moment(fechaVencimiento).fromNow() : undefined}/>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onClose} disabled={!isValid}>
            {conId ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default DialogConvenio;
