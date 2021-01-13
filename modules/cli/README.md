[![NPM version](https://img.shields.io/npm/v/@iabtcf/cli.svg?style=flat-square)](https://www.npmjs.com/package/@iabtcf/cli)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtcf/cli.svg?style=flat)](https://www.npmjs.org/package/@iabtcf/cli)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

# @iabtcf/cli

command line decoding of iab TC String

#### Installation

npm
```
npm install -g @iabtcf/cli
```

yarn
```
yarn add -g @iabtcf/cli
```

#### Using

```
! tcstring COrVd1pOrVd1pACABCENAHCAAAAAAAAAAAiQAAAAAAAA
encoded: "COrVd1pOrVd1pACABCENAHCAAAAAAAAAAAiQAAAAAAAA"
version: 2
cmpId: 2
cmpVersion: 1
consentScreen: 2
consentLanguage: "EN"
created: Mon Dec 09 2019 18:01:46 GMT-0800 (Pacific Standard Time)
lastUpdated: Mon Dec 09 2019 18:01:46 GMT-0800 (Pacific Standard Time)
policyVersion: 2
isServiceSpecific: false
useNonStandardStacks: false
purposeOneTreatment: false
publisherCountryCode: "ES"
supportOOB: false
vendorListVersion: 7
purposeConsents
purposeLegitimateInterest
specialFeatureOptIns
publisherCustomConsents
publisherLegitimateInterest
publisherCustomConsents
publisherCustomLegitimateInterest
vendorConsents
vendorLegitimateInterest
vendorsDisclosed
vendorsAllowed
```
