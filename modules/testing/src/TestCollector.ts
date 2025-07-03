import * as fs from 'fs';
import * as path from 'path';
import lint from 'mocha-eslint';

export class TestCollector {

  public static async requireTests(filePath: string): Promise<void> {

    if (fs.statSync(filePath).isDirectory()) {

      describe(filePath.split('/').pop() + '/', (): void => {

        fs.readdirSync(filePath).forEach((item: string): void => {

          this.requireTests(path.join(filePath, item));

        });

      });

    } else if (filePath.indexOf('.test.ts') === filePath.length - '.test.ts'.length) {

      await import(filePath);

    }

  }

  public static eslintTests(directories: string[] = ['.'], fileExtensions: string[] = ['ts', 'js', 'json']): void {

    lint([`{${directories}}/**/*.{${fileExtensions}}`], {
      alwaysWarn: false,
    });

  }

}
