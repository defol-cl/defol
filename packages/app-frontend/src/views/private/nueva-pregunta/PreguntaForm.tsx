import React from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  titulo: string
  antecedentes: string
  pregunta: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

const PreguntaForm: React.FC<Props> = ({titulo, antecedentes, pregunta, handleChange, handleBlur}) => {
  return (
    <>
      <TextField
        id="titulo"
        label="Título"
        helperText="Algo parecido al asunto de un correo, que resuma el contenido de la pregunta. O si queda más claro, sería como el título de la canción."
        fullWidth
        value={titulo}
        onChange={handleChange}
        onBlur={handleBlur}/>
      <TextField
        id="antecedentes"
        label="Antecedentes de tu consulta"
        helperText="Información importante respecto de tu consulta, antecedentes importantes que nuestro equipo legal deba conocer como parte del contexto."
        multiline
        minRows={5}
        fullWidth
        value={antecedentes}
        sx={{ mt: 1 }}
        onChange={handleChange}
        onBlur={handleBlur}/>
      <TextField
        id="pregunta"
        label="Pregunta"
        helperText="Indícanos cuál es tu consulta, siendo lo más claro posible."
        fullWidth
        value={pregunta}
        sx={{ mt: 1 }}
        onChange={handleChange}
        onBlur={handleBlur}/>
    </>
  );
}

export default PreguntaForm;
