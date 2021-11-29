import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/lab/Skeleton';
import { ConvenioModeradorDynamo } from "@defol-cl/root";

interface Props {
  moderadores?: ConvenioModeradorDynamo[]
}

const ConvenioModeradoresTabla: React.FC<Props> = ({ moderadores }) => {
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Correo</TableCell>
            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {moderadores && moderadores.length === 0 && (
            <Box sx={{ m: 4 }}>
              <Typography variant="body1" gutterBottom>
                Aún no se han registrado moderadores.
              </Typography>
            </Box>
          )}
          {moderadores && moderadores.length > 0 && moderadores.map((moderador, key) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => console.log(key)}>
                <TableCell>{moderador.email}</TableCell>
                <TableCell align="center">
                  <Chip label="activo" size="small"
                        sx={{ backgroundColor: 'success.light', color: 'white', borderRadius: 1 }}/>
                </TableCell>
              </TableRow>
            );
          })}
          {[...Array(3)].map((_, key) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => console.log(key)}>
                <TableCell>
                  <Skeleton variant="text" width={150}/>
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="text" width={100}/>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ConvenioModeradoresTabla;
