const fields = new Map();

/**
 * name of the field as decried by the TCF Policy documents
 * is the key and the number of bits the field occupies is
 * the value.
 */

fields.set('Version', 6);
fields.set('Checksum', 18);
fields.set('Created', 36);
fields.set('LastUpdated', 36);
fields.set('CmpId', 12);
fields.set('CmpVersion', 12);
fields.set('ConsentScreen', 6);
fields.set('ConsentLanguage', 12);
fields.set('VendorListVersion', 12);
fields.set('PolicyVersion', 6);
fields.set('IsServiceSpecific', 1);
fields.set('UseNonStandardStacks', 1);
fields.set('SpecialFeatureOptIns', 12);
fields.set('PurposesConsent', 24);
fields.set('PurposesLIEstablished', 24);

const valueWithinRange = (fieldName: string, valuePassed: number): boolean => {

  const numBits = fields.get(fieldName);
  const maxValue = Math.pow(2, numBits);

  return (valuePassed < 0 || maxValue > valuePassed );

};

export {fields, valueWithinRange};
