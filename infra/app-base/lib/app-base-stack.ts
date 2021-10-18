import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as SSM from "@aws-cdk/aws-ssm";
import { BaseStackProps } from './app-base-stack.types';

export class AppBaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { branch } = props;
    
    const userPool = new cognito.UserPool(this, `${id}-user-pool`, {
      userPoolName: 'users',
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
    
    new SSM.StringParameter(this, `${id}-cognito-user-pool-id-parameter`, {
      parameterName: `/defol/${branch}/app/user-pool-id`,
      description: 'User Pool id',
      stringValue: userPool.userPoolId
    });
    new SSM.StringParameter(this, `${id}-cognito-user-pool-client-id-parameter`, {
      parameterName: `/defol/${branch}/app/user-pool-client-id`,
      description: 'User Pool Client id',
      stringValue: userPoolClient.userPoolClientId
    });
    new SSM.StringParameter(this, `${id}-cognito-user-pool-region-parameter`, {
      parameterName: `/defol/${branch}/app/user-pool-region`,
      description: 'User Pool region',
      stringValue: userPool.env.region
    });
  }
}
