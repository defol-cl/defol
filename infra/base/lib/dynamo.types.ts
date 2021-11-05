import { AttributeType } from "@aws-cdk/aws-dynamodb";

export interface DynamoKey {
  name: string
  type: AttributeType
}