# `@iabtcf/core`
---
Ensures consistent encoding and decoding of TC Signals for the iab. Transparency and Consent Framework (TCF).

 * [Installation](#installation)
 * [Usage](#usage)
 * [API Documentation](docs/api/README.md)

## Installation

npm
```
npm install @iabtcf/core
```

yarn
```
yarn add @iabtcf/core
```
## Usage
### Decode TCString

```typescript
import {TCString, TCModel} from '@iabtcf/core';

const myTCModel = TCString.decode(encodedTCString);

```
*returns:* [TCModel](docs/api/classes/tcmodel.md)

### Build a TCString

```typescript
import {TCString, TCModel, GVL} from '@iabtcf/core';

/**
 * With v2.0 of the TCF, CMPs are required to host their own vendor-list.json for
 * their client-side scripts to consume.  This GVL class follows the convention
 * outlined in the GVL URL Version scheme.  (latest at vendor-list.json and
 * version specific at archives/vendor-list-v{vendor-list-version}.json
 */
GVL.baseURL = "http://mydomain.com/cmp/vendorlist";

// we'll get the latest GVL to encode this TCString to
const gvl = new GVL("LATEST");

// have to wait for it to fetch the json
gvl.readPromise.then(() => {

  const tcModel = new TCModel(gvl);

  /**
   * this will output a default all "no" encoded string to the console at the
   * lastest GVL version.
   */
  comsole.log(TCString.encode(tcModel));
});
```
*see:* [TCModel](docs/api/classes/tcmodel.md), [GVL](docs/api/classes/gvl.md), and [TCString](docs/api/classes/tcstring.md)

### Using the TCModel as a stateful UI Model
