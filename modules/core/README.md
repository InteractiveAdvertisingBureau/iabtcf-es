[![NPM version](https://img.shields.io/npm/v/@iabtcf/core.svg?style=flat-square)](https://www.npmjs.com/package/@iabtcf/core)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtcf/core.svg?style=flat)](https://www.npmjs.org/package/@iabtcf/core)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

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
      + [Cloning a GVL with a Non-Default language](#cloning-a-gvl-with-a-non-default-language)
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

This example demonstrates the basic use case of a CMP creating a "default all-no" TC string.
```javascript
import {TCModel, TCString, GVL} from '@iabtcf/core';

/**
 *  the IAB requires CMPs to host their own vendor-list.json files.  This must
 *  be set before creating any instance of the GVL class.
 */
GVL.baseUrl = "http://mydomain.com/cmp/vendorlist";

// create a new TC string
const tcModel = new TCModel(new GVL());

// Some fields will not be populated until a GVL is loaded
tcModel.gvl.readyPromise.then(() => {

  // Set values on tcModel...

  const encodedString = TCString.encode(tcModel);

  console.log(encodedString); // TC string encoded begins with 'C'

});

// take an encoded TC string and decode into a TCModel
const decodedTCModel = TCString.decode(encodedString);

```

# TCModel

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

This exmple shows how to set the basic fields that all TC strings need to have set.

```javascript
import {TCModel} from '@iabtcf/core';

const tcModel = new TCModel();
tcModel.cmpId = // my CMP ID
tcModel.cmpVersion = // my CMP Version
tcModel.consentScreen = // On which 'screen' consent was captured; this is a cmp proprietary number encoded into the TC string
```

### Vectors

The `TCModel` leverages a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) style `Vector` data structure to set consents, optins, allowed, disclosed, and legitimate interest establishment.  Properties that leverage this data structure are:
 - **Vendors**
   - `vendorConsents`
   - `vendorLegitimateInterests`
   - `vendorsAllowed`
   - `vendorsDisclosed`
 - **Global Purposes**
   - `purposeConsents`
   - `purposeLegitimateInterests`
 - **Special Feature Opt-Ins**
   - `specialFeatureOptins`
 - **Publisher**
   - `publisherConsents`
   - `publisherCustomConsents`
   - `publisherLegitimateInterests`
   - `publisherCustomLegitimateInterests`
   - `publisherRestrictions`
     - This Vector is a special `PurposeRestrictionVector` of `PurposeRestrictions`

**Example with `vendorConsents`**

The `vendorConsents` property on the `TCModel` is a `Vector`.  This example illustrates the methods of a `Vector`. With the exception of the `publisherRestrictions`, which implements a different type of `PurposeRestrictionVector`, all of the above Vectors will have this interface and functionality.

```javascript
// Give Vendor ID 24 consent
tcModel.vendorConsents.set(24);

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

A [Publisher Restriction](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#what-are-publisher-restrictions) is a restriction placed on a Vendor by a publisher limiting the purposes for which that Vendor is allowed to process personal data.  The `TCModel.publisherRestrictions` is an instance of the `PurposeRestrictionVector`, which is a vector containing `PurposeRestrictions`'s.

**Example of setting publisher restrictions**

```javascript

import {TCModel, PurposeRestriction, RestrictionType} from '@iabtcf/core';

// first you must create a PurposeRestriction
const purposeRestriction = new PurposeRestriction();

purposeRestriction.purposeId = 2;
purposeRestriction.restrictionType = RestrictionType.NOT_ALLOWED;

// vendorID and restriction
tcModel.publisherRestrictions.add(2000, purposeRestriction);

```


# GVL

* [Autoload latest vendor-list.json](#autoload-latest-vendor-listjson)
* [Autoload specific vendor-list.json](#autoload-specific-vendor-listjson)
* [Pass vendor-list.json object](#pass-vendor-list.json-object)
* [Change GVL Language](#change-gvl-language)
* [Cloning a GVL with a Non-Default language](#cloning-a-gvl-with-a-non-default-language)
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

gvl.readyPromise.then(() => {

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

gvl.readyPromise.then(() => {

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

gvl.readyPromise.then(() => {

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

gvl.readyPromise.then(() => {

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

### Cloning a GVL with a Non-Default language

When cloning a GVL with a non-default language, make sure that any prior `changeLanguage` call is resolved.  If changeLanguage has not yet resolved, `clone` will make an http request for the current language but will have no indication of resolving that request since it is synchronous.

```javascript
import {GVL} from '@iabtcf/core';

const gvl = new GVL();

// Resolving changeLanguage promise using thenables.
gvl.changeLanguage('fr').then(() => {

  const clone = gvl.clone();

})

// Resolving changeLanguage through async/await
const someAsyncFunction = async () => {

  await gvl.changeLanguage('fr');
  const clone = gvl.clone();

}
```


### Get only vendors with a specific feature or purpose under legal basis
A CMP UI may want to group vendors by what purpose they use under what legal basis and/or features.  This can be accomplished quite easily by using one of the 6 grouping methods:
* `getVendorsWithConsentPurpose(purposeId)`
* `getVendorsWithFeature(featureId)`
* `getVendorsWithFlexiblePurpose(purposId)`
* `getVendorsWithLegIntPurpose(purposId)`
* `getVendorsWithSpecialFeature(featureId)`
* `getVendorsWithSpecialPurpose(purposId)`

All 6 grouping methods return an `IntMap<Vendor>` object

```javascript
import {GVL} from '@iabtcf/core';

// only needs to be set once per application as this is a static variable
GVL.baseUrl = 'http://cmp.mysupercoolcmp.com/cmp/';

// loads 'http://cmp.mysupercoolcmp.com/cmp/vendor-list.json'
const gvl = new GVL();

gvl.readyPromise.then(() => {

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

gvl.readyPromise.then(() => {

  // now this gvl instance only has these 3 vendors
  gvl.narrowVendorsTo([1,2,3]);

  // will only show the Vendor objects for 1, 2, and 3
  console.log(gvl.vendors);

  // will only return the vendors within the narrowed vendor list
  const vendorsWithLegInt2 = gvl.getVendorsWithLegIntPurpose(2);


});

```

# TCString

- [Decode](#decode-an-iab-tc-string)
- [Encode](#encode-an-iab-tc-string)
- [Encoding Options](#encoding-options)
- [Encoding a Publisher TC Segment](#encoding-a-publisher-tc-segment)


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
GVL.baseUrl = "http://mydomain.com/cmp/vendorlist";

// we'll get the latest GVL to encode this TCString to
const gvl = new GVL("LATEST");

// have to wait for it to fetch the json
gvl.readyPromise.then(() => {

  const tcModel = new TCModel(gvl);
  const encodedTCString = TCString.encode(tcModel);

  /**
   * this will output a default all "no" encoded string to the console at the
   * lastest GVL version.
   */
  console.log(encodedTCString);

});
```

### Decoding A Segment At A Time

It is possible to pass a reference to an already created `TCModel` and add individual segments to the model.  An important use case for this is if using a globally-scoped TC string and storing the Publisher TC Segment separately in a first-party cookie.

```typescript

import {TCString, Segment} from '@iabtcf/core';

// if you had a getCookie function that returned just that segment
const publisherTCSegment = getCookie('euconsent-ptc');

let tcModel;

// if you had an asynchronous function to get the cookie from global
getGlobalTCString().then((encodedTCString) => {

  tcModel = TCString.decode(encodedTCString);
  TCString.decode(publisherTCSegment, tcModel);

  // now you have a combined TCModel

});


```

### Encoding Options

Options may be passed to the encoder to override defaults.  In most cases the encoder can figure out what segments to include but if the string is surfaced to vendors or for storing in a cookie the encoding is slightly different.  The `@iabtcf/cmpapi` handles this difference and CMPs don't need to worry about it.

```typescript
import {TCString, Segment} from '@iabtcf/core';

// produces the version of the string for the __tcfapi function
const cmpApiEncodedString = TCString.encode(tcModel, { isForVendors: true });

// Overrides default segments (not recommended unless you know what you're doing)
const encodingOptions = {
  segments: [
    Segment.CORE,
    Segment.VENDORS_DISCLOSED,
    Segment.VENDORS_ALLOWED,
    Segment.PUBLISHER_TC,
  ]
}

const customEncodedString = TCString.encode(tcModel, encodingOptions);

```

### Encoding a Publisher TC Segment
By default if the `TCModel.isServiceSpecific = true` then encoding a string will include the publisherTC segment.  But if `TCModel.isServiceSpecific = false` then the segment should only be surfaced through the `__tcfapi` interface and not saved to the global cookie.  However, one will need a way to access and save the publisher TC segment separately from the main TC String to store as a first-party cookie.  In that case you can use the `EncodingOptions` to generate only a Publisher TC segment.

```typescript
const encodingOptions = {
  segments: [Segment.PUBLISHER_TC]
}
const publisherTCSegment = TCString.encode(tcModel, encodingOptions);
```