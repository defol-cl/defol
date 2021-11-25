import { PreguntaDynamo } from "@defol-cl/root";
import { DynamoDB } from "aws-sdk";

export interface LastPreguntasOptions {
  limit?: number
  lastKey?: DynamoDB.DocumentClient.Key
}

export interface MisPreguntasOptions extends LastPreguntasOptions{
  items?: PreguntaDynamo[]
}