import { DynamoDB } from "aws-sdk";

export interface LastPreguntasOptions {
  limit?: number
  lastKey?: DynamoDB.DocumentClient.Key
}