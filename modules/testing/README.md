[![NPM version](https://img.shields.io/npm/v/@iabtechlabtcf/testing.svg?style=flat-square)](https://www.npmjs.com/package/@iabtechlabtcf/testing)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtechlabtcf/testing.svg?style=flat)](https://www.npmjs.org/package/@iabtechlabtcf/testing)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtechlabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtechlabtcf-es)

# @iabtechlabtcf/testing

Testing tools to generate randomized input/output

#### Installation

npm
```
npm install @iabtechlabtcf/testing --save-dev
```

yarn
```
yarn add -D @iabtechlabtcf/testing
```

#### Utilities
[TCModelFactory](./src/TCModelFactory.ts)

Generate random TCModel with GVL
```typescript

import {TCModelFactory} from '@iabtechlabtcf/testing';

const tcModel = TCModelFactory.withGVL();

```

Generate random TC string

```typescript
import {TCString} from '@iabtechlabtcf/core';
import {TCModelFactory} from '@iabtechlabtcf/testing';

console.log(TCString.encode(TCModelFactory.noGVL()));
// ... random tc string

```

Add publisher restrictions

```typescript

import {TCModelFactory} from '@iabtechlabtcf/testing';
let tcModel = TCModelFactory.withGVL();
tcModel = TCModelFactory.addPublisherRestrictions(tcModel);
// now has random publisher restrictions

```

[GVLFactory](./src/GVLFactory.ts)

Get latest GVL

```typescript
import {GVLFactory} from '@iabtechlabtcf/testing';
import {GVL} from '@iabtechlabtcf/core';

const gvl = GVLFactory.getLatest();

```

Get version of GVL

```typescript
import {GVLFactory} from '@iabtechlabtcf/testing';
import {GVL} from '@iabtechlabtcf/core';

const gvl = GVLFactory.getVersion(10);

```
