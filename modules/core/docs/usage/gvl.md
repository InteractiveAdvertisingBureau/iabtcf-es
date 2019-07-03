[@iabtcf/core - Usage Documentation](README.md) > [GVL](gvl.md)

# GVL

* [GVL API Documentation]('../api/classes/gvl.md')
* [Autoload latest vendor-list.json]('#autoload-latest-vendor-list.json')
* [Autoload specific vendor-list.json]('#autoload-specific-vendor-list.json')
* [Pass vendor-list.json object](#pass-vendor-list.json-object)
* [Change GVL Language](#change-gvl-language)
* [Get only vendors with a specific feature or purpose under legal basis](#get-only-vendors-with-a-specific-feature-or-purpose-under-legal-basis)
* [Narrow the list of vendors](#narrow-the-list-of-vendors)

The `GVL` class provides two ways to instantiate. Either by passing in a vendor-list.json object to populate it or autoloading a vendor-list.json from a url.

### Autoload latest vendor-list.json
Autoloading a vendor-list.json will accept into the constructor a vendor list version number or if nothing or "LATEST" is passed it will load the latest version of the vendor list.  NOTE.  You must set the `GVL.baseUrl` parameter before instantiating a GVL instance. If desired the `GVL.latestFilename` may be set if `vendor-list.json` is not used.

** Loading default filename **
```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

// loads 'http://cmp.mysupercoolcmp.com/cmp/vendor-list.json'
const gvl = new GVL();

gvl.readyPomise.then(() => {

  // GVL has loaded and it's ready to use

});
```

** Loading with custom filename **
```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

GVL.latestFilename = 'latest/vendorlist.js';

// loads 'http://cmp.mysupercoolcmp.com/cmp/latest/vendorlist.json'
const gvl = new GVL();

gvl.readyPomise.then(() => {

  // GVL has loaded and it's ready to use

});
```

### Autoload specific version vendor-list.json
Autoloading a specific version requires that you both set the `GVL.baseUrl` static variable and pass into the constructor the version number you wish to load.  Optionally if your filename has a version other than `vendor-list-v[VERSION].json` you may set a different filename with version as `GVL.versionedFilename = 'vendorlist[VERSION].json';` and the token `[version]` will be replaced with the version number you pass into the constructor.


** Loading default filename for version **
```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

// loads 'http://cmp.mysupercoolcmp.com/cmp/archives/vendor-list-v23.json'
const gvl = new GVL(23);

gvl.readyPomise.then(() => {

  // GVL has loaded and it's ready to use

});
```

** changing version name scheme **
```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

GVL.versionedFilename = 'vendorlist[VERSION].json';

// loads 'http://cmp.mysupercoolcmp.com/cmp/vendorlist23.json'
const gvl = new GVL(23);

gvl.readyPomise.then(() => {

  // GVL has loaded and it's ready to use

});
```

### Pass vendor-list.json object
You may also just pass in the json object (not strigified)

```javascript
import {GVL} from '@iabtcf/core';

const gvl = new GVL(gvljson);

// no need for ready promise because no asynchronous action has occurred
// gvl is ready to use
```

### Change GVL Language
All vendorlists are published by default as english.  There are alternate languages that the iab publishes which are essetnailly a vendor list without the vendors.  `GVL.baseUrl` must be set for langauges changes.  To load an alternate you simply call `gvl.changeLanguage(/**language*/);` langauge is the iso639-1 two-letter langauge code. [For the full list of iab provided language translations click here](https://register.consensu.org/Translation). If desired the `GVL.languageFilename` may be set if `purposes-[LANG].json` is not used.

** default filename load **
```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/';

const gvl = new GVL(gvljson);

// loads the French langauge
gvl.changeLanguage('fr').then(() => {

  // French Language GVL is ready for use

});
```

** changing filename load **
```javascript
import {GVL} from '@iabtcf/core';

const gvl = new GVL(gvljson);

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/';

GVL.langaugeFilename = 'langauges/purp[LANG].json';

// loads the French langauge from 'http://cmp.mysupercoolcmp.com/purpfr.json'
gvl.changeLanguage('fr').then(() => {

  // French Language GVL is ready for use

});
```


### Get only vendors with a specific feature or purpose under legal basis
A CMP UI may want to group vendors by what purpose they use under what legal basis and/or features.  This can be accomplished quite easily by using one of the 6 grouping methods:
* `getVendorsWithConsentPurpose(purposeId)`
* `getVendorsWithFeature(featureId)`
* `getVendorsWithFlexiblePurpose(purposId)`
* `getVendorsWithLegIntPurpose(purposId)`
* `getVendorsWithSpecialFeature(featureId)`
* `getVendorsWithSpecialPurpose(purposId)`

All 6 grouping methods return a [GVLMap]('../api/interfaces/gvlmap.md')<[Vendor]('../api/interfaces/vendor.md')> object


### Narrow the list of vendors
