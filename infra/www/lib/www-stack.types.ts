import * as cdk from "@aws-cdk/core";

export interface WwwStackProps extends cdk.StackProps {
  branch: string
  domain: string
  subdomain: string
}
