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
import { FormikAgregarModeradores, validationAgregarModeradores } from "./agregar-moderadores.formik";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { ConveniosSvc } from "../../../services";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  conId: string
  open: boolean
  onClose: (update: boolean) => void
}

const DialogAgregarModeradores: React.FC<Props> = ({ conId, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
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
  
  const putModeradores = () => {
    setLoading(true);
    ConveniosSvc.putModeradores(conId, moderadores)
      .then(() => onClose(true))
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }
  
  const formik = useFormik<FormikAgregarModeradores>({
    initialValues: {
      moderadores: ''
    },
    validationSchema: validationAgregarModeradores,
    validateOnMount: true,
    onSubmit: () => putModeradores()
  });
  
  const {
    handleChange, handleBlur, handleSubmit, isValid, values: { moderadores }
  } = formik;
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <AddModeratorIcon fontSize="large"/> Asociar moderadores al convenio - cód. '{conId}'
        </DialogTitle>
        <DialogContent>
          <TextField
            id="moderadores"
            label="Listado de correos electrónicos de los moderadores"
            helperText="Pueden estar separados por espacios, tabs, saltos de línea, coma (,) o punto y coma (;)"
            placeholder="paco@mail.com, luis@mail.com"
            variant="filled"
            multiline
            minRows={5}
            fullWidth
            value={moderadores}
            onChange={handleChange}
            onBlur={handleBlur}/>
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

export default DialogAgregarModeradores;
