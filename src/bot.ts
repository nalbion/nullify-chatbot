import { Git } from './git/Git';
import { AI } from './ai';
import { TOOL_CLONE_REPO } from './ai/tools/impl';
import { ToolManager } from './ai/tools/ToolManager';
import { ToolContext } from './ai/tools/ToolTypes';
import VulnerabilityScanner from './vulnerability/VulnerabilityScanner';

export class Bot {
  private ai = new AI();
  private tools = [TOOL_CLONE_REPO].map((tool) => ToolManager.getTool(tool).openAiFormat());
  private context: ToolContext;

  constructor() {
    const workspace = process.cwd() + '/workspace';
    this.context = new ToolContext(workspace, new Git(workspace));
  }

  public async onUserInput(message: string): Promise<string> {
    const scanner = new VulnerabilityScanner();

    // return scanner.scanRepo(this.context, message.split('/')[1]);
    return scanner.scanAndReportOnRepo(this.context, message.split('/')[1]);
    // return scanner.scanRepo(this.context, 'go-any-cloud-poc');
    // return scanner.scanRepo(this.context, 'ingress-gce');

    // return this.ai.sendChatCompletionRequest(message, this.context, this.tools);
  }
}
