[@iabtcf/core - API Documentation](../README.md) > [TCModel](../classes/tcmodel.md)

# Class: TCModel

## Hierarchy

**TCModel**

## Implements

* [TCFields](../interfaces/tcfields.md)

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
* [vendorsDisclosed](tcmodel.md#vendorsdisclosed)

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
* [publisherCountryCode](tcmodel.md#publishercountrycode)
* [purposeOneTreatment](tcmodel.md#purposeonetreatment)
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
* [setAllVendorsDisclosed](tcmodel.md#setallvendorsdisclosed)
* [unsetAll](tcmodel.md#unsetall)
* [unsetAllPurposeConsents](tcmodel.md#unsetallpurposeconsents)
* [unsetAllPurposeLITransparency](tcmodel.md#unsetallpurposelitransparency)
* [unsetAllSpecialFeatureOptIns](tcmodel.md#unsetallspecialfeatureoptins)
* [unsetAllVendorConsents](tcmodel.md#unsetallvendorconsents)
* [unsetAllVendorLegitimateInterest](tcmodel.md#unsetallvendorlegitimateinterest)
* [unsetAllVendorsDisclosed](tcmodel.md#unsetallvendorsdisclosed)
* [updated](tcmodel.md#updated)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCModel**(gvl?: *[GVL](gvl.md)*): [TCModel](tcmodel.md)

*Defined in [TCModel.ts:89](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L89)*

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

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherRestrictions](../interfaces/tcfields.md#publisherrestrictions)*

*Defined in [TCModel.ts:89](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L89)*

___
<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeConsents](../interfaces/tcfields.md#purposeconsents)*

*Defined in [TCModel.ts:55](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L55)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](gvl.md)).

___
<a id="purposelitransparency"></a>

###  purposeLITransparency

**● purposeLITransparency**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeLITransparency](../interfaces/tcfields.md#purposelitransparency)*

*Defined in [TCModel.ts:62](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L62)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose, the corresponding bit for that purpose should be set to false.

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[specialFeatureOptIns](../interfaces/tcfields.md#specialfeatureoptins)*

*Defined in [TCModel.ts:48](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L48)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorConsents](../interfaces/tcfields.md#vendorconsents)*

*Defined in [TCModel.ts:68](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L68)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Their consent value is stored as boolean. see: [Vector](vector.md)

___
<a id="vendorlegitimateinterest"></a>

###  vendorLegitimateInterest

**● vendorLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorLegitimateInterest](../interfaces/tcfields.md#vendorlegitimateinterest)*

*Defined in [TCModel.ts:75](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L75)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Whether their Legitimate Interest Disclosures have been established is stored as boolean. see: [Vector](vector.md)

___
<a id="vendorsdisclosed"></a>

###  vendorsDisclosed

**● vendorsDisclosed**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:87](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L87)*

The value included for disclosed vendors signals which vendors have been disclosed to the user in the interface surfaced by the CMP. This section content is required when writing a TC string to the global (consensu) scope. When a CMP has read from and is updating a TC string from the global consensu.org storage, the CMP MUST retain the existing disclosure information and only add information for vendors that it has disclosed that had not been disclosed by other CMPs in prior interactions with this device/user agent.

___

## Accessors

<a id="cmpid"></a>

###  cmpId

**get cmpId**(): `number`

**set cmpId**(integer: *`number`*): `void`

*Defined in [TCModel.ts:194](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L194)*

**Returns:** `number`

*Defined in [TCModel.ts:180](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L180)*

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |  A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab. |

**Returns:** `void`

___
<a id="cmpversion"></a>

###  cmpVersion

**get cmpVersion**(): `number`

**set cmpVersion**(integer: *`number`*): `void`

*Defined in [TCModel.ts:222](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L222)*

Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

**Returns:** `number`

*Defined in [TCModel.ts:209](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L209)*

Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |   |

**Returns:** `void`

___
<a id="consentlanguage"></a>

###  consentLanguage

**get consentLanguage**(): `string`

**set consentLanguage**(lang: *`string`*): `void`

*Defined in [TCModel.ts:277](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L277)*

**Returns:** `string`

*Defined in [TCModel.ts:264](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L264)*

*__throws__*: {TCModelError} if the value is not a length-2 string of alpha characters

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

*Defined in [TCModel.ts:251](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L251)*

The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)

**Returns:** `number`

*Defined in [TCModel.ts:238](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L238)*

The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)

*__throws__*: {TCModelError} if the value is not an integer greater than 0 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |   |

**Returns:** `void`

___
<a id="created"></a>

###  created

**get created**(): `Date`

**set created**(date: *`Date`*): `void`

*Defined in [TCModel.ts:152](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L152)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`

*Defined in [TCModel.ts:147](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L147)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| date | `Date` |  This will be set automatically |

**Returns:** `void`

___
<a id="gvl"></a>

###  gvl

**get gvl**(): [GVL](gvl.md)

**set gvl**(gvl: *[GVL](gvl.md)*): `void`

*Defined in [TCModel.ts:136](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L136)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

**Returns:** [GVL](gvl.md)
the gvl instance set on this TCModel instance

*Defined in [TCModel.ts:116](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L116)*

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

*Defined in [TCModel.ts:414](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L414)*

Whether the signals encoded in this TC String were from site-specific storage `true` versus ‘global’ consensu.org shared storage `false`. A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific `true`.

**Returns:** `boolean`

*Defined in [TCModel.ts:409](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L409)*

Whether the signals encoded in this TC String were from site-specific storage `true` versus ‘global’ consensu.org shared storage `false`. A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific `true`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set. Some changes to other fields in this model will automatically change this value like adding publisher restrictions. |

**Returns:** `void`

___
<a id="lastupdated"></a>

###  lastUpdated

**get lastUpdated**(): `Date`

**set lastUpdated**(date: *`Date`*): `void`

*Defined in [TCModel.ts:168](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L168)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`

*Defined in [TCModel.ts:163](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L163)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| date | `Date` |  this is automatically updated on encoding |

**Returns:** `void`

___
<a id="policyversion"></a>

###  policyVersion

**get policyVersion**(): `number`

**set policyVersion**(num: *`number`*): `void`

*Defined in [TCModel.ts:364](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L364)*

From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

**Returns:** `number`

*Defined in [TCModel.ts:351](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L351)*

From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  You do not need to set this. This comes directly from the [GVL](gvl.md). |

**Returns:** `void`

___
<a id="publishercountrycode"></a>

###  publisherCountryCode

**get publisherCountryCode**(): `string`

**set publisherCountryCode**(countryCode: *`string`*): `void`

*Defined in [TCModel.ts:303](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L303)*

**Returns:** `string`

*Defined in [TCModel.ts:290](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L290)*

*__throws__*: {TCModelError} if the value is not a length-2 string of alpha characters

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| countryCode | `string` |  [two-letter ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher, determined by the CMP-settings of the publisher. |

**Returns:** `void`

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**get purposeOneTreatment**(): `boolean`

**set purposeOneTreatment**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:457](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L457)*

`false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

**Returns:** `boolean`

*Defined in [TCModel.ts:452](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L452)*

`false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |   |

**Returns:** `void`

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**get useNonStandardStacks**(): `boolean`

**set useNonStandardStacks**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:434](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L434)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Returns:** `boolean`

*Defined in [TCModel.ts:429](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L429)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set |

**Returns:** `void`

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**get vendorListVersion**(): `number`

**set vendorListVersion**(integer: *`number`*): `void`

*Defined in [TCModel.ts:331](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L331)*

Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

**Returns:** `number`

*Defined in [TCModel.ts:317](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L317)*

Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

*__throws__*: {TCModelError} if the value is not an integer greater than 0 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |   |

**Returns:** `void`

___
<a id="version"></a>

###  version

**get version**(): `number`

**set version**(num: *`number`*): `void`

*Defined in [TCModel.ts:392](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L392)*

Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

**Returns:** `number`

*Defined in [TCModel.ts:379](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L379)*

Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

*__throws__*: {TCModelError} if the value is not either 1 or 2

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |   |

**Returns:** `void`

___

## Methods

<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [TCModel.ts:717](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L717)*

isValid - returns whether all fields have a value

**Returns:** `boolean`

___
<a id="setall"></a>

###  setAll

▸ **setAll**(): `void`

*Defined in [TCModel.ts:645](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L645)*

setAll - calls:

```
setAllVendorConsents();
setAllPurposeLITransparency();
setAllSpecialFeatureOptIns();
setAllPurposeConsents();
setAllVendorLegitimateInterest();
setAllVendorsDisclosed();
```

**Returns:** `void`

___
<a id="setallpurposeconsents"></a>

###  setAllPurposeConsents

▸ **setAllPurposeConsents**(): `void`

*Defined in [TCModel.ts:569](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L569)*

setAllPurposeConsents - sets all purposes on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallpurposelitransparency"></a>

###  setAllPurposeLITransparency

▸ **setAllPurposeLITransparency**(): `void`

*Defined in [TCModel.ts:592](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L592)*

setAllPurposeLITransparency - sets all purposes on the GVL LI Transparency (true)

**Returns:** `void`

___
<a id="setallspecialfeatureoptins"></a>

###  setAllSpecialFeatureOptIns

▸ **setAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:615](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L615)*

setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="setallvendorconsents"></a>

###  setAllVendorConsents

▸ **setAllVendorConsents**(): `void`

*Defined in [TCModel.ts:500](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L500)*

setAllVendorConsents - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallvendorlegitimateinterest"></a>

###  setAllVendorLegitimateInterest

▸ **setAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:546](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L546)*

setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)

**Returns:** `void`

___
<a id="setallvendorsdisclosed"></a>

###  setAllVendorsDisclosed

▸ **setAllVendorsDisclosed**(): `void`

*Defined in [TCModel.ts:523](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L523)*

setAllVendorsDisclosed - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="unsetall"></a>

###  unsetAll

▸ **unsetAll**(): `void`

*Defined in [TCModel.ts:668](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L668)*

unsetAll - calls:

```
unsetAllVendorConsents();
unsetAllPurposeLITransparency();
unsetAllSpecialFeatureOptIns();
unsetAllPurposeConsents();
unsetAllVendorLegitimateInterest();
unsetAllVendorsDisclosed();
```

**Returns:** `void`

___
<a id="unsetallpurposeconsents"></a>

###  unsetAllPurposeConsents

▸ **unsetAllPurposeConsents**(): `void`

*Defined in [TCModel.ts:581](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L581)*

unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallpurposelitransparency"></a>

###  unsetAllPurposeLITransparency

▸ **unsetAllPurposeLITransparency**(): `void`

*Defined in [TCModel.ts:604](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L604)*

unsetAllPurposeLITransparency - unsets all purposes on the GVL LI Transparency (false)

**Returns:** `void`

___
<a id="unsetallspecialfeatureoptins"></a>

###  unsetAllSpecialFeatureOptIns

▸ **unsetAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:627](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L627)*

unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="unsetallvendorconsents"></a>

###  unsetAllVendorConsents

▸ **unsetAllVendorConsents**(): `void`

*Defined in [TCModel.ts:512](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L512)*

unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallvendorlegitimateinterest"></a>

###  unsetAllVendorLegitimateInterest

▸ **unsetAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:558](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L558)*

unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)

**Returns:** `void`

___
<a id="unsetallvendorsdisclosed"></a>

###  unsetAllVendorsDisclosed

▸ **unsetAllVendorsDisclosed**(): `void`

*Defined in [TCModel.ts:535](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L535)*

unsetAllVendorsDisclosed - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="updated"></a>

###  updated

▸ **updated**(): `void`

*Defined in [TCModel.ts:706](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/TCModel.ts#L706)*

updated - updates the lastUpdatedDate with a 'now' timestamp

**Returns:** `void`

___

