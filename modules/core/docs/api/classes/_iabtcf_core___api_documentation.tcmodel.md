[@iabtcf/core - API Documentation](../README.md) > [TCModel](../classes/_iabtcf_core___api_documentation.tcmodel.md)

# Class: TCModel

## Hierarchy

 [Cloneable](_iabtcf_core___api_documentation.cloneable.md)<[TCModel](_iabtcf_core___api_documentation.tcmodel.md)>

**↳ TCModel**

## Implements

* [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md)

## Index

### Constructors

* [constructor](_iabtcf_core___api_documentation.tcmodel.md#constructor)

### Properties

* [consentLanguages](_iabtcf_core___api_documentation.tcmodel.md#consentlanguages)
* [customPurposes](_iabtcf_core___api_documentation.tcmodel.md#custompurposes)
* [publisherConsents](_iabtcf_core___api_documentation.tcmodel.md#publisherconsents)
* [publisherCustomConsents](_iabtcf_core___api_documentation.tcmodel.md#publishercustomconsents)
* [publisherCustomLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#publishercustomlegitimateinterest)
* [publisherLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#publisherlegitimateinterest)
* [publisherRestrictions](_iabtcf_core___api_documentation.tcmodel.md#publisherrestrictions)
* [purposeConsents](_iabtcf_core___api_documentation.tcmodel.md#purposeconsents)
* [purposeLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#purposelegitimateinterest)
* [specialFeatureOptIns](_iabtcf_core___api_documentation.tcmodel.md#specialfeatureoptins)
* [testMap](_iabtcf_core___api_documentation.tcmodel.md#testmap)
* [vendorConsents](_iabtcf_core___api_documentation.tcmodel.md#vendorconsents)
* [vendorLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#vendorlegitimateinterest)
* [vendorsAllowed](_iabtcf_core___api_documentation.tcmodel.md#vendorsallowed)
* [vendorsDisclosed](_iabtcf_core___api_documentation.tcmodel.md#vendorsdisclosed)

### Accessors

* [cmpId](_iabtcf_core___api_documentation.tcmodel.md#cmpid)
* [cmpVersion](_iabtcf_core___api_documentation.tcmodel.md#cmpversion)
* [consentLanguage](_iabtcf_core___api_documentation.tcmodel.md#consentlanguage)
* [consentScreen](_iabtcf_core___api_documentation.tcmodel.md#consentscreen)
* [created](_iabtcf_core___api_documentation.tcmodel.md#created)
* [gvl](_iabtcf_core___api_documentation.tcmodel.md#gvl)
* [isServiceSpecific](_iabtcf_core___api_documentation.tcmodel.md#isservicespecific)
* [lastUpdated](_iabtcf_core___api_documentation.tcmodel.md#lastupdated)
* [numCustomPurposes](_iabtcf_core___api_documentation.tcmodel.md#numcustompurposes)
* [policyVersion](_iabtcf_core___api_documentation.tcmodel.md#policyversion)
* [publisherCountryCode](_iabtcf_core___api_documentation.tcmodel.md#publishercountrycode)
* [purposeOneTreatment](_iabtcf_core___api_documentation.tcmodel.md#purposeonetreatment)
* [supportOOB](_iabtcf_core___api_documentation.tcmodel.md#supportoob)
* [useNonStandardStacks](_iabtcf_core___api_documentation.tcmodel.md#usenonstandardstacks)
* [vendorListVersion](_iabtcf_core___api_documentation.tcmodel.md#vendorlistversion)
* [version](_iabtcf_core___api_documentation.tcmodel.md#version)

### Methods

* [clone](_iabtcf_core___api_documentation.tcmodel.md#clone)
* [isValid](_iabtcf_core___api_documentation.tcmodel.md#isvalid)
* [setAll](_iabtcf_core___api_documentation.tcmodel.md#setall)
* [setAllPurposeConsents](_iabtcf_core___api_documentation.tcmodel.md#setallpurposeconsents)
* [setAllPurposeLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#setallpurposelegitimateinterest)
* [setAllSpecialFeatureOptIns](_iabtcf_core___api_documentation.tcmodel.md#setallspecialfeatureoptins)
* [setAllVendorConsents](_iabtcf_core___api_documentation.tcmodel.md#setallvendorconsents)
* [setAllVendorLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#setallvendorlegitimateinterest)
* [setAllVendorsDisclosed](_iabtcf_core___api_documentation.tcmodel.md#setallvendorsdisclosed)
* [unsetAll](_iabtcf_core___api_documentation.tcmodel.md#unsetall)
* [unsetAllPurposeConsents](_iabtcf_core___api_documentation.tcmodel.md#unsetallpurposeconsents)
* [unsetAllPurposeLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#unsetallpurposelegitimateinterest)
* [unsetAllSpecialFeatureOptIns](_iabtcf_core___api_documentation.tcmodel.md#unsetallspecialfeatureoptins)
* [unsetAllVendorConsents](_iabtcf_core___api_documentation.tcmodel.md#unsetallvendorconsents)
* [unsetAllVendorLegitimateInterest](_iabtcf_core___api_documentation.tcmodel.md#unsetallvendorlegitimateinterest)
* [unsetAllVendorsDisclosed](_iabtcf_core___api_documentation.tcmodel.md#unsetallvendorsdisclosed)
* [updated](_iabtcf_core___api_documentation.tcmodel.md#updated)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCModel**(gvl?: *[GVL](_iabtcf_core___api_documentation.gvl.md)*): [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[constructor](_iabtcf_core___api_documentation.cloneable.md#constructor)*

*Defined in [src/TCModel.ts:128](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L128)*

Constructs the TCModel. Passing a [GVL](_iabtcf_core___api_documentation.gvl.md) is optional when constructing as this TCModel may be constructed from decoding an existing encoded TCString.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](_iabtcf_core___api_documentation.gvl.md) |

**Returns:** [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

___

## Properties

<a id="consentlanguages"></a>

###  consentLanguages

**● consentLanguages**: *[ConsentLanguages](_iabtcf_core___api_documentation.consentlanguages.md)* =  new ConsentLanguages()

*Defined in [src/TCModel.ts:128](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L128)*

Set of available consent languages published by the IAB

___
<a id="custompurposes"></a>

###  customPurposes

**● customPurposes**: *[IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Purpose](../interfaces/_iabtcf_core___api_documentation.purpose.md)>*

*Defined in [src/TCModel.ts:77](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L77)*

set by a publisher if they wish to collect consent and LI Transparency for purposes outside of the TCF

___
<a id="publisherconsents"></a>

###  publisherConsents

**● publisherConsents**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[publisherConsents](../interfaces/_iabtcf_core___api_documentation.tcfields.md#publisherconsents)*

*Defined in [src/TCModel.ts:57](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L57)*

The user’s consent value for each Purpose established on the legal basis of consent, for the publisher. Purposes are published in the Global Vendor List.

___
<a id="publishercustomconsents"></a>

###  publisherCustomConsents

**● publisherCustomConsents**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[publisherCustomConsents](../interfaces/_iabtcf_core___api_documentation.tcfields.md#publishercustomconsents)*

*Defined in [src/TCModel.ts:84](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L84)*

The user’s consent value for each Purpose established on the legal basis of consent, for the publisher. Purposes are published in the Global Vendor List.

___
<a id="publishercustomlegitimateinterest"></a>

###  publisherCustomLegitimateInterest

**● publisherCustomLegitimateInterest**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[publisherCustomLegitimateInterest](../interfaces/_iabtcf_core___api_documentation.tcfields.md#publishercustomlegitimateinterest)*

*Defined in [src/TCModel.ts:91](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L91)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose that is established in the publisher's custom purposes.

___
<a id="publisherlegitimateinterest"></a>

###  publisherLegitimateInterest

**● publisherLegitimateInterest**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[publisherLegitimateInterest](../interfaces/_iabtcf_core___api_documentation.tcfields.md#publisherlegitimateinterest)*

*Defined in [src/TCModel.ts:71](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L71)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose.

___
<a id="publisherrestrictions"></a>

###  publisherRestrictions

**● publisherRestrictions**: *[PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)* =  new PurposeRestrictionVector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[publisherRestrictions](../interfaces/_iabtcf_core___api_documentation.tcfields.md#publisherrestrictions)*

*Defined in [src/TCModel.ts:123](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L123)*

___
<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[purposeConsents](../interfaces/_iabtcf_core___api_documentation.tcfields.md#purposeconsents)*

*Defined in [src/TCModel.ts:48](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L48)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](_iabtcf_core___api_documentation.gvl.md)).

___
<a id="purposelegitimateinterest"></a>

###  purposeLegitimateInterest

**● purposeLegitimateInterest**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[purposeLegitimateInterest](../interfaces/_iabtcf_core___api_documentation.tcfields.md#purposelegitimateinterest)*

*Defined in [src/TCModel.ts:64](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L64)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose.

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[specialFeatureOptIns](../interfaces/_iabtcf_core___api_documentation.tcfields.md#specialfeatureoptins)*

*Defined in [src/TCModel.ts:41](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L41)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="testmap"></a>

###  testMap

**● testMap**: *`Map`<`number`, `object`>* =  new Map<number, any>([[1, {yes: 'no'}], [2, 'two']])

*Defined in [src/TCModel.ts:50](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L50)*

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[vendorConsents](../interfaces/_iabtcf_core___api_documentation.tcfields.md#vendorconsents)*

*Defined in [src/TCModel.ts:97](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L97)*

Each [Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md) is keyed by id. Their consent value is true if it is in the Vector

___
<a id="vendorlegitimateinterest"></a>

###  vendorLegitimateInterest

**● vendorLegitimateInterest**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[vendorLegitimateInterest](../interfaces/_iabtcf_core___api_documentation.tcfields.md#vendorlegitimateinterest)*

*Defined in [src/TCModel.ts:104](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L104)*

Each [Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md) is keyed by id. Whether their Legitimate Interest Disclosures have been established is stored as boolean. see: [Vector](_iabtcf_core___api_documentation.vector.md)

___
<a id="vendorsallowed"></a>

###  vendorsAllowed

**● vendorsAllowed**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[vendorsAllowed](../interfaces/_iabtcf_core___api_documentation.tcfields.md#vendorsallowed)*

*Defined in [src/TCModel.ts:121](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L121)*

Signals which vendors the publisher permits to use OOB legal bases.

___
<a id="vendorsdisclosed"></a>

###  vendorsDisclosed

**● vendorsDisclosed**: *[Vector](_iabtcf_core___api_documentation.vector.md)* =  new Vector()

*Implementation of [TCFields](../interfaces/_iabtcf_core___api_documentation.tcfields.md).[vendorsDisclosed](../interfaces/_iabtcf_core___api_documentation.tcfields.md#vendorsdisclosed)*

*Defined in [src/TCModel.ts:116](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L116)*

The value included for disclosed vendors signals which vendors have been disclosed to the user in the interface surfaced by the CMP. This section content is required when writing a TC string to the global (consensu) scope. When a CMP has read from and is updating a TC string from the global consensu.org storage, the CMP MUST retain the existing disclosure information and only add information for vendors that it has disclosed that had not been disclosed by other CMPs in prior interactions with this device/user agent.

___

## Accessors

<a id="cmpid"></a>

###  cmpId

**get cmpId**(): `number` \| `string`

**set cmpId**(integer: *`number` \| `string`*): `void`

*Defined in [src/TCModel.ts:247](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L247)*

**Returns:** `number` \| `string`

*Defined in [src/TCModel.ts:233](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L233)*

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

*Defined in [src/TCModel.ts:275](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L275)*

Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

**Returns:** `number` \| `string`

*Defined in [src/TCModel.ts:262](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L262)*

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

*Defined in [src/TCModel.ts:338](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L338)*

**Returns:** `string`

*Defined in [src/TCModel.ts:317](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L317)*

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

*Defined in [src/TCModel.ts:304](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L304)*

The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)

**Returns:** `number` \| `string`

*Defined in [src/TCModel.ts:291](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L291)*

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

*Defined in [src/TCModel.ts:204](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L204)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`

*Defined in [src/TCModel.ts:198](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L198)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| date | `Date` |  This will be set automatically |

**Returns:** `void`

___
<a id="gvl"></a>

###  gvl

**get gvl**(): [GVL](_iabtcf_core___api_documentation.gvl.md)

**set gvl**(gvl: *[GVL](_iabtcf_core___api_documentation.gvl.md)*): `void`

*Defined in [src/TCModel.ts:187](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L187)*

sets the [GVL](_iabtcf_core___api_documentation.gvl.md) with side effects of also setting the `vendorListVersion`, `policyVersion`, and `consentLanguage`

**Returns:** [GVL](_iabtcf_core___api_documentation.gvl.md)
the gvl instance set on this TCModel instance

*Defined in [src/TCModel.ts:166](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L166)*

sets the [GVL](_iabtcf_core___api_documentation.gvl.md) with side effects of also setting the `vendorListVersion`, `policyVersion`, and `consentLanguage`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| gvl | [GVL](_iabtcf_core___api_documentation.gvl.md) |   |

**Returns:** `void`
the gvl instance set on this TCModel instance

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**get isServiceSpecific**(): `boolean`

**set isServiceSpecific**(bool: *`boolean`*): `void`

*Defined in [src/TCModel.ts:489](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L489)*

Whether the signals encoded in this TC String were from site-specific storage `true` versus ‘global’ consensu.org shared storage `false`. A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific `true`.

**Returns:** `boolean`

*Defined in [src/TCModel.ts:484](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L484)*

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

*Defined in [src/TCModel.ts:221](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L221)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`

*Defined in [src/TCModel.ts:215](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L215)*

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

*Defined in [src/TCModel.ts:772](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L772)*

**Returns:** `number`

*Defined in [src/TCModel.ts:785](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L785)*

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

*Defined in [src/TCModel.ts:439](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L439)*

From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

**Returns:** `number` \| `string`

*Defined in [src/TCModel.ts:426](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L426)*

From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.

If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.

*__throws__*: {TCModelError} if the value is not an integer greater than 1 as those are not valid.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` \| `string` |  You do not need to set this. This comes directly from the [GVL](_iabtcf_core___api_documentation.gvl.md). |

**Returns:** `void`

___
<a id="publishercountrycode"></a>

###  publisherCountryCode

**get publisherCountryCode**(): `string`

**set publisherCountryCode**(countryCode: *`string`*): `void`

*Defined in [src/TCModel.ts:364](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L364)*

**Returns:** `string`

*Defined in [src/TCModel.ts:351](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L351)*

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

*Defined in [src/TCModel.ts:549](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L549)*

`false` There is no special Purpose 1 status. Purpose 1 was disclosed normally (consent) as expected by Policy. `true` Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the publisher’s country of establishment to help Vendors determine whether the vendor requires Purpose 1 consent. In global scope TC strings, this field must always have a value of `false`. When a CMP encounters a global scope string with `purposeOneTreatment=true` then that string should be considered invalid and the CMP must re-establish transparency and consent.

**Returns:** `boolean`

*Defined in [src/TCModel.ts:544](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L544)*

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

*Defined in [src/TCModel.ts:526](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L526)*

Whether or not this publisher supports out-of-band legal basis default is `true`

**Returns:** `boolean`

*Defined in [src/TCModel.ts:521](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L521)*

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

*Defined in [src/TCModel.ts:509](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L509)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Returns:** `boolean`

*Defined in [src/TCModel.ts:504](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L504)*

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

*Defined in [src/TCModel.ts:406](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L406)*

Version of the GVL used to create this TCModel. Global Vendor List versions will be released periodically.

**Returns:** `number` \| `string`

*Defined in [src/TCModel.ts:378](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L378)*

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

*Defined in [src/TCModel.ts:467](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L467)*

Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

**Returns:** `number`

*Defined in [src/TCModel.ts:454](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L454)*

Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

*__throws__*: {TCModelError} if the value is not either 1 or 2

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |   |

**Returns:** `void`

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

*Inherited from [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[_clone](_iabtcf_core___api_documentation.cloneable.md#_clone)*

*Defined in [src/cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

___
<a id="clone"></a>

###  clone

▸ **clone**(): [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[clone](_iabtcf_core___api_documentation.cloneable.md#clone)*

*Defined in [src/TCModel.ts:156](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L156)*

Creates a clone of this TCModel

**Returns:** [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [src/TCModel.ts:856](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L856)*

isValid - returns whether all fields have a value

**Returns:** `boolean`

___
<a id="setall"></a>

###  setAll

▸ **setAll**(): `void`

*Defined in [src/TCModel.ts:738](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L738)*

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

*Defined in [src/TCModel.ts:662](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L662)*

setAllPurposeConsents - sets all purposes on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallpurposelegitimateinterest"></a>

###  setAllPurposeLegitimateInterest

▸ **setAllPurposeLegitimateInterest**(): `void`

*Defined in [src/TCModel.ts:685](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L685)*

setAllPurposeLegitimateInterest - sets all purposes on the GVL LI Transparency (true)

**Returns:** `void`

___
<a id="setallspecialfeatureoptins"></a>

###  setAllSpecialFeatureOptIns

▸ **setAllSpecialFeatureOptIns**(): `void`

*Defined in [src/TCModel.ts:708](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L708)*

setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="setallvendorconsents"></a>

###  setAllVendorConsents

▸ **setAllVendorConsents**(): `void`

*Defined in [src/TCModel.ts:593](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L593)*

setAllVendorConsents - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallvendorlegitimateinterest"></a>

###  setAllVendorLegitimateInterest

▸ **setAllVendorLegitimateInterest**(): `void`

*Defined in [src/TCModel.ts:639](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L639)*

setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)

**Returns:** `void`

___
<a id="setallvendorsdisclosed"></a>

###  setAllVendorsDisclosed

▸ **setAllVendorsDisclosed**(): `void`

*Defined in [src/TCModel.ts:616](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L616)*

setAllVendorsDisclosed - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="unsetall"></a>

###  unsetAll

▸ **unsetAll**(): `void`

*Defined in [src/TCModel.ts:761](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L761)*

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

*Defined in [src/TCModel.ts:674](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L674)*

unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallpurposelegitimateinterest"></a>

###  unsetAllPurposeLegitimateInterest

▸ **unsetAllPurposeLegitimateInterest**(): `void`

*Defined in [src/TCModel.ts:697](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L697)*

unsetAllPurposeLegitimateInterest - unsets all purposes on the GVL LI Transparency (false)

**Returns:** `void`

___
<a id="unsetallspecialfeatureoptins"></a>

###  unsetAllSpecialFeatureOptIns

▸ **unsetAllSpecialFeatureOptIns**(): `void`

*Defined in [src/TCModel.ts:720](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L720)*

unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="unsetallvendorconsents"></a>

###  unsetAllVendorConsents

▸ **unsetAllVendorConsents**(): `void`

*Defined in [src/TCModel.ts:605](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L605)*

unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallvendorlegitimateinterest"></a>

###  unsetAllVendorLegitimateInterest

▸ **unsetAllVendorLegitimateInterest**(): `void`

*Defined in [src/TCModel.ts:651](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L651)*

unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)

**Returns:** `void`

___
<a id="unsetallvendorsdisclosed"></a>

###  unsetAllVendorsDisclosed

▸ **unsetAllVendorsDisclosed**(): `void`

*Defined in [src/TCModel.ts:628](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L628)*

unsetAllVendorsDisclosed - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="updated"></a>

###  updated

▸ **updated**(): `void`

*Defined in [src/TCModel.ts:845](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L845)*

updated - updates the lastUpdatedDate with a 'now' timestamp

**Returns:** `void`

___

