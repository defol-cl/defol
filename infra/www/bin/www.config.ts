import { WwwStackProps } from "../lib/www-stack.types";

export const getConfig = (branch: string): WwwStackProps => (
  {
    branch,
    domain: 'defol.cl',
    subdomain: branch === 'master' ? 'www' : `www-${branch}`
  }
);
