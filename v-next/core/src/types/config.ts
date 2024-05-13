/**
 * A configuration variable to be fetched at runtime from
 * different sources, depending on the user's setup.
 */
export interface ConfigurationVariable {
  _type: "ConfigurationVariable";
  name: string;
}

/**
 * A resolved configuration variable.
 */
export interface ResolvedConfigurationVariable {
  _type: "ResolvedConfigurationVariable";

  /**
   * Returns the raw value of the configuration variable.
   */
  get(): Promise<string>;

  /**
   * Returns the value of the configuration variable, after
   * validating that it's a URL.
   *
   * @throws an error if the value is not a URL.
   */
  getUrl(): Promise<string>;

  /**
   * Returns the value of the configuration variable interpreted
   * as a BigInt.
   *
   * @throws an error if the value is not a valid BigInt.
   */
  getBigInt(): Promise<bigint>;
}

/**
 * A sensitive string, which can be provided as a literal
 * string or as a configuration variable.
 */
export type SensitiveString = string | ConfigurationVariable;

/**
 * The user's Hardhat configuration, as exported in their
 * config file.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Used through module aumentation
export interface HardhatUserConfig {}

/**
 * The resolved Hardhat configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Used through module aumentation
export interface HardhatConfig {}
