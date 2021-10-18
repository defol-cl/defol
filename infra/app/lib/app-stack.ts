import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { HttpVersion } from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';
import { Effect } from '@aws-cdk/aws-iam';
import * as route53 from '@aws-cdk/aws-route53';
import * as targets from '@aws-cdk/aws-route53-targets/lib';
import * as s3 from '@aws-cdk/aws-s3';
import * as SSM from "@aws-cdk/aws-ssm";
import { WebappStackProps } from "./app-stack.types";

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: WebappStackProps) {
    super(scope, id, props);
    const { branch, domain, subdomain } = props;
    
    const hostedZone = route53.HostedZone.fromLookup(this, `${id}-zone`, { domainName: domain });
    const siteDomain = subdomain && subdomain.length > 0 ? `${subdomain}.${domain}` : domain;
    new cdk.CfnOutput(this, 'FrontUrl', { value: 'https://' + siteDomain });
    
    const oai = new cloudfront.OriginAccessIdentity(this, `${id}-oai`, {
      comment: `access-identity-${id}`
    })
    
    const bucket = new s3.Bucket(this, id, {
      bucketName: `defol-${branch}-app-front`,
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
    
    const originConfigs: cloudfront.SourceConfiguration[] = [{
      s3OriginSource: {
        s3BucketSource: bucket,
        originAccessIdentity: oai
      },
      behaviors: [{
        isDefaultBehavior: true
      }],
    }];
    
    const apiGatewayDomainName = SSM.StringParameter.fromStringParameterAttributes(this, `${id}-api-gateway-domain-name-parameter`, {
      parameterName: `/defol/${branch}/app/backend/api-gateway-domain-name`
    });
    if (apiGatewayDomainName)
      originConfigs.push({
        customOriginSource: {
          domainName: apiGatewayDomainName.stringValue
        },
        behaviors: [{
          allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
          pathPattern: 'api/*'
        }]
      });
    
    const distribution = new cloudfront.CloudFrontWebDistribution(this, `${id}-distribution`, {
      httpVersion: HttpVersion.HTTP2,
      defaultRootObject: 'index.html',
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain],
        sslMethod: cloudfront.SSLMethod.SNI,
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      errorConfigurations: [
        {
          errorCode: 404,
          errorCachingMinTtl: 300,
          responsePagePath: '/index.html',
          responseCode: 200
        }, {
          errorCode: 403,
          errorCachingMinTtl: 300,
          responsePagePath: '/index.html',
          responseCode: 200
        }
      ],
      originConfigs
    });
    new cdk.CfnOutput(this, `FrontCFDistributionId`, { value: distribution.distributionId });
    
    new route53.ARecord(this, `${id}-alias-record`, {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone: hostedZone
    });
    
    new SSM.StringParameter(this, `${id}-cf-distribution-id`, {
      parameterName: `/defol/${branch}/app/cf-distribution-id`,
      description: 'Frontend\'s cloudFront distribution id',
      stringValue: distribution.distributionId
    });
    new SSM.StringParameter(this, `${id}-frontend-bucket-name`, {
      parameterName: `/defol/${branch}/app/frontend/bucket-name`,
      description: 'Frontend\'s bucket name',
      stringValue: bucket.bucketName
    });
  }
}
