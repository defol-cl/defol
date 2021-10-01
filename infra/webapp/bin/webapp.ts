#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebappStack } from '../lib/webapp-stack';
import { getConfig } from "./webapp.config";

const app = new cdk.App();

const branch = app.node.tryGetContext('branch') as string;

new WebappStack(app, `defol-${branch}-front-infra`, {
  ...getConfig(branch),
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
