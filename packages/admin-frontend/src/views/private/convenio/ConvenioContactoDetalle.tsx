import React, { useEffect, useState } from "react";
import { PreguntasSvc } from "../../../services";
import { Dao } from "@defol-cl/root";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import { ListItemText } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/lab/Skeleton";
import { PreguntaMini } from "@defol-cl/root/src/dao";

interface Props {
  email: string
}

const ConvenioContactoDetalle: React.FC<Props> = ({ email }) => {
  
  const [preguntas, setPreguntas] = useState<Dao.PreguntaMini[]>()
  
  useEffect(() => {
    setPreguntas(undefined);
    PreguntasSvc.byContactoEmail(email)
      .then(preguntas => setPreguntas(preguntas))
      .catch(err => {
        console.error(err);
      });
  }, [email])
  
  return (
    <Box sx={{ width: 420, px: 3, py: 2 }}>
      <Card>
        <CardHeader title={preguntas ? 'Detalle Contacto' : <Skeleton variant="text" width={120}/>}
                    subheader={preguntas ? email : <Skeleton variant="text" width={100}/>}/>
        {preguntas && (
          <List>
            <ListItem secondaryAction={<>{preguntas.length}</>} divider>
              <ListItemText
                primary="Preguntas Realizadas"
              />
            </ListItem>
            {preguntas.map((pregunta, index) => (
              <ListItem key={index} secondaryAction={<>{pregunta.estado}</>}>
                <ListItemText
                  primary={pregunta.titulo}
                  secondary={`Creada el ${pregunta.timestamp}`}
                />
              </ListItem>
            ))}
          </List>
        )}
        {!preguntas && (
          <List>
            <ListItem secondaryAction={<Skeleton variant="text" width={40}/>} divider>
              <ListItemText
                primary={<Skeleton variant="text" width={140}/>}
              />
            </ListItem>
            {[1,2,3].map(index => (
              <ListItem key={index} secondaryAction={<Skeleton variant="text" width={90}/>}>
                <ListItemText
                  primary={<Skeleton variant="text" width={180}/>}
                  secondary={<Skeleton variant="text" width={200}/>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Card>
    </Box>
  );
}

export default ConvenioContactoDetalle;
