import { BaseStackProps } from "../lib/base-stack.types";

export const getConfig = (branch: string): BaseStackProps => ({
  bucketName: `defol-${branch}-resources`
});
