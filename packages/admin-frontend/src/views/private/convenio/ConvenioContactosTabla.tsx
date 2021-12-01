import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Drawer from '@mui/material/Drawer';
import { ConvenioContactoDynamo } from "@defol-cl/root";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import ConvenioContactoDetalle from "./ConvenioContactoDetalle";

interface Props {
  contactos?: ConvenioContactoDynamo[]
}

const ConvenioContactosTabla: React.FC<Props> = ({ contactos }) => {
  const [contacto, setContacto] = useState<ConvenioContactoDynamo>();
  
  return (
    <>
      <Drawer anchor="right" open={contacto !== undefined} onClose={() => setContacto(undefined)}>
        {contacto && (
          <ConvenioContactoDetalle email={contacto.email}/>
        )}
      </Drawer>
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
            {contactos && contactos.length === 0 && (
              <Box sx={{ m: 4 }}>
                <Typography variant="body1" gutterBottom>
                  Aún no se han registrado contactos.
                </Typography>
              </Box>
            )}
            {contactos && contactos.length > 0 && contactos.map((contacto, key) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => setContacto(contactos[key])}
                          sx={{ cursor: 'pointer' }}>
                  <TableCell>{contacto.email}</TableCell>
                  <TableCell align="center">
                    <Chip label="registrado" size="small"
                          sx={{ backgroundColor: 'success.light', color: 'white', borderRadius: 1 }}/>
                  </TableCell>
                  <TableCell align="center">{contacto.preguntasMax}</TableCell>
                </TableRow>
              );
            })}
            {contactos === undefined && [1, 2, 3].map((_, key) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={key} onClick={() => console.log(key)}>
                  <TableCell>
                    <Skeleton variant="text" width={150}/>
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={100}/>
                  </TableCell>
                  <TableCell align="center">
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Skeleton variant="circular" width={40} height={40}/>
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ConvenioContactosTabla;
