import React from 'react';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface Props {
  value: number
  total: number
  label?: 'percentage' | 'portion'
}

const CircularProgressLabel: React.FC<Props> = ({ value, total, label = 'percentage' }) => {
  const percentage = Math.round(100 * value / total);
  const text = label === 'percentage' ? `${percentage}%` : `${value}/${total}`;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={percentage}/>
      <Box sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="caption" component="div" color="text.secondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressLabel;
