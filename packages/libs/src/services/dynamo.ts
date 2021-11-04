import AWS from "aws-sdk";
import { ConvenioDynamo } from "@defol-cl/root";

//Decidir si se extraerá nombre de aca o se le pasará a la función desde la lambda (tipo SSM)
const CONVENIO_TABLE = process.env.CONVENIO_TABLE;
const PREGUNTA_TABLE = process.env.PREGUNTA_TABLE;
const PREGUNTA_ESTADO_INDEX = process.env.PREGUNTA_ESTADO_INDEX;
const dynamo = new AWS.DynamoDB.DocumentClient();

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
        ":estado": "respondida"
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
        ":estado": "finalizada"
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