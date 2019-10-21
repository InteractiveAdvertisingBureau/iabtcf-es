[@iabtcf/core - Usage Documentation](README.md) > [TCString](tcstring.md)

## Table of Contents

- [Decode](#decode-an-iab-tc-string)
- [Encode](#encode-an-iab-tc-string)

# TCString

[TCString API Documentation](../api/classes/tcstring.md)

### Decode an IAB TC String

```typescript
import {TCString, TCModel} from '@iabtcf/core';

const myTCModel = TCString.decode(encodedTCString);

```
*returns:* `TCModel`

[TCModel API Dcoumentation](../api/classes/tcmodel.md)

[TCModel Usage Dcoumentation](tcmodel.md)

### Encode an IAB TC String

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
  const tcString = new TCString();

  /**
   * this will output a default all "no" encoded string to the console at the
   * lastest GVL version.
   */
  comsole.log(tcString.encode(tcModel));
});
```

`TCModel`

[TCModel API Dcoumentation](../api/classes/tcmodel.md)

[TCModel Usage Dcoumentation](tcmodel.md)

`GVL`

[GVL API Dcoumentation](../api/classes/gvl.md)

[GVL Usage Dcoumentation](gvl.md)
