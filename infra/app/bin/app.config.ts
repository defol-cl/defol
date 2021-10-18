import { WebappStackProps } from "../lib/app-stack.types";

export const getConfig = (branch: string): WebappStackProps => (
  {
    branch,
    domain: `defol.cl`,
    subdomain: `app-${branch}`
  }
);
