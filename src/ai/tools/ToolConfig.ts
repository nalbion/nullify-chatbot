import { Tool } from './Tool';

export type ToolConfig = {
  definition: FunctionDefinition;
  implementation: Tool;
};

export type FunctionDefinition = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};
