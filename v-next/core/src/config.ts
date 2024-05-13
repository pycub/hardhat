import { buildGlobalParameterDefinition } from "./internal/global-parameters.js";
import {
  NewTaskDefinitionBuilderImplementation,
  TaskOverrideDefinitionBuilderImplementation,
} from "./internal/tasks/builders.js";
import { ParameterType } from "./types/common.js";
import { ConfigurationVariable } from "./types/config.js";
import { GlobalParameter } from "./types/global-parameters.js";
import {
  EmptyTaskDefinition,
  NewTaskDefinitionBuilder,
  TaskDefinitionType,
  TaskOverrideDefinitionBuilder,
} from "./types/tasks.js";

export type { HardhatUserConfig } from "./types/config.js";

export { ParameterType } from "./types/common.js";

/**
 * Creates a configuration variable, which will be fetched at runtime.
 */
export function configVariable(name: string): ConfigurationVariable {
  return { _type: "ConfigurationVariable", name };
}

/**
 * Creates a builder to define a new task.
 */
export function task(
  id: string | string[],
  description: string = "",
): NewTaskDefinitionBuilder {
  return new NewTaskDefinitionBuilderImplementation(id, description);
}

/**
 * Defines a new empty task.
 */
export function emptyTask(
  id: string | string[],
  description: string,
): EmptyTaskDefinition {
  return {
    type: TaskDefinitionType.EMPTY_TASK,
    id: Array.isArray(id) ? id : [id],
    description,
  };
}

/**
 * Creates a builder to override a task.
 */
export function overrideTask(
  id: string | string[],
): TaskOverrideDefinitionBuilder {
  return new TaskOverrideDefinitionBuilderImplementation(id);
}

/**
 * Defines a global parameter.
 */
export function globalParameter(options: {
  name: string;
  description: string;
  parameterType: ParameterType;
  defaultValue: any;
}): GlobalParameter {
  return buildGlobalParameterDefinition(options);
}

/**
 * Defines a global flag.
 */
export function globalFlag(options: {
  name: string;
  description: string;
}): GlobalParameter {
  return buildGlobalParameterDefinition({
    ...options,
    parameterType: ParameterType.BOOLEAN,
    defaultValue: false,
  });
}
