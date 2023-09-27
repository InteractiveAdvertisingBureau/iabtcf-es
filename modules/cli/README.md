[![NPM version](https://img.shields.io/npm/v/@cookiehub/iabtcf-cli.svg?style=flat-square)](https://www.npmjs.com/package/@cookiehub/iabtcf-cli)
[![npm module downloads per month](http://img.shields.io/npm/dm/@cookiehub/iabtcf-cli.svg?style=flat)](https://www.npmjs.org/package/@cookiehub/iabtcf-cli)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

# @cookiehub/iabtcf-cli

command line decoding of iab TC String

#### Installation

npm
```
npm install -g @cookiehub/iabtcf-cli
```

yarn
```
yarn add -g @cookiehub/iabtcf-cli
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
created: Mon Dec 09 2019 00:00:00 GMT
lastUpdated: Mon Dec 09 2019 00:00:00 GMT
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
