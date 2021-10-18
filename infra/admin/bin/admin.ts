#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AdminStack } from '../lib/admin-stack';
import { getConfig } from "./admin.config";

const admin = new cdk.App();

const branch = admin.node.tryGetContext('branch') as string;

new AdminStack(admin, `defol-${branch}-admin-stack`, {
  ...getConfig(branch),
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
