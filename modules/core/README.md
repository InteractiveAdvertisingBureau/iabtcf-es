[![NPM version](https://img.shields.io/npm/v/@iabtcf/core.svg?style=flat-square)](https://www.npmjs.com/package/@iabtcf/core)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtcf/core.svg?style=flat)](https://www.npmjs.org/package/@iabtcf/core)
[![Build](https://travis-ci.org/chrispaterson/iabtcf.svg?branch=master)](https://travis-ci.org/chrispaterson/iabtcf)
[![Coverage Status](https://coveralls.io/repos/github/chrispaterson/iabtcf/badge.svg?branch=master)](https://coveralls.io/github/chrispaterson/iabtcf?branch=master)

# @iabtcf/core

Ensures consistent encoding and decoding of [IAB's Transparency and Consent Framework (TCF)](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) [TC Strings](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#about-the-transparency--consent-string-tc-string) and the stateful persistence of the Transparency and Consent information while providing tools for the handling and manipulation of the [TCF](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) [Global Vendor List](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#the-global-vendor-list) data all free and open sourced ([License](LICENSE)).

  - [Installation](#installation)
  - [Including in your project](#including-in-your-project)
  - [`TCModel`](#tcmodel) - Creates a stateful model to store a Transparency and Consent user interaction with all the fields specifed in the [TC string](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#about-the-transparency--consent-string-tc-string) encoding schema.
     - [Information that is stored in a TC string (specification)](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#what-information-is-stored-in-a-tc-string)
  - [GVL](#gvl) - The [Global Vendor List](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#the-global-vendor-list) contains all of the information about vendors and legal language to display to users in a CMP user interface, this component helps manage it.
      + [Autoload latest vendor-list.json](#autoload-latest-vendor-listjson)
      + [Autoload specific version vendor-list.json](#autoload-specific-version-vendor-listjson)
      + [Pass vendor-list.json object](#pass-vendor-listjson-object)
      + [Change GVL Language](#change-gvl-language)
      + [Get only vendors with a specific feature or purpose under legal basis](#get-only-vendors-with-a-specific-feature-or-purpose-under-legal-basis)
      + [Narrow the list of vendors](#narrow-the-list-of-vendors)
      + [filtering](#narrow-the-list-of-vendors) vendors for subsets of the GVL.
      + [sorting of vendors based on purpose legal bases](#get-only-vendors-with-a-specific-feature-or-purpose-under-legal-basis) that the CMP will need to show the vendors in.
      + loading [GVL JSON files](#autoload-specific-vendor-listjson)
      + loading [language translations](#change-gvl-language) of Purposes, Features, Special Features, Special Purposes, and Stacks
  - [TCString](#tcstring) - Encodes a [`TCModel`](#tcmodel) into a [TC string](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#about-the-transparency--consent-string-tc-string) and decodes a [TC string](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#about-the-transparency--consent-string-tc-string) into a [`TCModel`](#tcmodel)
      + [Decode an IAB TC String](#decode-an-iab-tc-string)
      + [Encode an IAB TC String](#encode-an-iab-tc-string)

#### Installation

npm
```
npm install @iabtcf/core --save
```

yarn
```
yarn add @iabtcf/core
```

#### Using

```javascript
import {TCModel, TCString, GVL} from '@iabtcf/core';

/**
 *  the IAB requires CMPs to host their own vendor-list.json files.  This must
 *  be set before creating any instance of the GVL class.
 */
GVL.baseURL = "http://mydomain.com/cmp/vendorlist";

// create a new TC string
const tcModel = new TCModel(new GVL());

// Some fields will not be populated until a GVL is loaded
tcModel.gvl.readPromise.then(() => {

  // Set values on tcModel...

  const tcString = new TCString();
  const encodedString = tcString.encode(tcModel);

  console.log(encodedString); // TC string encoded begins with 'C'

}

// take an encoded TC string and decode into a TCModel
const decodedTCModel = TCString.decode(encodedString);

```

# TCModel

[API Docs](https://www.iabtcf.com/api/core/classes/tcmodel.html)

### Creating a new TCModel

To encode a `TCModel` a `GVL` must be included.

```javascript
import {TCModel} from '@iabtcf/core';

// creates a TCModel
const tcModel = new TCModel();

// to encode you must have a cmpId and cmpVersion
tcModel.cmpId = //{myCMPID}
tcModel.cmpVersion = //{myCMPVersion}

/**
 * we now have a TCString assigned with a GVL which will set vendorListVersion,
 * tcfPolicyVersion and consentLanguage
 */

```

### CMP Meta Fields

```javascript
import {TCModel} from '@iabtcf/core';

const tcModel = new TCModel();
tcModel.cmpId = // my CMP ID
tcModel.cmpVersion = // my CMP Version
tcModel.consentScreen = // On which 'screen' consent was captured; this is a cmp proprietary number encoded into the TC string
```

### Vectors

The [`TCModel`](https://www.iabtcf.com/api/core/classes/tcmodel.html) leverages a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) style [`Vector`](https://www.iabtcf.com/api/core/classes/vector.html) data structure to set consents, optins, allowed, disclosed, and legitimate interest establishment.  Properties that leverage this data structure are:
 - **Vendors**
   - [`vendorConsents`](https://www.iabtcf.com/api/core/classes/tcmodel.html#vendorconsents)
   - [`vendorLegitimateInterest`](https://www.iabtcf.com/api/core/classes/tcmodel.html#vendorlegitimateinterest)
   - [`vendorsAllowed`](https://www.iabtcf.com/api/core/classes/tcmodel.html#vendorsallowed)
   - [`vendorsDisclosed`](https://www.iabtcf.com/api/core/classes/tcmodel.html#vendorsdisclosed)
 - **Global Purposes**
   - [`purposeConsents`](https://www.iabtcf.com/api/core/classes/tcmodel.html#purposeconsents)
   - [`purposeLegitimateInterest`](https://www.iabtcf.com/api/core/classes/tcmodel.html#legitimateinterest)
 - **Special Feature Opt-Ins**
   - [`specialFeatureOptIns`](https://www.iabtcf.com/api/core/classes/tcmodel.html#specialfeatureoptins)
 - **Publisher**
   - [`publisherConsents`](https://www.iabtcf.com/api/core/classes/tcmodel.html#publisherconsents)
   - [`publisherCustomConsents`](https://www.iabtcf.com/api/core/classes/tcmodel.html#publishercustomconsents)
   - [`publisherLegitimateInterest`](https://www.iabtcf.com/api/core/classes/tcmodel.html#publisherlegitimateinterest)
   - [`publisherCustomLegitimateInterest`](https://www.iabtcf.com/api/core/classes/tcmodel.html#publishercustomlegitimateInterest)
   - [`publisherRestrictions`](https://www.iabtcf.com/api/core/classes/tcmodel.html#publisherrestrictions)
     - This Vector is a special [`PurposeRestrictionVector`](https://www.iabtcf.com/api/core/classes/purposerestrictionvector.html) of [`PurposeRestrictions`](https://www.iabtcf.com/api/core/classes/purposerestriction.html)

**Example with `vendorConsents`**

The `vendorConsents` property on the `TCModel` is a [`Vector`](https://www.iabtcf.com/api/core/classes/vector.html).  This example illustrates the methods of a [`Vector`](https://www.iabtcf.com/api/core/classes/vector.html). With the exception of the `publisherRestrictions`, which implements a different type of [`PurposeRestrictionVector`](https://www.iabtcf.com/api/core/classes/purposerestrictionvector.html), all of the above Vectors will have this interface and functionality.

```javascript
// Give Vendor ID 23 consent
tcModel.vendorConsents.set(23);

console.log(tcModel.vendorConsents.has(24)); // true
console.log(tcModel.vendorConsents.maxId); // 24
console.log(tcModel.vendorConsents.size); // 1

// remove vendor 24
tcModel.vendorConsents.unset(24);
console.log(tcModel.vendorConsents.has(24)); // false
console.log(tcModel.vendorConsents.maxId); // 0
console.log(tcModel.vendorConsents.size); // 0

// give a group of vendors consent
tcModel.vendorConsents.set([24, 14, 24, 100, 102]);
console.log(tcModel.vendorConsents.has(24)); // true
console.log(tcModel.vendorConsents.has(14)); // true
console.log(tcModel.vendorConsents.has(200)); // false
console.log(tcModel.vendorConsents.maxId); // 102
console.log(tcModel.vendorConsents.size); // 5

// loop through all ids 1 to maxId (102 loops)
tcModel.vendorConsents.forEach((hasConsent, vendorId) => {

  // check each id for consent

});

// empty everything
tcModel.vendorConsents.empty();

console.log(tcModel.vendorConsents.has(24)); // false
console.log(tcModel.vendorConsents.maxId); // 0
console.log(tcModel.vendorConsents.size); // 0
```

### Setting Publisher Restrictions

A [Publisher Restriction](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#what-are-publisher-restrictions) is a restriction placed on a Vendor by a publisher limiting the purposes for which that Vendor is allowed to process personal data.  The `TCModel.publisherRestrictions` is an instance of the [`PurposeRestrictionVector`](https://www.iabtcf.com/api/core/classes/purposerestrictionvector.html), which is a vector containing [`PurposeRestrictions`](https://www.iabtcf.com/api/core/classes/purposerestriction.html)'s.

**Example of setting publisher restrictions**

```javascript

import {TCModel, PurposeRestriction, RestrictionType} from '@iabtcf/core';

// first you must create a PurposeRestriction
const purposeRestriction = PurposeRestriction();

purposeRestriction.purposeId = 2;
purposeRestriction.restrictionType = RestrictionType.NOT_ALLOWED;

// vendorID and restriction
tcModel.publisherRestrictions.add(2000, purposeRestriction);

```


# GVL

* [API Docs](https://www.iabtcf.com/api/core/classes/gvl.html)
* [Autoload latest vendor-list.json](#autoload-latest-vendor-listjson)
* [Autoload specific vendor-list.json](#autoload-specific-vendor-listjson)
* [Pass vendor-list.json object](#pass-vendor-list.json-object)
* [Change GVL Language](#change-gvl-language)
* [Get only vendors with a specific feature or purpose under legal basis](#get-only-vendors-with-a-specific-feature-or-purpose-under-legal-basis)
* [Narrow the list of vendors](#narrow-the-list-of-vendors)

The `GVL` class provides two ways to instantiate. Either by passing in a vendor-list.json object to populate it or autoloading a vendor-list.json from a url.

### Autoload latest vendor-list.json
Autoloading a vendor-list.json will accept into the constructor a vendor list version number or if nothing or "LATEST" is passed it will load the latest version of the vendor list.  NOTE.  You must set the `GVL.baseUrl` parameter before instantiating a GVL instance. If desired the `GVL.latestFilename` may be set if `vendor-list.json` is not used.

**Loading default filename**
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

**Loading with custom filename**
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


**Loading default filename for version**
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

**Changing version name scheme**
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

**Default filename load**
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

**Changing filename load**
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

All 6 grouping methods return an [IntMap](https://www.iabtcf.com/api/core/interfaces/intmap.html)<[Vendor](https://www.iabtcf.com/api/core/interfaces/vendor.html)> object

```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

// loads 'http://cmp.mysupercoolcmp.com/cmp/vendor-list.json'
const gvl = new GVL();

gvl.readyPomise.then(() => {

  const vendorMap = gvl.getVendorsWithConsentPurpose(1);

  // logs all vendor ids who have specified they require consent for purpose 1
  Object.keys(vendorMap).forEach(console.log);

});

```
### Narrow the list of vendors
If loading a CMP would like to show a subset of the Vendor List a filter may be passed to only work with those vendors on the list.

```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

// loads 'http://cmp.mysupercoolcmp.com/cmp/vendor-list.json'
const gvl = new GVL();

gvl.readyPomise.then(() => {

  // now this gvl instance only has these 3 vendors
  gvl.narrowVendorsTo([1,2,3]);

  // will only show the Vendor objects for 1, 2, and 3
  console.log(gvl.vendors);

  // will only return the vendors within the narrowed vendor list
  const vendorsWithLegInt2 = gvl.getVendorsWithLegIntPurpose(2);


});

```

# TCString

[API Docs](https://www.iabtcf.com/api/core/classes/tcstring.html)

- [Decode](#decode-an-iab-tc-string)
- [Encode](#encode-an-iab-tc-string)


### Decode an IAB TC String

```typescript
import {TCString, TCModel} from '@iabtcf/core';

const myTCModel = TCString.decode(encodedTCString);

```
*returns:* [`TCModel`](#tcmodel)

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
  const encodedTCString = TCString.encode(tcModel);

  /**
   * this will output a default all "no" encoded string to the console at the
   * lastest GVL version.
   */
  comsole.log(encodedTCString);
});
