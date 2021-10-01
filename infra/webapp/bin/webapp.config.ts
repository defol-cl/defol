import { WebappStackProps } from "../lib/webapp-stack.types";

export const getConfig = (branch: string): WebappStackProps => (
  {
    branch,
    domain: `open-data.cl`,
    subdomain: `defol-${branch}`
  }
);
