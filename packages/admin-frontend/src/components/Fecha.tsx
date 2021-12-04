import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';

interface Props {
  timestamp?: string
}

const Fecha: React.FC<Props> = ({ timestamp }) => {
  const mFecha = moment(timestamp);
  
  if (timestamp === undefined) {
    return null;
  }
  return (
    <Tooltip title={mFecha.format('DD-MM-YYYY hh:mm')}>
      <span>{mFecha.fromNow()}</span>
    </Tooltip>
  );
}

export default Fecha;
