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

console.log(TCString.encode(TCModelFactory.noGVL()));
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
