import {DynamoDB} from "aws-sdk";
import {
  ConvenioContactoDynamo,
  ConvenioDynamo,
  RootInterface,
  PreguntaDynamo,
  RootEnum,
  DynamoIterator,
  LastEvaluatedKey
} from "@defol-cl/root";
import { LastPreguntasOptions } from "../types/dynamo.types";

const dynamo = new DynamoDB.DocumentClient();
const CONVENIO_TABLE = process.env.CONVENIO_TABLE;
const PREGUNTA_TABLE = process.env.PREGUNTA_TABLE;
const CONVENIO_CONTACTO_TABLE = process.env.CONVENIO_CONTACTO_TABLE;
const PREGUNTA_ESTADO_INDEX = process.env.PREGUNTA_ESTADO_INDEX;
const ESTADO_INDEX = process.env.ESTADO_INDEX;
const EJECUTIVO_EMAIL_ESTADO_INDEX = process.env.EJECUTIVO_EMAIL_ESTADO_INDEX;
const PREGUNTA_FECHA_ACTUALIZACION_INDEX = process.env.PREGUNTA_FECHA_ACTUALIZACION_INDEX;
const CONTACTO_EMAIL_INDEX = process.env.CONTACTO_EMAIL_INDEX;
const USER_CONVENIO_INDEX = process.env.USER_CONVENIO_INDEX;

