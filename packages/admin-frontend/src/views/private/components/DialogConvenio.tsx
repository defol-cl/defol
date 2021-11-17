import React, { useEffect } from 'react';
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
import { ConveniosSvc } from "../../../services";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Props {
  conCod?: string
  open: boolean
  onClose: () => void
}

const DialogConvenio: React.FC<Props> = ({ conCod, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  
  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);
  
  useEffect(() => {
    if (loading) {
      setError(false);
    }
  }, [loading]);
  
  const formik = useFormik<FormikDialogConvenio>({
    initialValues: {
      codigo: conCod ? conCod : '',
      nombre: ''
    },
    validationSchema: validationDialogConvenio,
    validateOnMount: true,
    onSubmit: ({ codigo, nombre, fechaVencimiento }) => {
      setLoading(true);
      (conCod ? ConveniosSvc.put : ConveniosSvc.post)({
        cod: conCod ? conCod : codigo,
        nombre,
        fechaVencimiento: fechaVencimiento as string
      })
        .then(() => onClose())
        .catch(err => {
          console.error(err);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  });
  
  const {
    handleChange, handleBlur, handleSubmit, isValid, setFieldValue, errors, values: { codigo, nombre, fechaVencimiento }
  } = formik;
  
  return (
    <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="lg" fullScreen={fullScreen}
            disableEscapeKeyDown={loading}>
      <DialogTitle>
        {conCod ? `Editar convenio - cód. '${conCod}'` : 'Crear Convenio'}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="codigo"
          label="Código"
          variant="outlined"
          disabled={!!conCod}
          fullWidth
          value={codigo}
          onChange={handleChange}
          onBlur={handleBlur}/>
        <TextField
          id="nombre"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={handleChange}
          onBlur={handleBlur}/>
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label="Fecha vencimiento"
          value={fechaVencimiento ? moment(fechaVencimiento) : null}
          onChange={newValue => {
            if (newValue)
              console.log(newValue, newValue.format('YYYY-MM-DD'));
            newValue && setFieldValue('fechaVencimiento', newValue.format('YYYY-MM-DD'));
          }}
          renderInput={
            params =>
              <TextField {...params} id="fechaVencimiento" variant="outlined" fullWidth placeholder="dd/mm/aaaa"
                         onBlur={handleBlur}
                         helperText={fechaVencimiento ? moment(fechaVencimiento).fromNow() : undefined}/>
          }
        />
        {error && (
          <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Es duro cuando ocurre un error</AlertTitle>
            Y lamentamos no haber podido {conCod ? 'editar' : 'crear'} el convenio, por favor inténtalo otra vez o
            prueba más tarde.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <LoadingButton variant="contained" disabled={!isValid}
                       onClick={() => handleSubmit()}
                       loading={loading}
                       loadingIndicator={conCod ? 'Guardando...' : 'Creando...'}>
          {conCod ? 'Guardar' : 'Crear'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConvenio;
