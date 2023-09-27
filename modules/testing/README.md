[![NPM version](https://img.shields.io/npm/v/@cookiehub/iabtcf-testing.svg?style=flat-square)](https://www.npmjs.com/package/@cookiehub/iabtcf-testing)
[![npm module downloads per month](http://img.shields.io/npm/dm/@cookiehub/iabtcf-testing.svg?style=flat)](https://www.npmjs.org/package/@cookiehub/iabtcf-testing)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

# @cookiehub/iabtcf-testing

Testing tools to generate randomized input/output

#### Installation

npm
```
npm install @cookiehub/iabtcf-testing --save-dev
```

yarn
```
yarn add -D @cookiehub/iabtcf-testing
```

#### Utilities
[TCModelFactory](./src/TCModelFactory.ts)

Generate random TCModel with GVL
```typescript

import {TCModelFactory} from '@cookiehub/iabtcf-testing';

const tcModel = TCModelFactory.withGVL();

```

Generate random TC string

```typescript
import {TCString} from '@cookiehub/iabtcf-core';
import {TCModelFactory} from '@cookiehub/iabtcf-testing';

console.log(TCString.encode(TCModelFactory.noGVL()));
// ... random tc string

```

Add publisher restrictions

```typescript

import {TCModelFactory} from '@cookiehub/iabtcf-testing';
let tcModel = TCModelFactory.withGVL();
tcModel = TCModelFactory.addPublisherRestrictions(tcModel);
// now has random publisher restrictions

```

[GVLFactory](./src/GVLFactory.ts)

Get latest GVL

```typescript
import {GVLFactory} from '@cookiehub/iabtcf-testing';
import {GVL} from '@cookiehub/iabtcf-core';

const gvl = GVLFactory.getLatest();

```

Get version of GVL

```typescript
import {GVLFactory} from '@cookiehub/iabtcf-testing';
import {GVL} from '@cookiehub/iabtcf-core';

const gvl = GVLFactory.getVersion(10);

```
