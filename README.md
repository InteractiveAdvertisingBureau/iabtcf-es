[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

# @iabtechlabtcf

Official JavaScript / TypeScript compliant tool suite for implementing the Transparency and Consent Framework (TCF) v2.3.  The essential toolkit for CMPs.

This is a mono repo containing 5 modules:

[Core](./modules/core#iabtechlabtcfcore) - For encoding/decoding TC strings and tools for handling the Global Vendor List (GVL).

[CmpApi](./modules/cmpapi#iabtechlabtcfcmpapi) - CMP in-page API (`__tcfapi()`) tool that works with the core library.

[cli](./modules/cli#iabtechlabtcfcli) - Tool to decode a TC string on the command line interface (cli).

[Testing](./modules/testing#iabtechlabtcftesting) - Tools for testing the core library including random TCModel and GVL generators.

[Stub](./modules/stub#iabtechlabtcfstub) - Code for the on-page `__tcfapi()` CMP stub.

## npm package scope and migration

The packages in this repository use the **`@iabtechlabtcf`** npm scope. Older releases used **`@iabtcf`**. The rename was made in this repository in [commit 5706cc3](https://github.com/InteractiveAdvertisingBureau/iabtcf-es/commit/5706cc3a260dbb0fcf0b86998196ae9bd29d292d); the two names are separate npm packages, not aliases.

| Earlier package name | Current package name |
| --- | --- |
| `@iabtcf/core` | [`@iabtechlabtcf/core`](https://www.npmjs.com/package/@iabtechlabtcf/core) |
| `@iabtcf/cmpapi` | [`@iabtechlabtcf/cmpapi`](https://www.npmjs.com/package/@iabtechlabtcf/cmpapi) |
| `@iabtcf/stub` | [`@iabtechlabtcf/stub`](https://www.npmjs.com/package/@iabtechlabtcf/stub) |
| `@iabtcf/testing` | [`@iabtechlabtcf/testing`](https://www.npmjs.com/package/@iabtechlabtcf/testing) |
| `@iabtcf/cli` | [`@iabtechlabtcf/cli`](https://www.npmjs.com/package/@iabtechlabtcf/cli) |

For example, an application using the core and CMP API packages can replace its direct dependencies with:

```sh
npm uninstall @iabtcf/core @iabtcf/cmpapi
npm install @iabtechlabtcf/core @iabtechlabtcf/cmpapi
```

Update imports and `require()` calls as well:

```typescript
import {TCString} from '@iabtechlabtcf/core';
import {CmpApi} from '@iabtechlabtcf/cmpapi';
```

Apply the same scope change to any other modules you use. Update your lockfile with your package manager, review dependency and peer-dependency versions, and run your integration tests. Updating a version constraint on an `@iabtcf` dependency alone does not change its package scope. A scope change can also involve a version upgrade; review the module documentation for the version you choose.

## Contributing

Here you can find the [contributing guide](CONTRIBUTING.md) to help maintain and update the library.
