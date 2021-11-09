import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from '@aws-cdk/aws-lambda';
import * as SSM from "@aws-cdk/aws-ssm";
import { BaseStackProps } from './admin-base-stack.types';

export class AdminBaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { branch } = props;

    const role = new iam.Role(this, 'role-lambda', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    })
    role.addToPolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents',
      ]
    }))

    const preTokenLambda = new lambda.Function(this, `${id}-pre-token-generation`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      role,
      code: lambda.Code.fromAsset("src/preToken"),
      handler: 'preToken.handler'
    })
    
    const userPool = new cognito.UserPool(this, `${id}-user-pool`, {
      userPoolName: `${id}-user-pool`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
    
    const userPoolClient = userPool.addClient(`${id}-user-pool-client`, {
      userPoolClientName: `${id}-user-pool-client`
    });

    userPool.addTrigger(cognito.UserPoolOperation.PRE_TOKEN_GENERATION, preTokenLambda);
    
    new SSM.StringParameter(this, `${id}-cognito-user-pool-id-parameter`, {
      parameterName: `/defol/${branch}/admin/user-pool-id`,
      description: 'User Pool id',
      stringValue: userPool.userPoolId
    });
    new SSM.StringParameter(this, `${id}-cognito-user-pool-client-id-parameter`, {
      parameterName: `/defol/${branch}/admin/user-pool-client-id`,
      description: 'User Pool Client id',
      stringValue: userPoolClient.userPoolClientId
    });
    new SSM.StringParameter(this, `${id}-cognito-user-pool-region-parameter`, {
      parameterName: `/defol/${branch}/admin/user-pool-region`,
      description: 'User Pool region',
      stringValue: userPool.env.region
    });
  }
}