export const getConvenios = (
  items: ConvenioDynamo[] = [],
  lastKey?: DynamoDB.DocumentClient.Key
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

export const getConvenio = (cod: string): Promise<ConvenioDynamo | undefined> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: CONVENIO_TABLE,
      KeyConditionExpression: "cod = :cod",
      ExpressionAttributeValues: {
        ":cod": cod,
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

export const countPreguntasByUser = (contactoEmail: string, qty: number = 0, lastKey?: DynamoDB.DocumentClient.Key): Promise<number> => {
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

export const countReplicasPendientesByUser = (contactoEmail: string, qty: number = 0, lastKey?: DynamoDB.DocumentClient.Key): Promise<number> => {
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

export const countPreguntasPendientesByUser = (contactoEmail: string, qty: number = 0, lastKey?: DynamoDB.DocumentClient.Key): Promise<number> => {
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
  lastKey?: DynamoDB.DocumentClient.Key
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
  lastKey?: DynamoDB.DocumentClient.Key
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
  options: LastPreguntasOptions,
  items: PreguntaDynamo[] = [],
): Promise<DynamoIterator<PreguntaDynamo>> => {
  const {limit, lastKey} = options;
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

      if(limit && items.length >= limit){
        resolve({ items: items.slice(0,5) });
        return;
      }

      if(limit && res.LastEvaluatedKey){
        resolve(getLastPreguntasByUserId(contactoEmail, {...options, lastKey: res.LastEvaluatedKey}, items));
        return;
      }

      resolve({
        items,
        token: res.LastEvaluatedKey
      });
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

export const getPreguntas = (
  lastKey?: DynamoDB.DocumentClient.Key,
): Promise<DynamoIterator<PreguntaDynamo>> => {
  return new Promise((resolve, reject) => {
    dynamo.scan({
      TableName: PREGUNTA_TABLE,
      ExclusiveStartKey: lastKey,
    }).promise()
    .then(res => {
      resolve({
        items: res.Items ? res.Items as PreguntaDynamo[] : [],
        token: res.LastEvaluatedKey
      });
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getPregunta = (contactoEmail: string, timestamp: string): Promise<PreguntaDynamo | undefined> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      KeyConditionExpression: "contactoEmail = :contactoEmail and #t = :timestamp",
      ExpressionAttributeValues: {
        ":contactoEmail": contactoEmail,
        ":timestamp": timestamp,
      },
      ExpressionAttributeNames: {
        "#t": "timestamp"
      }
    }).promise()
    .then(res => {
      if(res.Items && res.Items.length){
        resolve(res.Items[0] as PreguntaDynamo);
        return;
      }
      resolve(undefined);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getPreguntasByEjecutivo = (
  ejecutivo: string,
  lastKey?: DynamoDB.DocumentClient.Key
): Promise<DynamoIterator<PreguntaDynamo>> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: EJECUTIVO_EMAIL_ESTADO_INDEX,
      KeyConditionExpression: "ejecutivoEmail = :ejecutivoEmail",
      ExpressionAttributeValues: {
        ":ejecutivoEmail": ejecutivo
      },
      ExclusiveStartKey: lastKey
    }).promise()
    .then(res => {
      resolve({
        items: res.Items ? res.Items as PreguntaDynamo[] : [],
        token: res.LastEvaluatedKey
      });
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getPreguntasByEstado = (
  estado: string,
  lastKey?: DynamoDB.DocumentClient.Key,
): Promise<DynamoIterator<PreguntaDynamo>> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: EJECUTIVO_EMAIL_ESTADO_INDEX,
      KeyConditionExpression: "estado = :estado",
      ExpressionAttributeValues: {
        ":estado": estado
      },
      ExclusiveStartKey: lastKey
    }).promise()
    .then(res => {
      resolve({
        items: res.Items ? res.Items as PreguntaDynamo[] : [],
        token: res.LastEvaluatedKey
      });
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getPreguntasByEjecutivoAndEstados = (
  ejecutivo: string,
  estado: string,
  lastKey?: DynamoDB.DocumentClient.Key
): Promise<DynamoIterator<PreguntaDynamo>> => {
  return new Promise((resolve, reject) => {
    dynamo.query({
      TableName: PREGUNTA_TABLE,
      IndexName: EJECUTIVO_EMAIL_ESTADO_INDEX,
      KeyConditionExpression: "ejecutivoEmail = :ejecutivoEmail and estado = :estado",
      ExpressionAttributeValues: {
        ":ejecutivoEmail": ejecutivo,
        ":estado": estado
      },
      ExclusiveStartKey: lastKey
    }).promise()
    .then(res => {
      resolve({
        items: res.Items ? res.Items as PreguntaDynamo[] : [],
        token: res.LastEvaluatedKey
      });
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getPreguntasByEjecutivoEstados = async(
  ejecutivo?: string,
  estado?: string,
  lastKey?: any,
): Promise<DynamoIterator<PreguntaDynamo>> => {
  let response = [];
  const estadoPreguntas = estado ? estado.split(",") : estado;
  console.log("estados:", estadoPreguntas);
  if(ejecutivo && estado) {
    const lastKey: LastEvaluatedKey = {};
    for (const estadoPregunta of estadoPreguntas) {
      const estadoLastKey = lastKey ? lastKey[estadoPregunta] : undefined;
      const preguntas = await getPreguntasByEjecutivoAndEstados(ejecutivo, estadoPregunta, estadoLastKey);
      response = response.concat(preguntas.items);
      lastKey[estadoPregunta] = preguntas.token;
    }
    return {
      items: response,
      token: lastKey
    };
  } else if(ejecutivo) {
    return getPreguntasByEjecutivo(ejecutivo, lastKey)
  } else {
    for (const estadoPregunta of estadoPreguntas) {
      const estadoLastKey = lastKey ? lastKey[estadoPregunta] : undefined;
      const preguntas = await getPreguntasByEstado(estadoPregunta, estadoLastKey);
      response = response.concat(preguntas.items);
      lastKey[estadoPregunta] = preguntas.token;
    }
    return {
      items: response,
      token: lastKey
    };
  }
}

export const putPregunta = (
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

export const putConvenio = (
  convenio: ConvenioDynamo
): Promise<void> => {
  return new Promise((resolve, reject) => {
    dynamo.put({
      TableName: CONVENIO_TABLE,
      Item: convenio
    }).promise()
    .then(res => {
      resolve();
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const putConvenioContacto = (
  convenioContacto: ConvenioContactoDynamo
): Promise<void> => {
  return new Promise((resolve, reject) => {
    dynamo.put({
      TableName: CONVENIO_CONTACTO_TABLE,
      Item: convenioContacto
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