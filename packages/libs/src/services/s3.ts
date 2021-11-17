import { RootUtils } from "@defol-cl/root";
import { S3 } from "aws-sdk";

const s3 = new S3();
const DYNAMO_TOKENS_BUCKET = process.env.DYNAMO_TOKENS_BUCKET;

export const putDynamoToken = (body: any, key: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: DYNAMO_TOKENS_BUCKET,
      Key: key,
      Body: JSON.stringify(body)
    }).promise()
    .then(res => {
      console.log(RootUtils.logger(res, "Res S3:"));
      resolve();
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export const getDynamoToken = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: DYNAMO_TOKENS_BUCKET,
      Key: key
    }).promise()
    .then((res: S3.GetObjectOutput) => {
      console.log(RootUtils.logger(res.Body, "Res S3:"));
      if(res.Body){
        resolve(JSON.parse(res.Body.toString("utf-8")));
        return;
      }

      reject("Expired token");
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}