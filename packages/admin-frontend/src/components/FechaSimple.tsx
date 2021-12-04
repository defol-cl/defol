import React from 'react';
import moment from 'moment';

interface Props {
  timestamp?: string
}

const FechaSimple: React.FC<Props> = ({ timestamp }) => {
  const mFecha = moment(timestamp);
  
  if (timestamp === undefined) {
    return null;
  }
  return (
    <span>{mFecha.format('DD-MM-YYYY')} ({mFecha.fromNow()})</span>
  );
}

export default FechaSimple;
