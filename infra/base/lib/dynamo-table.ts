import * as cdk from '@aws-cdk/core';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as SSM from "@aws-cdk/aws-ssm";
import { DynamoKey } from './dynamo.types';

export interface TableProps {
  branch: string
  name: string
  partitionKey: DynamoKey
  sortKey?: DynamoKey
}

export class DynamoTable extends cdk.Construct {
  public readonly table: dynamo.Table;

  constructor(scope: cdk.Construct, id: string, props: TableProps){
    super(scope, id);
    const {branch, name, partitionKey, sortKey} = props;

    this.table = new dynamo.Table(this, id, {
      tableName: `defol-${name}-${branch}`,
      partitionKey,
      sortKey,
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    new cdk.CfnOutput(this, `name-output`, {
      value: this.table.tableName,
      description: `ResourcesDynamoTableArn`,
    });

    new SSM.StringParameter(this, `name-parameter`, {
      parameterName: `/defol/${branch}/base/resources-table-${name}`,
      description: 'Resources\'s table name',
      stringValue: this.table.tableName
    });
  }
}