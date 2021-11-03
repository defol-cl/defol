import { ConvenioDynamo } from "@defol-cl/root";
import AWS from "aws-sdk";

//Decidir si se extraerá nombre de aca o se le pasará a la función desde la lambda (tipo SSM)
const CONVENIO_TABLE = '';
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