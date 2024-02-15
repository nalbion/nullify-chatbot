import { Git } from '../../services/git/Git';
import { type Tool } from './Tool';
import { ToolDefinition } from './ToolDefinition';

export class ToolContext {
  constructor(
    public workspaceFolder: string,
    public git: Git,
  ) {}

  askForUserPermission(message: string): Promise<boolean> {
    // TODO
    return Promise.resolve(true);
  }
}

export type ToolConfig = {
  // As per Open AI function calling / Tool definition
  definition: ToolDefinition;
  implementation: Tool;
};

export type ToolCallback = (context: ToolContext, ...parameters: any) => void | string | Promise<string | undefined>;
