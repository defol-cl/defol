import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";

interface Props {
  conId: string
}

const ConvenioModeradoresTabla: React.FC<Props> = ({ conId }) => {
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
          {[...Array(3)].map((_, key) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => console.log(key)}>
                <TableCell>jorge.zapata@munipenalolen.cl</TableCell>
                <TableCell align="center">
                  <Chip label="activo" size="small"
                        sx={{ backgroundColor: 'success.light', color: 'white', borderRadius: 1 }}/>
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
