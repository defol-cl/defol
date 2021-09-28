import { EnvTypes } from '@defol-cl/infra-libs';
import { BaseStackProps } from "../lib/base-stack.types";

type BaseConfig = {
  [env in EnvTypes.Branch]: BaseStackProps
}

export { BaseConfig };
