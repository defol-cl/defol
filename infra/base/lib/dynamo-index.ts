import * as cdk from '@aws-cdk/core';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as SSM from "@aws-cdk/aws-ssm";
import { DynamoKey } from './dynamo.types';

export interface IndexProps {
  table: dynamo.Table
  branch: string
  name: string
  type: "GLOBAL" | "LOCAL"
  partitionKey?: DynamoKey
  sortKey?: DynamoKey
}

export class DynamoIndex extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: IndexProps){
    const {branch, name, partitionKey, table, type, sortKey} = props;
    super(scope, id);

    const propsIndex = {
      indexName: name,
      projectionType: dynamo.ProjectionType.ALL
    };

    if(type === "GLOBAL" && partitionKey){
      table.addGlobalSecondaryIndex({
        ...propsIndex,
        partitionKey,
        sortKey
      })
    } else if(type == "LOCAL" && sortKey) {
      table.addLocalSecondaryIndex({
        ...propsIndex,
        sortKey
      })
    }

    new cdk.CfnOutput(this, `name-output`, {
      value: name,
      description: 'ResourcesDynamoIndexArn',
    });

    new SSM.StringParameter(this, `name-parameter`, {
      parameterName: `/defol/${branch}/base/resources-table-index-${name}`,
      description: 'Resources\'s table index name',
      stringValue: name
    });
  }
}