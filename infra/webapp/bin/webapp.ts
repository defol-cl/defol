#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebappStack } from '../lib/webapp-stack';
import { EnvTypes } from "@defol/infra-libs";

const app = new cdk.App();

const account = app.node.tryGetContext('ACCOUNT') as string;
const region = app.node.tryGetContext('REGION') as string;
const branch = app.node.tryGetContext('BRANCH') as EnvTypes.Branch;
const domain = app.node.tryGetContext('DOMAIN') as string;
const subdomain = app.node.tryGetContext('SUBDOMAIN') as string;

console.log('props', {
  env: { account, region },
  branch, domain, subdomain,
});

new WebappStack(app, `defol-webapp-infra-${branch}`, {
  env: { account, region },
  branch, domain, subdomain,
});
