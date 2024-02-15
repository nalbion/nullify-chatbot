import OpenAI from 'openai';
import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources';
import { ToolManager } from './tools/ToolManager';
import { ToolContext } from './tools/ToolTypes';

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export class AI {
  sendChatCompletionRequest = async (
    prompt: string,
    context: ToolContext,
    tools?: ChatCompletionTool[],
  ): Promise<string> => {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'You are a vulnerability scanner. You are scanning a repository for vulnerabilities.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const body: ChatCompletionCreateParamsNonStreaming = {
      messages,
      model: 'gpt-4',
      temperature: 0.2,
      tools,
    };

    console.info('Sending chat completion request to OpenAI:', body);

    const { choices } = await openAI.chat.completions.create(body);

    if (choices[0].finish_reason === 'tool_calls' && choices[0].message.tool_calls) {
      for (const toolCall of choices[0].message.tool_calls) {
        const result = await ToolManager.executeTool(toolCall.function.name, context, toolCall.function.arguments);
        console.info('tool result:', result);
        if (result) {
          return await this.sendChatCompletionRequest(result, context, tools);
        }
      }
    }

    return choices[0].message.content || '(no response)';
  };
}
