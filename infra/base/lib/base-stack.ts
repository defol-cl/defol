import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { BaseStackProps } from './base-stack.types';

export class BaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { bucketName } = props;
  
    const bucket = new s3.Bucket(this, id, {
      bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  
    new cdk.CfnOutput(this, 'ResourcesBucketArn', {
      value: bucket.bucketName,
      description: 'ResourcesBucketArn',
    });
  }
}
