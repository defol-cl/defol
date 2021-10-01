import * as cdk from "@aws-cdk/core";

export interface WebappStackProps extends cdk.StackProps {
  branch: string
  domain: string
  subdomain: string
}
