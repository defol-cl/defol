import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as SSM from "@aws-cdk/aws-ssm";
import { BaseStackProps } from './base-stack.types';

export class BaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { branch } = props;
  
    const bucket = new s3.Bucket(this, id, {
      bucketName: `defol-${branch}-resources`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  
    new cdk.CfnOutput(this, 'ResourcesBucketArn', {
      value: bucket.bucketName,
      description: 'ResourcesBucketArn',
    });
    new SSM.StringParameter(this, `${id}-frontend-bucket-name`, {
      parameterName: `/defol/${branch}/base/resources-bucket-name`,
      description: 'Resources\'s bucket name',
      stringValue: bucket.bucketName
    });
  }
}
