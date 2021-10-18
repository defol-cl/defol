import { BaseStackProps } from "../lib/admin-base-stack.types";

export const getConfig = (branch: string): BaseStackProps => ({
  branch
});
