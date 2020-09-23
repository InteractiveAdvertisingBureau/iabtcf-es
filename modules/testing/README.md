[![NPM version](https://img.shields.io/npm/v/@iabtcf/testing.svg?style=flat-square)](https://www.npmjs.com/package/@iabtcf/testing)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtcf/testing.svg?style=flat)](https://www.npmjs.org/package/@iabtcf/testing)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

# @iabtcf/testing

Testing tools to generate randomized input/output

#### Installation

npm
```
npm install @iabtcf/testing --save-dev
```

yarn
```
yarn add -D @iabtcf/testing
```

#### Utilities
[TCModelFactory](./src/TCModelFactory.ts)

Generate random TCModel with GVL
```typescript

import {TCModelFactory} from '@iabtcf/testing';

const tcModel = TCModelFactory.withGVL();

```

Generate random TC string

```typescript
import {TCString} from '@iabtcf/core';
import {TCModelFactory} from '@iabtcf/testing';

console.log(TCString.decode(TCModelFactory.noGVL()));
// ... random tc string

```

Add publisher restrictions

```typescript

import {TCModelFactory} from '@iabtcf/testing';
let tcModel = TCModelFactory.withGVL();
tcModel = TCModelFactory.addPublisherRestrictions(tcModel);
// now has random publisher restrictions

```

[GVLFactory](./src/GVLFactory.ts)

Get latest GVL

```typescript
import {GVLFactory} from '@iabtcf/testing';
import {GVL} from '@iabtcf/core';

const gvl = GVLFactory.getLatest();

```

Get version of GVL

```typescript
import {GVLFactory} from '@iabtcf/testing';
import {GVL} from '@iabtcf/core';

const gvl = GVLFactory.getVersion(10);

```
