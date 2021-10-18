#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { getConfig } from "./admin-base.config";
import { AdminBaseStack } from '../lib/admin-base-stack';

const adminBase = new cdk.App();

const branch = adminBase.node.tryGetContext('branch') as string;

new AdminBaseStack(adminBase, `defol-${branch}-admin-base-stack`, {
  ...getConfig(branch),
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
