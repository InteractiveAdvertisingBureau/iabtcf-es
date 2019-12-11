#!/usr/bin/env node

import {TCString, TCModel, Vector} from '@iabtcf/core';

const args = process.argv;
const yellow = "\x1b[33m%s: \x1b[0m%s";
let encoded = '';

for(let arg of args) {
  if(arg.charAt(0) === "C") {
    encoded = arg;
    break;
  }
}

global.btoa = (str: string | Buffer): string => {

  let buffer;

  if (str instanceof Buffer) {

    buffer = str;

  } else {

    buffer = Buffer.from(str.toString(), 'binary');

  }

  return buffer.toString('base64');

}
global.atob = (str: string): string => {

  return Buffer.from(str, 'base64').toString('binary');

}

const printVector = (vect: Vector, name: string): void => {
  console.log(yellow, name, '');
  vect.forEach((value: boolean, id: number): void => {
    console.log(`  ${id}: ${value}`);  
  });
}

if(encoded) {

  console.log(yellow, 'encoded', encoded);
  try {

    const tcModel = TCString.decode(encoded); 
    console.log(yellow, "version", tcModel.version);
    console.log(yellow, "cmpId", tcModel.cmpId);
    console.log(yellow, "cmpVersion", tcModel.cmpVersion);
    console.log(yellow, "consentScreen", tcModel.consentScreen);
    console.log(yellow, "created", tcModel.created);
    console.log(yellow, "lastUpdated", tcModel.lastUpdated);
    console.log(yellow, "policyVersion", tcModel.policyVersion);
    console.log(yellow, "isServiceSpecific", tcModel.isServiceSpecific);
    console.log(yellow, "useNonStandardStacks", tcModel.useNonStandardStacks);
    console.log(yellow, "purposeOneTreatment", tcModel.purposeOneTreatment);
    console.log(yellow, "publisherCountryCode", tcModel.publisherCountryCode);
    console.log(yellow, "supportOOB", tcModel.supportOOB);
    console.log(yellow, "vendorListVersion", tcModel.vendorListVersion);
    printVector(tcModel.purposeConsents,'purposeConsents');
    printVector(tcModel.purposeLegitimateInterest,'purposeLegitimateInterest');

  } catch(err) {

    console.error(`Unable to decode TC string: ${err.message}`);

  }

} else {

  console.error("Please pass a TC string");

}
