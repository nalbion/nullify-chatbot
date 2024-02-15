import path from 'path';
import simpleGit, { DefaultLogFields, SimpleGit } from 'simple-git';

export class Git {
  private git: SimpleGit;

  constructor(private baseDir: string = process.cwd() + '/workspace') {
    this.git = simpleGit(baseDir);
  }

  async clone(repoUrl: string, localPath: string): Promise<string> {
    const fullPath = path.join(this.baseDir, localPath);
    console.info('Cloning repository', repoUrl, 'to', localPath);

    await this.git.clone(repoUrl, fullPath);
    console.log(`Repository cloned from ${repoUrl} to ${localPath}`);
    return fullPath;
  }

  async blame(filePath: string): Promise<DefaultLogFields | null> {
    // console.info('blame', this.baseDir, filePath);
    const [_, dir, file] = /\/?([^/]+)\/(.*)/.exec(filePath)!;
    const git = simpleGit(path.join(this.baseDir, dir));
    const log = await git.log({ file });
    // const log = await this.git.log({ file: path.join(this.baseDir, file) });
    // const log = await this.git.log({ file: file.substring(1) });
    return log.latest;
  }
}
