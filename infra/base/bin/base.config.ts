import { BaseStackProps } from "../lib/base-stack.types";

export const getConfig = (branch: string): BaseStackProps => ({
  branch
});
