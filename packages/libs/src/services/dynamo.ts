import AWS from "aws-sdk";
import { ConvenioContactoDynamo, ConvenioDynamo, RootInterface, PreguntaDynamo, RootEnum } from "@defol-cl/root";

const dynamo = new AWS.DynamoDB.DocumentClient();
const CONVENIO_TABLE = process.env.CONVENIO_TABLE;
const PREGUNTA_TABLE = process.env.PREGUNTA_TABLE;
const CONVENIO_CONTACTO_TABLE = process.env.CONVENIO_CONTACTO_TABLE;
const PREGUNTA_ESTADO_INDEX = process.env.PREGUNTA_ESTADO_INDEX;
const CONTACTO_USERNAME_INDEX = process.env.CONTACTO_USERNAME_INDEX;
const USER_CONVENIO_INDEX = process.env.USER_CONVENIO_INDEX;

export const getConvenios = (items: ConvenioDynamo[] = [], lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<ConvenioDynamo[]> => {
  return new Promise((resolve, reject) => {
    dynamo.scan({
      TableName: CONVENIO_TABLE,
      ExclusiveStartKey: lastKey
    }).promise()
    .then(res => {
      if (res.Items && res.Items.length) {
        const convenios = (res.Items as ConvenioDynamo[]);
        items = items.length ? items.concat(convenios) : convenios;
      }

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

export const countPreguntasByUser = (username: string, qty: number = 0, lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
      ExclusiveStartKey: lastKey,
      Select: "COUNT"
    }).promise()
    .then(res => {
      if (res.Count) {
        qty += res.Count;
      }

      if(res.LastEvaluatedKey){
        resolve(countPreguntasByUser(username, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countReplicasPendientesByUser = (username: string, qty: number = 0, lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: PREGUNTA_ESTADO_INDEX,
      KeyConditionExpression: "username = :username and estado = :estado",
      ExpressionAttributeValues: {
        ":username": username,
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
        resolve(countReplicasPendientesByUser(username, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countPreguntasPendientesByUser = (username: string, qty: number = 0, lastKey?: AWS.DynamoDB.DocumentClient.Key): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      KeyConditionExpression: "username = :username",
      FilterExpression: "estado <> :estado",
      ExpressionAttributeValues: {
        ":username": username,
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
        resolve(countPreguntasPendientesByUser(username, qty, res.LastEvaluatedKey));
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
  username: string,
  convenioCod: string
): Promise<ConvenioContactoDynamo | undefined> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: CONVENIO_CONTACTO_TABLE,
      KeyConditionExpression: "convenioCod = :convenioCod and username = :username",
      ExpressionAttributeValues: {
        ":username": username,
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
  username: string,
  items: ConvenioContactoDynamo[] = [],
  lastKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<ConvenioContactoDynamo[]> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: CONVENIO_CONTACTO_TABLE,
      IndexName: CONTACTO_USERNAME_INDEX,
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username
      },
      ExclusiveStartKey: lastKey,
    }).promise()
    .then(res => {
      if (res.Items && res.Items.length) {
        items = items.concat(res.Items as ConvenioContactoDynamo[]);
      }

      if(res.LastEvaluatedKey){
        resolve(getConvenioContactoByUser(username, items, res.LastEvaluatedKey));
        return;
      }

      resolve(items);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const countPreguntasByUsuarioAndConvenio = (
  username: string,
  convenioCod: string,
  qty: number = 0,
  lastKey?: AWS.DynamoDB.DocumentClient.Key
): Promise<number> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: USER_CONVENIO_INDEX,
      KeyConditionExpression: "username = :username and convenioCod = :convenioCod",
      ExpressionAttributeValues: {
        ":username": username,
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
        resolve(countPreguntasByUsuarioAndConvenio(username, convenioCod, qty, res.LastEvaluatedKey));
        return;
      }

      resolve(qty);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getPreguntasByUsrId = async(
  username: string,
  convenioCod: string,
  maxPreguntas?: number
): Promise<RootInterface.ConvenioPreguntaUsuario> => {
  let limitePreguntas = 0;
  const preguntasRealizadas = await countPreguntasByUsuarioAndConvenio(username, convenioCod);

  if(!maxPreguntas){
    const convenioContacto = await getConvenioContactoByUserAndConvenio(username, convenioCod);
    limitePreguntas = convenioContacto.preguntasMax;
  } else {
    limitePreguntas = maxPreguntas;
  }

  return {
    limitePreguntas,
    preguntasRealizadas
  }
}

export const preguntaPut = async(
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