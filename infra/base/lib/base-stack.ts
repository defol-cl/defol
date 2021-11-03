import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as SSM from "@aws-cdk/aws-ssm";
import { BaseStackProps } from './base-stack.types';

export class BaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { branch } = props;
    
    const bucket = new s3.Bucket(this, `${id}-resource-bucket`, {
      bucketName: `defol-${branch}-base-resources`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const convenioTable = new dynamo.Table(this, `${id}-resource-dynamodb-convenio`, {
      tableName: `defol-convenio-${branch}`,
      partitionKey: {
        name: "cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "nombre",
        type: dynamo.AttributeType.STRING
      },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    const convenioModeradorTable = new dynamo.Table(this, `${id}-resource-dynamodb-convenio-moderador`, {
      tableName: `defol-convenio-moderador-${branch}`,
      partitionKey: {
        name: "convenio_cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "username",
        type: dynamo.AttributeType.STRING
      },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    const convenioContactoTable = new dynamo.Table(this, `${id}-resource-dynamodb-convenio-contacto`, {
      tableName: `defol-convenio-contacto-${branch}`,
      partitionKey: {
        name: "convenio_cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "username",
        type: dynamo.AttributeType.STRING
      },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    const preguntaTable = new dynamo.Table(this, `${id}-resource-dynamodb-pregunta`, {
      tableName: `defol-pregunta-${branch}`,
      partitionKey: {
        name: "username",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "timestamp",
        type: dynamo.AttributeType.NUMBER
      },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    const categoriaTable = new dynamo.Table(this, `${id}-resource-dynamodb-categoria`, {
      tableName: `defol-categoria-${branch}`,
      partitionKey: {
        name: "cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "nombre",
        type: dynamo.AttributeType.NUMBER
      },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    convenioModeradorTable.addGlobalSecondaryIndex({
      indexName: 'usernameIndex',
      partitionKey: {
        name: "username",
        type: dynamo.AttributeType.STRING
      },
      projectionType: dynamo.ProjectionType.ALL
    })

    preguntaTable.addLocalSecondaryIndex({
      indexName: 'estadoIndex',
      sortKey: {
        name: "estado",
        type: dynamo.AttributeType.STRING
      },
      projectionType: dynamo.ProjectionType.ALL
    })

    preguntaTable.addLocalSecondaryIndex({
      indexName: 'fechaActualizacionIndex',
      sortKey: {
        name: "fecha_actualizacion",
        type: dynamo.AttributeType.STRING
      },
      projectionType: dynamo.ProjectionType.ALL
    })

    preguntaTable.addGlobalSecondaryIndex({
      indexName: 'convenioCodIndex',
      partitionKey: {
        name: "convenio_cod",
        type: dynamo.AttributeType.STRING
      },
      projectionType: dynamo.ProjectionType.ALL
    })

    new cdk.CfnOutput(this, `${id}-resources-bucket-name-output`, {
      value: bucket.bucketName,
      description: 'ResourcesBucketArn',
    });
    new SSM.StringParameter(this, `${id}-resources-bucket-name-parameter`, {
      parameterName: `/defol/${branch}/base/resources-bucket-name`,
      description: 'Resources\'s bucket name',
      stringValue: bucket.bucketName
    });
  }
}
