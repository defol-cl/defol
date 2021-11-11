import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as SSM from "@aws-cdk/aws-ssm";
import { BaseStackProps } from './base-stack.types';
import { DynamoTable } from './dynamo-table';
import { DynamoIndex } from './dynamo-index';

export class BaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { branch } = props;
    
    const bucket = new s3.Bucket(this, `${id}-resource-bucket`, {
      bucketName: `defol-${branch}-base-resources`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const convenio = new DynamoTable(this, `${id}-resource-dynamodb-convenio`, {
      branch,
      name: "convenio",
      partitionKey: {
        name: "cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "nombre",
        type: dynamo.AttributeType.STRING
      }
    })

    const convenioModerador = new DynamoTable(this, `${id}-resource-dynamodb-convenio-moderador`, {
      branch,
      name: "convenio-moderador",
      partitionKey: {
        name: "convenioCod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "email",
        type: dynamo.AttributeType.STRING
      }
    })

    const convenioContacto = new DynamoTable(this, `${id}-resource-dynamodb-convenio-contacto`, {
      branch,
      name: "convenio-contacto",
      partitionKey: {
        name: "convenioCod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "email",
        type: dynamo.AttributeType.STRING
      }
    })

    const pregunta = new DynamoTable(this, `${id}-resource-dynamodb-pregunta`, {
      branch,
      name: "pregunta",
      partitionKey: {
        name: "contactoEmail",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "timestamp",
        type: dynamo.AttributeType.STRING
      }
    })

    const categoria = new DynamoTable(this, `${id}-resource-dynamodb-categoria`, {
      branch,
      name: "categoria",
      partitionKey: {
        name: "cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "nombre",
        type: dynamo.AttributeType.STRING
      }
    })

    new DynamoIndex(this, `${id}-resources-table-index-emailIndex`, {
      branch,
      name: 'emailIndex',
      partitionKey: {
        name: "email",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: convenioModerador.table,
    })

    new DynamoIndex(this, `${id}-resources-table-index-estadoIndex`, {
      branch,
      name: 'estadoIndex',
      sortKey: {
        name: "estado",
        type: dynamo.AttributeType.STRING
      },
      type: "LOCAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${id}-resources-table-index-fechaActualizacionIndex`, {
      branch,
      name: 'fechaActualizacionIndex',
      sortKey: {
        name: "fechaActualizacion",
        type: dynamo.AttributeType.STRING
      },
      type: "LOCAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${id}-resources-table-index-userConvenioCodIndex`, {
      branch,
      name: 'userConvenioCodIndex',
      sortKey: {
        name: "convenioCod",
        type: dynamo.AttributeType.STRING
      },
      type: "LOCAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${id}-resources-table-index-convenioCodIndex`, {
      branch,
      name: 'convenioCodIndex',
      partitionKey: {
        name: "convenioCod",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${id}-resources-table-index-contactoEmailIndex`, {
      branch,
      name: 'contactoEmailIndex',
      partitionKey: {
        name: "contactoEmail",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: convenioContacto.table,
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
