import { ParameterType } from "./common.js";

/**
 * A global parameter with an associated value and a default if not provided by
 * the user. They are available in the Hardhat Runtime Environment.
 *
 * They can be provided in these different ways:
 *  1. Through environment variables, with the format
 *     `HARDHAT_<PARAM_NAME_WITH_THIS_CASING>`.
 *  2. Through the CLI with the format `--<param-name-with-this-casing> <value>`.
 *    2.1. Through the CLI with the format `--<param-name-with-this-casing>` if
 *      the parameter is boolean and its default value is `false`.
 *
 * If both are present, the second one takes precedence.
 */
export interface GlobalParameter {
  name: string;
  description: string;
  parameterType: ParameterType;
  defaultValue: any;
}

/**
 * The values of each global parameter for a certain instance of the Hardhat
 * Runtime Environment.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- To be used through module augmentation
export interface GlobalArguments {}
