[@iabtcf/core - API Documentation](../README.md) > [TCModel](../classes/tcmodel.md)

# Class: TCModel

## Hierarchy

**TCModel**

## Index

### Constructors

* [constructor](tcmodel.md#constructor)

### Properties

* [publisherRestrictions](tcmodel.md#publisherrestrictions)
* [purposeConsents](tcmodel.md#purposeconsents)
* [purposeLITransparency](tcmodel.md#purposelitransparency)
* [specialFeatureOptIns](tcmodel.md#specialfeatureoptins)
* [vendorConsents](tcmodel.md#vendorconsents)
* [vendorLegitimateInterest](tcmodel.md#vendorlegitimateinterest)

### Accessors

* [cmpId](tcmodel.md#cmpid)
* [cmpVersion](tcmodel.md#cmpversion)
* [consentLanguage](tcmodel.md#consentlanguage)
* [consentScreen](tcmodel.md#consentscreen)
* [created](tcmodel.md#created)
* [gvl](tcmodel.md#gvl)
* [isServiceSpecific](tcmodel.md#isservicespecific)
* [lastUpdated](tcmodel.md#lastupdated)
* [policyVersion](tcmodel.md#policyversion)
* [purposeOneTreatment](tcmodel.md#purposeonetreatment)
* [referenceCountry](tcmodel.md#referencecountry)
* [useNonStandardStacks](tcmodel.md#usenonstandardstacks)
* [vendorListVersion](tcmodel.md#vendorlistversion)
* [version](tcmodel.md#version)

### Methods

* [isValid](tcmodel.md#isvalid)
* [setAll](tcmodel.md#setall)
* [setAllPurposeConsents](tcmodel.md#setallpurposeconsents)
* [setAllPurposeLITransparency](tcmodel.md#setallpurposelitransparency)
* [setAllSpecialFeatureOptIns](tcmodel.md#setallspecialfeatureoptins)
* [setAllVendorConsents](tcmodel.md#setallvendorconsents)
* [setAllVendorLegitimateInterest](tcmodel.md#setallvendorlegitimateinterest)
* [unsetAll](tcmodel.md#unsetall)
* [unsetAllPurposeConsents](tcmodel.md#unsetallpurposeconsents)
* [unsetAllPurposeLITransparency](tcmodel.md#unsetallpurposelitransparency)
* [unsetAllSpecialFeatureOptIns](tcmodel.md#unsetallspecialfeatureoptins)
* [unsetAllVendorConsents](tcmodel.md#unsetallvendorconsents)
* [unsetAllVendorLegitimateInterest](tcmodel.md#unsetallvendorlegitimateinterest)
* [updated](tcmodel.md#updated)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCModel**(gvl?: *[GVL](gvl.md)*): [TCModel](tcmodel.md)

*Defined in [TCModel.ts:69](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L69)*

Constructs the TCModel. Passing a [GVL](gvl.md) is optional when constructing as this TCModel may be constructed from decoding an existing encoded TCString.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](gvl.md) |

**Returns:** [TCModel](tcmodel.md)

___

## Properties

<a id="publisherrestrictions"></a>

###  publisherRestrictions

**● publisherRestrictions**: *[PurposeRestrictionVector](purposerestrictionvector.md)* =  new PurposeRestrictionVector()

*Defined in [TCModel.ts:69](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L69)*

___
<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:47](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L47)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](gvl.md)).

___
<a id="purposelitransparency"></a>

###  purposeLITransparency

**● purposeLITransparency**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:54](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L54)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose, the corresponding bit for that purpose should be set to false.

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:40](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L40)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:60](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L60)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Their consent value is stored as boolean. see: [Vector](vector.md)

___
<a id="vendorlegitimateinterest"></a>

###  vendorLegitimateInterest

**● vendorLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:67](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L67)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Whether their Legitimate Interest Disclosures have been established is stored as boolean. see: [Vector](vector.md)

___

## Accessors

<a id="cmpid"></a>

###  cmpId

**get cmpId**(): `number`

**set cmpId**(integer: *`number`*): `void`

*Defined in [TCModel.ts:190](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L190)*

**Returns:** `number`
*   A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab.

*Defined in [TCModel.ts:171](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L171)*

*__throws__*: {TCModelError} if the id is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |  A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab. |

**Returns:** `void`
*   A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab.

___
<a id="cmpversion"></a>

###  cmpVersion

**get cmpVersion**(): `number`

**set cmpVersion**(integer: *`number`*): `void`

*Defined in [TCModel.ts:219](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L219)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:200](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L200)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |  Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP. |

**Returns:** `void`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

___
<a id="consentlanguage"></a>

###  consentLanguage

**get consentLanguage**(): `string`

**set consentLanguage**(lang: *`string`*): `void`

*Defined in [TCModel.ts:283](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L283)*

**Returns:** `string`
*   [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented

*Defined in [TCModel.ts:264](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L264)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| lang | `string` |  [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented |

**Returns:** `void`

___
<a id="consentscreen"></a>

###  consentScreen

**get consentScreen**(): `number`

**set consentScreen**(integer: *`number`*): `void`

*Defined in [TCModel.ts:252](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L252)*

**Returns:** `number`
*   The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)

*Defined in [TCModel.ts:232](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L232)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |  The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.) |

**Returns:** `void`

___
<a id="created"></a>

###  created

**get created**(): `Date`

**set created**(date: *`Date`*): `void`

*Defined in [TCModel.ts:138](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L138)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was created and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:128](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L128)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| date | `Date` |  in case the created date is different than when this TCModel was constructed. This is auto set for the encoding when this object is created. |

**Returns:** `void`
*   date this TCModel was created and/or the string that this TCModel was decoded from.

___
<a id="gvl"></a>

###  gvl

**get gvl**(): [GVL](gvl.md)

**set gvl**(gvl: *[GVL](gvl.md)*): `void`

*Defined in [TCModel.ts:115](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L115)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

**Returns:** [GVL](gvl.md)
the gvl instance set on this TCModel instance

*Defined in [TCModel.ts:95](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L95)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

*__throws__*: {TCModelError} if a gvl is already set on this TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| gvl | [GVL](gvl.md) |  may only be set once for this model. |

**Returns:** `void`
the gvl instance set on this TCModel instance

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**get isServiceSpecific**(): `boolean`

**set isServiceSpecific**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:443](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L443)*

Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False). A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).

**Returns:** `boolean`
bool - value that was set

*Defined in [TCModel.ts:429](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L429)*

Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False). A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set. Some changes to other fields in this model will automatically change this value like adding publisher restrictions. |

**Returns:** `void`
bool - value that was set

___
<a id="lastupdated"></a>

###  lastUpdated

**get lastUpdated**(): `Date`

**set lastUpdated**(date: *`Date`*): `void`

*Defined in [TCModel.ts:159](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L159)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was last updated and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:149](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L149)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| date | `Date` |  this is automatically updated on encoding |

**Returns:** `void`
*   date this TCModel was last updated and/or the string that this TCModel was decoded from.

___
<a id="policyversion"></a>

###  policyVersion

**get policyVersion**(): `number`

**set policyVersion**(num: *`number`*): `void`

*Defined in [TCModel.ts:382](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L382)*

**Returns:** `number`
*   From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

*Defined in [TCModel.ts:358](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L358)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  You do not need to set this. This comes directly from the [GVL](gvl.md). From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.<br><br>If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent. |

**Returns:** `void`
*   From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**get purposeOneTreatment**(): `boolean`

**set purposeOneTreatment**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:503](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L503)*

**Returns:** `boolean`
bool - `false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

*Defined in [TCModel.ts:487](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L487)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  \`false\` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. \`true\` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of \`false\`. When a CMP encounters a global scope string with \`purposeOneTreatment=true\` then that string should be considered invalid and the CMP must re-establish transparency and consent. |

**Returns:** `void`
bool - `false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

___
<a id="referencecountry"></a>

###  referenceCountry

**get referenceCountry**(): `string`

**set referenceCountry**(countryCode: *`string`*): `void`

*Defined in [TCModel.ts:294](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L294)*

**Returns:** `string`
*   [two-letter ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher, determined by the CMP-settings of the publisher.

*Defined in [TCModel.ts:306](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L306)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| countryCode | `string` |  [two-letter ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher, determined by the CMP-settings of the publisher. |

**Returns:** `void`

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**get useNonStandardStacks**(): `boolean`

**set useNonStandardStacks**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:471](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L471)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Returns:** `boolean`
bool - value that was set

*Defined in [TCModel.ts:457](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L457)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set |

**Returns:** `void`
bool - value that was set

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**get vendorListVersion**(): `number`

**set vendorListVersion**(num: *`number`*): `void`

*Defined in [TCModel.ts:342](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L342)*

**Returns:** `number`
*   Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

*Defined in [TCModel.ts:324](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L324)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically. |

**Returns:** `void`
*   Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

___
<a id="version"></a>

###  version

**get version**(): `number`

**set version**(num: *`number`*): `void`

*Defined in [TCModel.ts:412](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L412)*

**Returns:** `number`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

*Defined in [TCModel.ts:393](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L393)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields. |

**Returns:** `void`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

___

## Methods

<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [TCModel.ts:738](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L738)*

isValid - returns whether all fields have a value

**Returns:** `boolean`

___
<a id="setall"></a>

###  setAll

▸ **setAll**(): `void`

*Defined in [TCModel.ts:667](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L667)*

setAll - calls:

```
setAllVendorConsents();
setAllPurposeLITransparency();
setAllSpecialFeatureOptIns();
setAllPurposeConsents();
setAllVendorLegitimateInterest();
```

**Returns:** `void`

___
<a id="setallpurposeconsents"></a>

###  setAllPurposeConsents

▸ **setAllPurposeConsents**(): `void`

*Defined in [TCModel.ts:592](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L592)*

setAllPurposeConsents - sets all purposes on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallpurposelitransparency"></a>

###  setAllPurposeLITransparency

▸ **setAllPurposeLITransparency**(): `void`

*Defined in [TCModel.ts:615](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L615)*

setAllPurposeLITransparency - sets all purposes on the GVL LI Transparency (true)

**Returns:** `void`

___
<a id="setallspecialfeatureoptins"></a>

###  setAllSpecialFeatureOptIns

▸ **setAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:638](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L638)*

setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="setallvendorconsents"></a>

###  setAllVendorConsents

▸ **setAllVendorConsents**(): `void`

*Defined in [TCModel.ts:546](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L546)*

setAllVendorConsents - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallvendorlegitimateinterest"></a>

###  setAllVendorLegitimateInterest

▸ **setAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:569](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L569)*

setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)

**Returns:** `void`

___
<a id="unsetall"></a>

###  unsetAll

▸ **unsetAll**(): `void`

*Defined in [TCModel.ts:690](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L690)*

unsetAll - calls:

```
unsetAllVendorConsents();
unsetAllPurposeLITransparency();
unsetAllSpecialFeatureOptIns();
unsetAllPurposeConsents();
unsetAllVendorLegitimateInterest();
```

**Returns:** `void`

___
<a id="unsetallpurposeconsents"></a>

###  unsetAllPurposeConsents

▸ **unsetAllPurposeConsents**(): `void`

*Defined in [TCModel.ts:604](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L604)*

unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallpurposelitransparency"></a>

###  unsetAllPurposeLITransparency

▸ **unsetAllPurposeLITransparency**(): `void`

*Defined in [TCModel.ts:627](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L627)*

unsetAllPurposeLITransparency - unsets all purposes on the GVL LI Transparency (false)

**Returns:** `void`

___
<a id="unsetallspecialfeatureoptins"></a>

###  unsetAllSpecialFeatureOptIns

▸ **unsetAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:650](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L650)*

unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="unsetallvendorconsents"></a>

###  unsetAllVendorConsents

▸ **unsetAllVendorConsents**(): `void`

*Defined in [TCModel.ts:558](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L558)*

unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallvendorlegitimateinterest"></a>

###  unsetAllVendorLegitimateInterest

▸ **unsetAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:581](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L581)*

unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)

**Returns:** `void`

___
<a id="updated"></a>

###  updated

▸ **updated**(): `void`

*Defined in [TCModel.ts:727](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/TCModel.ts#L727)*

updated - updates the lastUpdatedDate with a 'now' timestamp

**Returns:** `void`

___

