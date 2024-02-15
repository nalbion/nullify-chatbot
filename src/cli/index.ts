import * as readline from 'readline';
import { Bot } from '../bot';

export class CLI {
  private rl: readline.Interface;
  private bot = new Bot();

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public start(): void {
    // let defaultInput = 'kubernetes/ingress-gce';
    let defaultInput = 'go-training/helloworld';
    console.info(`Hi, I'm the Nullify bot. Which repo would you like to scan? [${defaultInput}]`);
    let promptPrefix = 'The user would like to scan the repo: ';

    this.rl.on('line', async (input) => {
      if (input === '') {
        input = defaultInput;
      }
      if (input === 'EXIT') {
        this.rl.close();
        process.exit(0);
      }

      const response = await this.bot.onUserInput(promptPrefix + input);
      promptPrefix = '';
      defaultInput = 'EXIT';

      console.info('🤖:', response);
      console.info('> ');
    });
  }
}
