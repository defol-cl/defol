import { WebappStackProps } from "../lib/admin-stack.types";

export const getConfig = (branch: string): WebappStackProps => (
  {
    branch,
    domain: `defol.cl`,
    subdomain: `admin-${branch}`
  }
);
