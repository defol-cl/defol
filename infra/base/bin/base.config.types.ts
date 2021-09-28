import { EnvTypes } from '@defol/infra-libs';
import { BaseStackProps } from "../lib/base-stack.types";

type BaseConfig = {
  [env in EnvTypes.Branch]: BaseStackProps
}

export { BaseConfig };
