#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { getConfig } from "./app-base.config";
import { AppBaseStack } from '../lib/app-base-stack';

const app = new cdk.App();

const branch = app.node.tryGetContext('branch') as string;

new AppBaseStack(app, `defol-${branch}-app-base-stack`, {
  ...getConfig(branch),
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
