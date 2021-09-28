import { BaseConfig } from "./base.config.types";

export const config: BaseConfig = {
  develop: {
    bucketName: 'defol-develop-resources'
  },
  stage: {
    bucketName: 'defol-stage-resources'
  },
  master: {
    bucketName: 'defol-master-resources'
  },
};
