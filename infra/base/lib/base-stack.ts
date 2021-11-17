import { DynamoDB, SharedIniFileCredentials } from 'aws-sdk';
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as SSM from "@aws-cdk/aws-ssm";
import { BaseStackProps } from './base-stack.types';
import { DynamoTable } from './dynamo-table';
import { DynamoIndex } from './dynamo-index';
export class BaseStack extends cdk.Stack {
  private id: string;
  private branch: string;
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { branch } = props;

    this.id = id;
    this.branch = branch;
    
    const bucket = new s3.Bucket(this, `${id}-resource-bucket`, {
      bucketName: `defol-${branch}-base-resources`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    
    const bucketDynamoToken = new s3.Bucket(this, `${id}-resource-bucket-dynamo-tokens`, {
      bucketName: `defol-${branch}-dynamo-tokens`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      lifecycleRules: [{
        expiration: cdk.Duration.days(1)
      }]
    });


    new cdk.CfnOutput(this, `${id}-resources-bucket-name-output`, {
      value: bucket.bucketName,
      description: 'ResourcesBucketArn',
    });
    new SSM.StringParameter(this, `${id}-resources-bucket-name-parameter`, {
      parameterName: `/defol/${branch}/base/resources-bucket-name`,
      description: 'Resources\'s bucket name',
      stringValue: bucket.bucketName
    });

    new cdk.CfnOutput(this, `${id}-dynamo-tokens-bucket-name-output`, {
      value: bucketDynamoToken.bucketName,
      description: 'DynamoTokensBucketArn',
    });

    new SSM.StringParameter(this, `${id}-dynamo-tokens-bucket-name-parameter`, {
      parameterName: `/defol/${branch}/base/dynamo-tokens-bucket-name`,
      description: 'Dynamo tokens bucket name',
      stringValue: bucketDynamoToken.bucketName
    });
  }

  async init(){
    const convenio = new DynamoTable(this, `${this.id}-resource-dynamodb-convenio`, {
      branch: this.branch,
      name: "convenio",
      partitionKey: {
        name: "cod",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "nombre",
        type: dynamo.AttributeType.STRING
      }
    });
    await convenio.init();

    const convenioModerador = new DynamoTable(this, `${this.id}-resource-dynamodb-convenio-moderador`, {
      branch: this.branch,
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

    await convenioModerador.init();

    const convenioContacto = new DynamoTable(this, `${this.id}-resource-dynamodb-convenio-contacto`, {
      branch: this.branch,
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

    await convenioContacto.init();

    const pregunta = new DynamoTable(this, `${this.id}-resource-dynamodb-pregunta`, {
      branch: this.branch,
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

    await  pregunta.init();

    const categoria = new DynamoTable(this, `${this.id}-resource-dynamodb-categoria`, {
      branch: this.branch,
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

    await categoria.init();

    new DynamoIndex(this, `${this.id}-resources-table-index-emailIndex`, {
      branch: this.branch,
      name: 'emailIndex',
      partitionKey: {
        name: "email",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: convenioModerador.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-preguntaEstadoIndex`, {
      branch: this.branch,
      name: 'preguntaEstadoIndex',
      sortKey: {
        name: "estado",
        type: dynamo.AttributeType.STRING
      },
      type: "LOCAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-fechaActualizacionIndex`, {
      branch: this.branch,
      name: 'fechaActualizacionIndex',
      sortKey: {
        name: "fechaActualizacion",
        type: dynamo.AttributeType.STRING
      },
      type: "LOCAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-userConvenioCodIndex`, {
      branch: this.branch,
      name: 'userConvenioCodIndex',
      sortKey: {
        name: "convenioCod",
        type: dynamo.AttributeType.STRING
      },
      type: "LOCAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-convenioCodIndex`, {
      branch: this.branch,
      name: 'convenioCodIndex',
      partitionKey: {
        name: "convenioCod",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-estadoIndex`, {
      branch: this.branch,
      name: 'estadoIndex',
      partitionKey: {
        name: "estado",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-ejecutivoEmailEstadoIndex`, {
      branch: this.branch,
      name: 'ejecutivoEmailEstadoIndex',
      partitionKey: {
        name: "ejecutivoEmail",
        type: dynamo.AttributeType.STRING
      },
      sortKey: {
        name: "estado",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: pregunta.table,
    })

    new DynamoIndex(this, `${this.id}-resources-table-index-contactoEmailIndex`, {
      branch: this.branch,
      name: 'contactoEmailIndex',
      partitionKey: {
        name: "email",
        type: dynamo.AttributeType.STRING
      },
      type: "GLOBAL",
      table: convenioContacto.table,
    })
  }
}
