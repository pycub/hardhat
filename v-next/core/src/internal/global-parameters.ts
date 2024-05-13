import { ParameterType } from "../types/common.js";
import {
  GlobalArguments,
  GlobalParameter,
} from "../types/global-parameters.js";
import { HardhatPlugin } from "../types/plugins.js";

export interface GlobalParameterMapEntry {
  pluginId: string;
  param: GlobalParameter;
}

export type GlobalParameterMap = Map<string, GlobalParameterMapEntry>;

/**
 * Builds a map of the global parameters, validating them.
 *
 * Note: this function can be used before initializing the HRE, so the plugins
 *   shouldn't be consider validated. Hence, we should validate the global
 *   parameters.
 */
export function buildGlobalParameterMap(
  resolvedPlugins: HardhatPlugin[],
): GlobalParameterMap {
  const globalParametersIndex: GlobalParameterMap = new Map();

  for (const plugin of resolvedPlugins) {
    if (plugin.globalParameters === undefined) {
      continue;
    }

    for (const [name, param] of Object.entries(plugin.globalParameters)) {
      // TODO: Validate name casing
      // TODO: Validate default value matches with type
      // TODO: Validate that the name is not one of the reserved ones in parameters.ts

      const existingByName = globalParametersIndex.get(name);

      if (existingByName !== undefined) {
        throw new Error(
          `Plugin ${plugin.id} is trying to define the global parameter ${name} but it is already defined by plugin ${existingByName.pluginId}`,
        );
      }

      const indexEntry = {
        pluginId: plugin.id,
        param,
      };

      globalParametersIndex.set(param.name, indexEntry);
    }
  }

  return globalParametersIndex;
}

export function buildGlobalParameterDefinition(options: {
  name: string;
  description: string;
  parameterType: ParameterType;
  defaultValue: any;
}): GlobalParameter {
  // TODO: Validate name casing
  // TODO: Validate default value matches with type
  // TODO: Validate that the name is not one of the reserved ones in parameters.ts

  return {
    name: options.name,
    description: options.description,
    parameterType: options.parameterType,
    defaultValue: options.defaultValue,
  };
}

export function resolveGlobalArguments(
  userProvidedGlobalArguments: Partial<GlobalArguments>,
  _globalParametersMap: GlobalParameterMap,
): GlobalArguments {
  // TODO: Validate the userProvidedGlobalArguments and get the remaining ones
  // from env variables

  return userProvidedGlobalArguments as GlobalArguments;
}
