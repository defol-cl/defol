import { BaseStackProps } from "../lib/app-base-stack.types";

export const getConfig = (branch: string): BaseStackProps => ({
  branch
});
