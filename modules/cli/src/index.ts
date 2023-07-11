#!/usr/bin/env node

/* eslint no-console: 0 */

import {TCString, Vector} from '@internaltestiabtechlab/core';

const args = process.argv;
let encoded = '';

for (const arg of args) {

  if (arg.charAt(0) === 'C' || arg.charAt(0) === 'B') {

    encoded = arg;
    break;

  }

}

const print = (key: string | number, value: string | number | boolean | object | undefined, indent = 0): void => {

  const indentString = '  '.repeat(indent);
  key = '\x1b[33m' + key +'\x1b[0m';

  switch (typeof value) {

    case 'string':
      console.log(`${indentString}${key}: \x1b[32m"${value}"\x1b[0m`);
      break;
    case 'boolean':
      console.log(`${indentString}${key}: \x1b[35m\x1b[1m${value}\x1b[0m`);
      break;
    case 'object':
      if (value instanceof Date) {

        console.log(`${indentString}${key}: \x1b[36m${(value as Date).toString()}\x1b[0m`);

      } else if (value === null) {

        console.log(`${indentString}${key}: \x1b[1m${value}\x1b[0m`);

      } else if (value instanceof Vector) {

        console.log(`\x1b[1m${indentString}${key}\x1b[0m`);
        value.forEach((bool: boolean, id: number): void => {

          print(id, bool, indent + 1);

        });

      } else {

        console.log(`\x1b[1m${indentString}${key}\x1b[0m`);
        Object.keys(value).forEach((key: string): void => {

          print(key, value[key], indent + 1);

        });

      }

      break;
    case 'number':
      console.log(`${indentString}${key}: ${value}\x1b[0m`);
      break;

  }

};

if (encoded) {

  print('encoded', encoded);

  try {

    const tcModel = TCString.decode(encoded);
    const version = tcModel.version;
    print('version', version);
    print('cmpId', tcModel.cmpId);
    print('cmpVersion', tcModel.cmpVersion);
    print('consentScreen', tcModel.consentScreen);
    print('consentLanguage', tcModel.consentLanguage);
    print('created', tcModel.created);
    print('lastUpdated', tcModel.lastUpdated);

    if (version !== 1) {

      print('policyVersion', tcModel.policyVersion);
      print('isServiceSpecific', tcModel.isServiceSpecific);
      print('useNonStandardStacks', tcModel.useNonStandardStacks);
      print('purposeOneTreatment', tcModel.purposeOneTreatment);
      print('publisherCountryCode', tcModel.publisherCountryCode);

    }

    print('vendorListVersion', tcModel.vendorListVersion);
    print('purposeConsents', tcModel.purposeConsents);

    if (version !== 1) {

      print('purposeLegitimateInterests', tcModel.purposeLegitimateInterests);
      print('specialFeatureOptins', tcModel.specialFeatureOptins);
      print('publisherLegitimateInterests', tcModel.publisherLegitimateInterests);
      print('publisherCustomConsents', tcModel.publisherCustomConsents);
      print('publisherConsents', tcModel.publisherConsents);
      print('publisherCustomLegitimateInterests', tcModel.publisherCustomLegitimateInterests);

    }

    print('vendorConsents', tcModel.vendorConsents);

    if (version !== 1) {

      print('vendorLegitimateInterests', tcModel.vendorLegitimateInterests);
      print('vendorsDisclosed', tcModel.vendorsDisclosed);
      print('vendorsAllowed', tcModel.vendorsAllowed);

    }

  } catch (err) {

    console.error(`Unable to decode TC string: ${err.message}`);

  }

} else {

  console.error('Please pass a TC string');

}
