import AWS from "aws-sdk";
import { ConvenioContactoDynamo, ConvenioDynamo, RootInterface, PreguntaDynamo, RootEnum, RootUtils } from "@defol-cl/root";

const dynamo = new AWS.DynamoDB.DocumentClient();
const CONVENIO_TABLE = process.env.CONVENIO_TABLE;
const PREGUNTA_TABLE = process.env.PREGUNTA_TABLE;
const CONVENIO_CONTACTO_TABLE = process.env.CONVENIO_CONTACTO_TABLE;
const PREGUNTA_ESTADO_INDEX = process.env.PREGUNTA_ESTADO_INDEX;
const PREGUNTA_FECHA_ACTUALIZACION_INDEX = process.env.PREGUNTA_FECHA_ACTUALIZACION_INDEX;
const CONTACTO_EMAIL_INDEX = process.env.CONTACTO_EMAIL_INDEX;
const USER_CONVENIO_INDEX = process.env.USER_CONVENIO_INDEX;

export const getConvenios = (
  items: ConvenioDynamo[] = [],
  lastKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<ConvenioDynamo[]> => {
  return new Promise((resolve, reject) => {
    dynamo.scan({
      TableName: CONVENIO_TABLE,
      ExclusiveStartKey: lastKey
    }).promise()
    .then(res => {
      items = res.Items && res.Items.length 
              ? items.concat(res.Items as ConvenioDynamo[])
              : items;

      if(res.LastEvaluatedKey){
        resolve(getConvenios(items, res.LastEvaluatedKey));
        return;
      }

      resolve(items);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getConvenio = (convenioCod: string): Promise<ConvenioDynamo | undefined> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: CONVENIO_TABLE,
      KeyConditionExpression: "convenioCod = :convenioCod",
      ExpressionAttributeValues: {
        ":convenioCod": convenioCod,
      },
    }).promise()
    .then(res => {
      const item = res.Items.length ? res.Items[0] as ConvenioDynamo : undefined;
      resolve(item);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countPreguntasByUser = (contactoEmail: string, qty: number = 0, lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      KeyConditionExpression: "contactoEmail = :contactoEmail",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
      },
      ExclusiveStartKey: lastKey,
      Select: "COUNT"
    }).promise()
    .then(res => {
      if (res.Count) {
        qty += res.Count;
      }

      if(res.LastEvaluatedKey){
        resolve(countPreguntasByUser(contactoEmail, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countReplicasPendientesByUser = (contactoEmail: string, qty: number = 0, lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: PREGUNTA_ESTADO_INDEX,
      KeyConditionExpression: "contactoEmail = :contactoEmail and estado = :estado",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
        ":estado": RootEnum.EstadoPregunta.RESPONDIDA
      },
      ExclusiveStartKey: lastKey,
      Select: "COUNT"
    }).promise()
    .then(res => {
      if (res.Count) {
        qty += res.Count;
      }

      if(res.LastEvaluatedKey){
        resolve(countReplicasPendientesByUser(contactoEmail, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countPreguntasPendientesByUser = (contactoEmail: string, qty: number = 0, lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      KeyConditionExpression: "contactoEmail = :contactoEmail",
      FilterExpression: "estado <> :estado",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
        ":estado": RootEnum.EstadoPregunta.FINALIZADA
      },
      ExclusiveStartKey: lastKey,
      Select: "COUNT"
    }).promise()
    .then(res => {
      if (res.Count) {
        qty += res.Count;
      }

      if(res.LastEvaluatedKey){
        resolve(countPreguntasPendientesByUser(contactoEmail, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countPreguntasByUsuarioAndConvenio = (
  contactoEmail: string,
  convenioCod: string,
  qty: number = 0,
  lastKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: USER_CONVENIO_INDEX,
      KeyConditionExpression: "contactoEmail = :contactoEmail and convenioCod = :convenioCod",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
        ":convenioCod": convenioCod
      },
      ExclusiveStartKey: lastKey,
      Select: "COUNT"
    }).promise()
    .then(res => {
      if (res.Count) {
        qty += res.Count;
      }

      if(res.LastEvaluatedKey){
        resolve(countPreguntasByUsuarioAndConvenio(contactoEmail, convenioCod, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getConvenioContactoByUserAndConvenio = (
  email: string,
  convenioCod: string
): Promise<ConvenioContactoDynamo | undefined> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: CONVENIO_CONTACTO_TABLE,
      KeyConditionExpression: "convenioCod = :convenioCod and email = :email",
      ExpressionAttributeValues: {
        ":email": email,
        ":convenioCod": convenioCod
      }
    }).promise()
    .then(res => {
      const item = res.Items.length ? res.Items[0] as ConvenioContactoDynamo : undefined;
      resolve(item);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getConvenioContactoByUser = (
  email: string,
  items: ConvenioContactoDynamo[] = [],
  lastKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<ConvenioContactoDynamo[]> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: CONVENIO_CONTACTO_TABLE,
      IndexName: CONTACTO_EMAIL_INDEX,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email
      },
      ExclusiveStartKey: lastKey,
    }).promise()
    .then(res => {
      items = res.Items && res.Items.length 
              ? items.concat(res.Items as ConvenioContactoDynamo[])
              : items;

      if(res.LastEvaluatedKey){
        resolve(getConvenioContactoByUser(email, items, res.LastEvaluatedKey));
        return;
      }

      resolve(items);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getLastPreguntasByUserId = (
  contactoEmail: string,
  limit?: number,
  items: PreguntaDynamo[] = [],
  lastKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<PreguntaDynamo[]> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: PREGUNTA_FECHA_ACTUALIZACION_INDEX,
      KeyConditionExpression: "contactoEmail = :contactoEmail",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
      },
      ExclusiveStartKey: lastKey,
      ScanIndexForward: false,
      Limit: limit
    }).promise()
    .then(res => {
      items = res.Items && res.Items.length 
              ? items.concat(res.Items as PreguntaDynamo[])
              : items;

      if(items.length >= limit){
        resolve(items.slice(0,5));
        return;
      }

      if(res.LastEvaluatedKey){
        resolve(getLastPreguntasByUserId(contactoEmail, limit, items, res.LastEvaluatedKey));
        return;
      }

      resolve(items);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getLimitAndCountPreguntasByUsrId = async(
  contactoEmail: string,
  convenioCod: string,
  maxPreguntas?: number
): Promise<RootInterface.ConvenioPreguntaUsuario> => {
  let limitePreguntas = 0;
  const preguntasRealizadas = await countPreguntasByUsuarioAndConvenio(contactoEmail, convenioCod);

  if(!maxPreguntas){
    const convenioContacto = await getConvenioContactoByUserAndConvenio(contactoEmail, convenioCod);
    limitePreguntas = convenioContacto.preguntasMax;
  } else {
    limitePreguntas = maxPreguntas;
  }

  return {
    limitePreguntas,
    preguntasRealizadas
  }
}

export const getPregunta = (contactoEmail: string, timestamp: string): Promise<PreguntaDynamo | undefined> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      KeyConditionExpression: "contactoEmail = :contactoEmail and timestamp = :timestamp",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
        ":timestamp": timestamp,
      }
    }).promise()
    .then(res => {
      if(res.Items && res.Items.length){
        resolve(res.Items[0] as PreguntaDynamo);
      }
      resolve(undefined);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const putPregunta = async(
  pregunta: PreguntaDynamo
): Promise<void> => {
  return new Promise((resolve, reject) => {
    dynamo.put({
      TableName: PREGUNTA_TABLE,
      Item: pregunta
    }).promise()
    .then(res => {
      console.log(res);
      resolve();
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const putConvenio = async(
  convenio: ConvenioDynamo
): Promise<void> => {
  console.log(JSON.stringify(convenio, null, 2))
  console.log(CONVENIO_TABLE)
  return new Promise((resolve, reject) => {
    dynamo.put({
      TableName: CONVENIO_TABLE,
      Item: {
        cod: convenio.cod,
        nombre: convenio.nombre,
        fechaVencimiento: convenio.fechaVencimiento
      }
    }).promise()
    .then(res => {
      resolve();
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

// export const putItem = <T>(tableName: RootEnum.DynamoTables, item: T): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     dynamo.put({
//       TableName: tableName,
//       Item: item
//     }).promise()
//     .then(res => {
//       resolve();
//     }).catch(err => {
//       console.log(err);
//       reject(err);
//     })
//   })
// }