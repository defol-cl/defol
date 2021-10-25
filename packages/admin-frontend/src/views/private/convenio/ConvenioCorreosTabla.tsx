import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CircularProgressLabel from "../components/CircularProgressLabel";

interface Props {
  conId: string
}

const ConvenioCorreosTabla: React.FC<Props> = ({ conId }) => {
  return (
    <TableContainer>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Correo</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Preguntas Disponibles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, key) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => console.log(key)}>
                <TableCell>juana.zuniga@gmail.com</TableCell>
                <TableCell align="center">
                  <Chip label="registrado" color="success"/>
                </TableCell>
                <TableCell align="center">
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <CircularProgressLabel value={2} total={3} label="portion"/>
                  </Grid>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ConvenioCorreosTabla;
