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

* [customPurposes](tcmodel.md#custompurposes)
* [publisherConsents](tcmodel.md#publisherconsents)
* [publisherCustomConsents](tcmodel.md#publishercustomconsents)
* [publisherCustomLegitimateInterest](tcmodel.md#publishercustomlegitimateinterest)
* [publisherLegitimateInterest](tcmodel.md#publisherlegitimateinterest)
* [publisherRestrictions](tcmodel.md#publisherrestrictions)
* [purposeConsents](tcmodel.md#purposeconsents)
* [purposeLegitimateInterest](tcmodel.md#purposelegitimateinterest)
* [specialFeatureOptIns](tcmodel.md#specialfeatureoptins)
* [vendorConsents](tcmodel.md#vendorconsents)
* [vendorLegitimateInterest](tcmodel.md#vendorlegitimateinterest)
* [vendorsAllowed](tcmodel.md#vendorsallowed)
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
* [numCustomPurposes](tcmodel.md#numcustompurposes)
* [policyVersion](tcmodel.md#policyversion)
* [publisherCountryCode](tcmodel.md#publishercountrycode)
* [purposeOneTreatment](tcmodel.md#purposeonetreatment)
* [supportOOB](tcmodel.md#supportoob)
* [useNonStandardStacks](tcmodel.md#usenonstandardstacks)
* [vendorListVersion](tcmodel.md#vendorlistversion)
* [version](tcmodel.md#version)

### Methods

* [isValid](tcmodel.md#isvalid)
* [setAll](tcmodel.md#setall)
* [setAllPurposeConsents](tcmodel.md#setallpurposeconsents)
* [setAllPurposeLegitimateInterest](tcmodel.md#setallpurposelegitimateinterest)
* [setAllSpecialFeatureOptIns](tcmodel.md#setallspecialfeatureoptins)
* [setAllVendorConsents](tcmodel.md#setallvendorconsents)
* [setAllVendorLegitimateInterest](tcmodel.md#setallvendorlegitimateinterest)
* [setAllVendorsDisclosed](tcmodel.md#setallvendorsdisclosed)
* [unsetAll](tcmodel.md#unsetall)
* [unsetAllPurposeConsents](tcmodel.md#unsetallpurposeconsents)
* [unsetAllPurposeLegitimateInterest](tcmodel.md#unsetallpurposelegitimateinterest)
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

*Defined in [TCModel.ts:138](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L138)*

Constructs the TCModel. Passing a [GVL](gvl.md) is optional when constructing as this TCModel may be constructed from decoding an existing encoded TCString.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](gvl.md) |

**Returns:** [TCModel](tcmodel.md)

___

## Properties

<a id="custompurposes"></a>

###  customPurposes

**● customPurposes**: *[IntMap](../interfaces/intmap.md)<[Purpose](../interfaces/purpose.md)>*

*Defined in [TCModel.ts:87](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L87)*

set by a publisher if they wish to collect consent and LI Transparency for purposes outside of the TCF

___
<a id="publisherconsents"></a>

###  publisherConsents

**● publisherConsents**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherConsents](../interfaces/tcfields.md#publisherconsents)*

*Defined in [TCModel.ts:67](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L67)*

The user’s consent value for each Purpose established on the legal basis of consent, for the publisher. Purposes are published in the Global Vendor List.

___
<a id="publishercustomconsents"></a>

###  publisherCustomConsents

**● publisherCustomConsents**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherCustomConsents](../interfaces/tcfields.md#publishercustomconsents)*

*Defined in [TCModel.ts:94](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L94)*

The user’s consent value for each Purpose established on the legal basis of consent, for the publisher. Purposes are published in the Global Vendor List.

___
<a id="publishercustomlegitimateinterest"></a>

###  publisherCustomLegitimateInterest

**● publisherCustomLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherCustomLegitimateInterest](../interfaces/tcfields.md#publishercustomlegitimateinterest)*

*Defined in [TCModel.ts:101](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L101)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose that is established in the publisher's custom purposes.

___
<a id="publisherlegitimateinterest"></a>

###  publisherLegitimateInterest

**● publisherLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherLegitimateInterest](../interfaces/tcfields.md#publisherlegitimateinterest)*

*Defined in [TCModel.ts:81](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L81)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose.

___
<a id="publisherrestrictions"></a>

###  publisherRestrictions

**● publisherRestrictions**: *[PurposeRestrictionVector](purposerestrictionvector.md)* =  new PurposeRestrictionVector()

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherRestrictions](../interfaces/tcfields.md#publisherrestrictions)*

*Defined in [TCModel.ts:133](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L133)*

___
<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeConsents](../interfaces/tcfields.md#purposeconsents)*

*Defined in [TCModel.ts:60](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L60)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](gvl.md)).

___
<a id="purposelegitimateinterest"></a>

###  purposeLegitimateInterest

**● purposeLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeLegitimateInterest](../interfaces/tcfields.md#purposelegitimateinterest)*

*Defined in [TCModel.ts:74](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L74)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose.

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[specialFeatureOptIns](../interfaces/tcfields.md#specialfeatureoptins)*

*Defined in [TCModel.ts:53](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L53)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorConsents](../interfaces/tcfields.md#vendorconsents)*

*Defined in [TCModel.ts:107](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L107)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Their consent value is true if it is in the Vector

___
<a id="vendorlegitimateinterest"></a>

###  vendorLegitimateInterest

**● vendorLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorLegitimateInterest](../interfaces/tcfields.md#vendorlegitimateinterest)*

*Defined in [TCModel.ts:114](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L114)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Whether their Legitimate Interest Disclosures have been established is stored as boolean. see: [Vector](vector.md)

___
<a id="vendorsallowed"></a>

###  vendorsAllowed

**● vendorsAllowed**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorsAllowed](../interfaces/tcfields.md#vendorsallowed)*

*Defined in [TCModel.ts:131](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L131)*

Signals which vendors the publisher permits to use OOB legal bases.

___
<a id="vendorsdisclosed"></a>

###  vendorsDisclosed

**● vendorsDisclosed**: *[Vector](vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorsDisclosed](../interfaces/tcfields.md#vendorsdisclosed)*

*Defined in [TCModel.ts:126](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L126)*

The value included for disclosed vendors signals which vendors have been disclosed to the user in the interface surfaced by the CMP. This section content is required when writing a TC string to the global (consensu) scope. When a CMP has read from and is updating a TC string from the global consensu.org storage, the CMP MUST retain the existing disclosure information and only add information for vendors that it has disclosed that had not been disclosed by other CMPs in prior interactions with this device/user agent.

___

## Accessors

<a id="cmpid"></a>

###  cmpId

**get cmpId**(): `number` \| `string`

**set cmpId**(integer: *`number` \| `string`*): `void`

*Defined in [TCModel.ts:245](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L245)*

**Returns:** `number` \| `string`

*Defined in [TCModel.ts:231](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L231)*

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` \| `string` |  A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab. |

**Returns:** `void`

___
<a id="cmpversion"></a>

###  cmpVersion

**get cmpVersion**(): `number` \| `string`

**set cmpVersion**(integer: *`number` \| `string`*): `void`

*Defined in [TCModel.ts:273](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L273)*

Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

**Returns:** `number` \| `string`

*Defined in [TCModel.ts:260](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L260)*

Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` \| `string` |   |

**Returns:** `void`

___
<a id="consentlanguage"></a>

###  consentLanguage

**get consentLanguage**(): `string`

**set consentLanguage**(lang: *`string`*): `void`

*Defined in [TCModel.ts:336](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L336)*

**Returns:** `string`

*Defined in [TCModel.ts:315](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L315)*

*__throws__*: {TCModelError} if the value is not a length-2 string of alpha characters

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| lang | `string` |  [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented |

**Returns:** `void`

___
<a id="consentscreen"></a>

###  consentScreen

**get consentScreen**(): `number` \| `string`

**set consentScreen**(integer: *`number` \| `string`*): `void`

*Defined in [TCModel.ts:302](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L302)*

The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)

**Returns:** `number` \| `string`

*Defined in [TCModel.ts:289](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L289)*

The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)

*__throws__*: {TCModelError} if the value is not an integer greater than 0 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` \| `string` |   |

**Returns:** `void`

___
<a id="created"></a>

###  created

**get created**(): `Date`

**set created**(date: *`Date`*): `void`

*Defined in [TCModel.ts:202](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L202)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`

*Defined in [TCModel.ts:196](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L196)*

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

*Defined in [TCModel.ts:185](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L185)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion`, `policyVersion`, and `consentLanguage`

**Returns:** [GVL](gvl.md)
the gvl instance set on this TCModel instance

*Defined in [TCModel.ts:164](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L164)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion`, `policyVersion`, and `consentLanguage`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| gvl | [GVL](gvl.md) |   |

**Returns:** `void`
the gvl instance set on this TCModel instance

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**get isServiceSpecific**(): `boolean`

**set isServiceSpecific**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:487](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L487)*

Whether the signals encoded in this TC String were from site-specific storage `true` versus ‘global’ consensu.org shared storage `false`. A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific `true`.

**Returns:** `boolean`

*Defined in [TCModel.ts:482](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L482)*

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

*Defined in [TCModel.ts:219](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L219)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`

*Defined in [TCModel.ts:213](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L213)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| date | `Date` |  this is automatically updated on encoding |

**Returns:** `void`

___
<a id="numcustompurposes"></a>

###  numCustomPurposes

**get numCustomPurposes**(): `number`

**set numCustomPurposes**(num: *`number`*): `void`

*Defined in [TCModel.ts:770](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L770)*

**Returns:** `number`

*Defined in [TCModel.ts:783](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L783)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| num | `number` |

**Returns:** `void`

___
<a id="policyversion"></a>

###  policyVersion

**get policyVersion**(): `number` \| `string`

**set policyVersion**(num: *`number` \| `string`*): `void`

*Defined in [TCModel.ts:437](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L437)*

From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

**Returns:** `number` \| `string`

*Defined in [TCModel.ts:424](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L424)*

From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` \| `string` |  You do not need to set this. This comes directly from the [GVL](gvl.md). |

**Returns:** `void`

___
<a id="publishercountrycode"></a>

###  publisherCountryCode

**get publisherCountryCode**(): `string`

**set publisherCountryCode**(countryCode: *`string`*): `void`

*Defined in [TCModel.ts:362](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L362)*

**Returns:** `string`

*Defined in [TCModel.ts:349](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L349)*

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

*Defined in [TCModel.ts:547](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L547)*

`false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

**Returns:** `boolean`

*Defined in [TCModel.ts:542](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L542)*

`false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |   |

**Returns:** `void`

___
<a id="supportoob"></a>

###  supportOOB

**get supportOOB**(): `boolean`

**set supportOOB**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:524](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L524)*

Whether or not this publisher supports out-of-band legal basis default is `true`

**Returns:** `boolean`

*Defined in [TCModel.ts:519](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L519)*

Whether or not this publisher supports out-of-band legal basis default is `true`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set |

**Returns:** `void`

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**get useNonStandardStacks**(): `boolean`

**set useNonStandardStacks**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:507](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L507)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Returns:** `boolean`

*Defined in [TCModel.ts:502](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L502)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set |

**Returns:** `void`

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**get vendorListVersion**(): `number` \| `string`

**set vendorListVersion**(integer: *`number` \| `string`*): `void`

*Defined in [TCModel.ts:404](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L404)*

Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

**Returns:** `number` \| `string`

*Defined in [TCModel.ts:376](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L376)*

Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

*__throws__*: {TCModelError} if the value is not an integer greater than 0 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` \| `string` |   |

**Returns:** `void`

___
<a id="version"></a>

###  version

**get version**(): `number`

**set version**(num: *`number`*): `void`

*Defined in [TCModel.ts:465](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L465)*

Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

**Returns:** `number`

*Defined in [TCModel.ts:452](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L452)*

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

*Defined in [TCModel.ts:851](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L851)*

isValid - returns whether all fields have a value

**Returns:** `boolean`

___
<a id="setall"></a>

###  setAll

▸ **setAll**(): `void`

*Defined in [TCModel.ts:736](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L736)*

setAll - calls:

```
setAllVendorConsents();
setAllPurposeLegitimateInterest();
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

*Defined in [TCModel.ts:660](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L660)*

setAllPurposeConsents - sets all purposes on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallpurposelegitimateinterest"></a>

###  setAllPurposeLegitimateInterest

▸ **setAllPurposeLegitimateInterest**(): `void`

*Defined in [TCModel.ts:683](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L683)*

setAllPurposeLegitimateInterest - sets all purposes on the GVL LI Transparency (true)

**Returns:** `void`

___
<a id="setallspecialfeatureoptins"></a>

###  setAllSpecialFeatureOptIns

▸ **setAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:706](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L706)*

setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="setallvendorconsents"></a>

###  setAllVendorConsents

▸ **setAllVendorConsents**(): `void`

*Defined in [TCModel.ts:591](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L591)*

setAllVendorConsents - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallvendorlegitimateinterest"></a>

###  setAllVendorLegitimateInterest

▸ **setAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:637](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L637)*

setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)

**Returns:** `void`

___
<a id="setallvendorsdisclosed"></a>

###  setAllVendorsDisclosed

▸ **setAllVendorsDisclosed**(): `void`

*Defined in [TCModel.ts:614](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L614)*

setAllVendorsDisclosed - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="unsetall"></a>

###  unsetAll

▸ **unsetAll**(): `void`

*Defined in [TCModel.ts:759](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L759)*

unsetAll - calls:

```
unsetAllVendorConsents();
unsetAllPurposeLegitimateInterest();
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

*Defined in [TCModel.ts:672](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L672)*

unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallpurposelegitimateinterest"></a>

###  unsetAllPurposeLegitimateInterest

▸ **unsetAllPurposeLegitimateInterest**(): `void`

*Defined in [TCModel.ts:695](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L695)*

unsetAllPurposeLegitimateInterest - unsets all purposes on the GVL LI Transparency (false)

**Returns:** `void`

___
<a id="unsetallspecialfeatureoptins"></a>

###  unsetAllSpecialFeatureOptIns

▸ **unsetAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:718](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L718)*

unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="unsetallvendorconsents"></a>

###  unsetAllVendorConsents

▸ **unsetAllVendorConsents**(): `void`

*Defined in [TCModel.ts:603](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L603)*

unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallvendorlegitimateinterest"></a>

###  unsetAllVendorLegitimateInterest

▸ **unsetAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:649](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L649)*

unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)

**Returns:** `void`

___
<a id="unsetallvendorsdisclosed"></a>

###  unsetAllVendorsDisclosed

▸ **unsetAllVendorsDisclosed**(): `void`

*Defined in [TCModel.ts:626](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L626)*

unsetAllVendorsDisclosed - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="updated"></a>

###  updated

▸ **updated**(): `void`

*Defined in [TCModel.ts:840](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCModel.ts#L840)*

updated - updates the lastUpdatedDate with a 'now' timestamp

**Returns:** `void`

___

