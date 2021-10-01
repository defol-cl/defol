#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { getConfig } from "./base.config";
import { BaseStack } from '../lib/base-stack';

const app = new cdk.App();

const branch = app.node.tryGetContext('branch') as string;

new BaseStack(app, `defol-${branch}-base-stack`, getConfig(branch));
