import {expect} from 'chai';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Guards against re-introducing circular dependencies (see issue #390). A cyclic
 * `require()` graph in the published CommonJS build triggers bundlers such as
 * Metro (react-native) to warn about "uninitialized values" and is a frequent
 * source of subtle load-order bugs.
 *
 * This walks the compiled `lib/cjs` output – where `tsc` hoists every static
 * import to a top-level `require()` – and fails if any module can reach itself.
 */
describe('Circular dependencies', (): void => {

  const cjsRoot = path.resolve(process.cwd(), 'lib/cjs');

  const walk = (dir: string, acc: string[] = []): string[] => {

    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {

      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {

        walk(full, acc);

      } else if (entry.name.endsWith('.js')) {

        acc.push(full);

      }

    }

    return acc;

  };

  const findCircular = (root: string): string[][] => {

    const files = walk(root);
    const fileSet = new Set<string>(files.map((f: string): string => fs.realpathSync(f)));
    const graph = new Map<string, Set<string>>();

    for (const file of files) {

      const deps = new Set<string>();

      for (const match of fs.readFileSync(file, 'utf8').matchAll(/require\((["'])(\.[^"']+)\1\)/g)) {

        let target = path.resolve(path.dirname(file), match[2]);

        if (!target.endsWith('.js')) {

          target += '.js';

        }

        try {

          const resolved = fs.realpathSync(target);

          if (fileSet.has(resolved)) {

            deps.add(resolved);

          }

        } catch {

          // require target outside this package (e.g. a dependency) – ignore
        }

      }

      graph.set(fs.realpathSync(file), deps);

    }

    const WHITE = 0;
    const GRAY = 1;
    const BLACK = 2;
    const color = new Map<string, number>();
    const stack: string[] = [];
    const cycles: string[][] = [];

    const visit = (node: string): void => {

      color.set(node, GRAY);
      stack.push(node);

      for (const dep of graph.get(node) || []) {

        const state = color.get(dep) || WHITE;

        if (state === GRAY) {

          const start = stack.indexOf(dep);
          cycles.push(stack.slice(start).concat(dep).map((p: string): string => path.relative(root, p)));

        } else if (state === WHITE) {

          visit(dep);

        }

      }

      stack.pop();
      color.set(node, BLACK);

    };

    for (const node of graph.keys()) {

      if ((color.get(node) || WHITE) === WHITE) {

        visit(node);

      }

    }

    return cycles;

  };

  it('has no circular dependencies in the compiled CommonJS output', (): void => {

    expect(fs.existsSync(cjsRoot), `${cjsRoot} not found – run the build before the tests`).to.be.true;

    const cycles = findCircular(cjsRoot);

    expect(cycles, `circular dependencies found:\n${cycles.map((c: string[]): string => c.join(' -> ')).join('\n')}`).to.deep.equal([]);

  });

});
