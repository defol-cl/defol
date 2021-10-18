#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppStack } from '../lib/app-stack';
import { getConfig } from "./app.config";

const app = new cdk.App();

const branch = app.node.tryGetContext('branch') as string;

new AppStack(app, `defol-${branch}-app-stack`, {
  ...getConfig(branch),
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
