import { ToolCallback } from './ToolTypes';
import { ToolDefinition } from './ToolDefinition';

export class Tool {
  id: string;
  execute: ToolCallback;

  constructor(
    id: string,
    private definition: ToolDefinition,
    execute: ToolCallback,
  ) {
    this.id = id;
    this.execute = execute;
  }

  openAiFormat(): ChatCompletionTool {
    return {
      type: 'function',
      function: this.definition,
    };
  }
}

export interface ChatCompletionTool {
  type: 'function';
  function: FunctionDefinition;
}

export type FunctionDefinition = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};
