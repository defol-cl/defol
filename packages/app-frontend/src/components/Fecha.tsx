import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";

interface Props {
  text: string
}

const Fecha: React.FC<Props> = ({text}) => {
  const fecha = moment(text);
  return (
    <>
      {fecha.format("DD/MM/YYYY")}
    </>
  );
};

export default Fecha;
