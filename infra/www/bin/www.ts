#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WwwStack } from '../lib/www-stack';
import { getConfig } from "./www.config";

const www = new cdk.App();

const branch = www.node.tryGetContext('branch') as string;

new WwwStack(www, `defol-${branch}-www-stack`, {
  ...getConfig(branch),
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
