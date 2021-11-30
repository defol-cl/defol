import React, { useEffect, useState } from 'react';
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
import { ConveniosSvc } from "../../../services";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Grow } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  conId: string
  open: boolean
  onClose: (update: boolean) => void
}

const DialogAgregarContactos: React.FC<Props> = ({ conId, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setValues({
      contactos: '',
      preguntasMax: 2
    }, false);
  }, [open]);
  
  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error]);
  
  useEffect(() => {
    if(loading) {
      setError(false);
    }
  }, [loading]);
  
  const putContactos = () => {
    setLoading(true);
    ConveniosSvc.putContactos(conId, contactos, preguntasMax)
      .then(() => onClose(true))
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }
  
  const formik = useFormik<FormikDialogConvenioAgregarContactos>({
    initialValues: {
      contactos: '',
      preguntasMax: 2
    },
    validationSchema: validationDialogConvenioAgregarContactos,
    validateOnMount: true,
    onSubmit: () => putContactos()
  });
  
  const {
    handleChange, handleBlur, handleSubmit, isValid, setValues, values: { contactos, preguntasMax }
  } = formik;
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <GroupAddIcon fontSize="large"/> Asociar contactos al convenio - cód. '{conId}'
        </DialogTitle>
        <DialogContent>
          <TextField
            id="contactos"
            label="Listado de correos electrónicos de los contactos"
            helperText="Pueden estar separados por espacios, tabs, saltos de línea, coma (,) o punto y coma (;)"
            placeholder="paco@mail.com, luis@mail.com"
            variant="outlined"
            multiline
            minRows={5}
            fullWidth
            value={contactos}
            onChange={handleChange}
            onBlur={handleBlur}/>
          <TextField
            id="preguntasMax"
            type="number"
            label="Número máximo de preguntas"
            helperText="Cantidad de preguntas que podrán realizar los contactos que se cargarán al convenio"
            variant="outlined"
            fullWidth
            value={preguntasMax}
            onChange={handleChange}
            onBlur={handleBlur}/>
          <Grow in={error} mountOnEnter unmountOnExit>
            <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 1 }}
                   action={
                     <Button color="inherit" size="small" onClick={() => putContactos()}>
                       Reintentar
                     </Button>
                   }>
              <AlertTitle>Esto es un poco incómodo</AlertTitle>
              Ocurrió un error al asociar nuevos contactos.<br/>Te proponemos 2 alternativas, reintenta ahora mismo o
              conéctate más tarde y vuelve a intentarlo, y así tendremos un poco de tiempo para reparar este problema.
            </Alert>
          </Grow>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>
            Cancelar
          </Button>
          <LoadingButton type="submit" variant="contained" disabled={!isValid}
                         loading={loading}
                         loadingIndicator="Guardando...">
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogAgregarContactos;
