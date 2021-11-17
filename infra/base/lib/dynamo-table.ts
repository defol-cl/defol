import { DynamoDB, SharedIniFileCredentials } from 'aws-sdk';
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

const checkIfDynamoDbExists = async( name: string, region: string ): Promise<boolean> => {
  const credentials = new SharedIniFileCredentials();
  const dynamodb = new DynamoDB({
    region,
    credentials
  });
  const tables = await dynamodb.listTables().promise();
  return tables!.TableNames!.indexOf(name) > 0;
}

export class DynamoTable extends cdk.Construct {
  public table: dynamo.Table;
  public id: string;
  public name: string;
  public branch: string;
  public partitionKey: DynamoKey;
  public sortKey: DynamoKey | undefined;

  constructor(scope: cdk.Construct, id: string, props: TableProps){
    super(scope, id);
    const {branch, name, partitionKey, sortKey} = props;

    this.id = id;
    this.name = name;
    this.branch = branch;
    this.partitionKey = partitionKey;
    this.sortKey = sortKey;
  }

  async init(){
    const tableExists = await checkIfDynamoDbExists(`defol-${this.name}-${this.branch}`, process.env.CDK_DEFAULT_REGION as string);
    if(tableExists){
      this.table = dynamo.Table.fromTableName(this, 'Table', `defol-${this.name}-${this.branch}`) as dynamo.Table;
    } else {
      this.table = new dynamo.Table(this, this.id, {
        tableName: `defol-${this.name}-${this.branch}`,
        partitionKey: this.partitionKey,
        sortKey: this.sortKey,
        billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      })

      new cdk.CfnOutput(this, `name-output`, {
        value: this.table.tableName,
        description: `ResourcesDynamoTableArn`,
      });
  
      new SSM.StringParameter(this, `name-parameter`, {
        parameterName: `/defol/${this.branch}/base/resources-table-${this.name}`,
        description: 'Resources\'s table name',
        stringValue: this.table.tableName
      });
    }
  }
}