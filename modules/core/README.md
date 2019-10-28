[![NPM version](https://img.shields.io/npm/v/@iabtcf/core.svg?style=flat-square)](https://www.npmjs.com/package/@iabtcf/core)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtcf/core.svg?style=flat)](https://www.npmjs.org/package/@iabtcf/core)
[![Build](https://travis-ci.org/chrispaterson/iabtcf-es.svg?branch=master)](https://travis-ci.org/chrispaterson/iabtcf-es)
[![Coverage Status](https://coveralls.io/repos/github/chrispaterson/iabtcf-es/badge.svg)](https://coveralls.io/github/chrispaterson/iabtcf-es)

# @iabtcf/core

Ensures consistent encoding and decoding of [IAB's Transparency and Consent Framework (TCF)](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) [TC Strings](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#about-the-transparency--consent-string-tc-string) and the stateful persistence of the Transparency and Consent information while providing tools for the handling and manipulation of the [TCF](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework)[Global Vendor List](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#the-global-vendor-list) data all free and open sourced [License](LICENSE).

## Table of Contents
- [Documentation](#documentation)
    + [Installation](#installation)
    + [Including in your project](#including-in-your-project)
    + [More Documentation](#more-documentation)

## Documentation

**The core library contains 3 major components to help with working within the TCF.**

 - [`TCModel`](docs/usage/tcmodel.md) - Creates a stateful model to store a Transparency and Consent user interaction with all the fields specifed in the [TC String](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#about-the-transparency--consent-string-tc-string) encoding schema.
     - [Information that is stored in a TC String](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#what-information-is-stored-in-a-tc-string)
 - [`GVL`](docs/usage/gvl.md) - The [Global Vendor List](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#the-global-vendor-list) contains all of the information about vendors and legal language to display to users in a CMP user interface, this component helps manage it.
    - [filtering](docs/usage/gvl.md#narrow-the-list-of-vendors) vendors for subsets of the GVL.
    - [sorting of vendors based on purpose legal bases](docs/usage/gvl.md#get-only-vendors-with-a-specific-feature-or-purpose-under-legal-basis) that the CMP will need to show the vendors in.
    - loading [GVL JSON files](docs/usage/gvl.md#autoload-specific-vendor-list.json)
    - loading [language translations](docs/usage/gvl.md#change-gvl-language) of Purposes, Features, Special Features, Special Purposes, and Stacks
 - [`TCString`](docs/usage/tcstring.md)
   - [Encodes a `TCModel` to an encoded IAB TC String](docs/usage/tcstring.md#encode-an-iab-tc-string)
   - [Decodes a encoded IAB TC String to a `TCModel`](docs/usage/tcstring.md#decode-an-iab-tc-string)

#### Installation

npm
```
npm install @iabtcf/core --save
```

yarn
```
yarn add @iabtcf/core
```

#### Including in your project

```javascript

import {TCModel, TCString, GVL} from '@iabtcf/core';

GVL.baseURL = "http://mydomain.com/cmp/vendorlist";

const gvl = new GVL("LATEST");
gvl.readPromise.then(() => {

  const tcModel = new TCModel(gvl);

  // Set values on tcModel...

  const tcString = new TCString();
  const encodedString = tcString.encode(tcModel);

  // send out string

}

```

#### More Documentation
 * [API Documentation](docs/api/README.md#iabtcfcore---api-documentation)
 * [Usage Documentation](docs/usage/README.md)
