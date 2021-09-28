import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { HttpVersion } from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';
import { Effect } from '@aws-cdk/aws-iam';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets/lib';
import * as s3 from '@aws-cdk/aws-s3';
import { EnvTypes } from "@defol-cl/infra-libs";

interface Props extends cdk.StackProps {
  branch: EnvTypes.Branch
  domain: string
  subdomain: string
}

export class WebappStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id);
  
    const hostedZone = route53.HostedZone.fromLookup(this, `${id}-zone`, { domainName: props.domain });
    const siteDomain = props.subdomain && props.subdomain.length > 0 ? `${props.subdomain}.${props.domain}` : props.domain;
    new cdk.CfnOutput(this, 'FrontUrl', { value: 'https://' + siteDomain });
  
    const oai = new cloudfront.OriginAccessIdentity(this, `${id}-oai`, {
      comment: `access-identity-${id}`
    })
  
    const bucket = new s3.Bucket(this, id, {
      bucketName: id,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  
    bucket.addToResourcePolicy(new iam.PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [oai.grantPrincipal]
    }));
  
    new cdk.CfnOutput(this, 'BucketArn', {
      value: bucket.bucketName,
      description: "FrontBucket",
    });
  
    const certificateArn = new acm.DnsValidatedCertificate(this, `${id}-certificate`, {
      domainName: siteDomain,
      hostedZone,
      region: props.env!.region,
    }).certificateArn;
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn });
  
    const distribution = new cloudfront.CloudFrontWebDistribution(this, `${id}-distribution`, {
      httpVersion: HttpVersion.HTTP2,
      defaultRootObject: 'index.html',
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [ siteDomain ],
        sslMethod: cloudfront.SSLMethod.SNI,
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      errorConfigurations: [{
        errorCode: 404,
        errorCachingMinTtl: 300,
        responsePagePath: '/index.html',
        responseCode: 200
      }],
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: oai
          },
          behaviors : [ {isDefaultBehavior: true}],
        }
      ]
    });
    new cdk.CfnOutput(this, `FrontCFDistributionId`, { value: distribution.distributionId });
  
    new route53.ARecord(this, `${id}-alias-record`, {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone: hostedZone
    });
  }
}
