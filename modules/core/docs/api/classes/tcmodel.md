[@iabtcf/core - API Documentation](../README.md) > [TCModel](../classes/tcmodel.md)

# Class: TCModel

## Hierarchy

**TCModel**

## Index

### Constructors

* [constructor](tcmodel.md#constructor)

### Properties

* [isServiceSpecific](tcmodel.md#isservicespecific)
* [publisherRestrictions](tcmodel.md#publisherrestrictions)
* [purposeConsents](tcmodel.md#purposeconsents)
* [purposeLITransparency](tcmodel.md#purposelitransparency)
* [specialFeatureOptIns](tcmodel.md#specialfeatureoptins)
* [useNonStandardStacks](tcmodel.md#usenonstandardstacks)
* [vendorConsents](tcmodel.md#vendorconsents)
* [vendorLegitimateInterest](tcmodel.md#vendorlegitimateinterest)

### Accessors

* [cmpId](tcmodel.md#cmpid)
* [cmpVersion](tcmodel.md#cmpversion)
* [consentLanguage](tcmodel.md#consentlanguage)
* [consentScreen](tcmodel.md#consentscreen)
* [created](tcmodel.md#created)
* [gvl](tcmodel.md#gvl)
* [lastUpdated](tcmodel.md#lastupdated)
* [policyVersion](tcmodel.md#policyversion)
* [vendorListVersion](tcmodel.md#vendorlistversion)
* [version](tcmodel.md#version)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCModel**(gvl?: *[GVL](gvl.md)*): [TCModel](tcmodel.md)

*Defined in [TCModel.ts:100](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L100)*

Constructs the TCModel. Passing a [GVL](gvl.md) is optional when constructing as this TCModel may be constructed from decoding an existing encoded TCString.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](gvl.md) |

**Returns:** [TCModel](tcmodel.md)

___

## Properties

<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *`boolean`* = false

*Defined in [TCModel.ts:27](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L27)*

Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False). A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).

___
<a id="publisherrestrictions"></a>

###  publisherRestrictions

**● publisherRestrictions**: *[Vector](vector.md)<[PurposeRestriction](purposerestriction.md)>*

*Defined in [TCModel.ts:100](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L100)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. The value stored is a [PurposeRestriction](purposerestriction.md) object.

```javascript
// to set
const purposeRestriction = new PurposeRestriction();
tcModel.vendorLegitimateInterest.set(2222, true);

// to get
const hasConsent = tcModel.vendorLegitimateInterest.get(2222);
```

___
<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[Vector](vector.md)<`boolean`>*

*Defined in [TCModel.ts:51](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L51)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](gvl.md)).

___
<a id="purposelitransparency"></a>

###  purposeLITransparency

**● purposeLITransparency**: *[Vector](vector.md)<`boolean`>*

*Defined in [TCModel.ts:58](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L58)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose, the corresponding bit for that purpose should be set to false.

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](vector.md)<`boolean`>* =  new Vector<boolean>()

*Defined in [TCModel.ts:44](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L44)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *`boolean`* = false

*Defined in [TCModel.ts:36](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L36)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](vector.md)<`boolean`>*

*Defined in [TCModel.ts:71](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L71)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Their consent value is stored as boolean.

```javascript
// to set
tcModel.vendorConsents.set(2222, true);

// to get
const hasConsent = tcModel.vendorConsents.get(2222);
```

___
<a id="vendorlegitimateinterest"></a>

###  vendorLegitimateInterest

**● vendorLegitimateInterest**: *[Vector](vector.md)<`boolean`>*

*Defined in [TCModel.ts:85](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L85)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Whether their Legitimate Interest Disclosures have been established is stored as boolean.

```javascript
// to set
tcModel.vendorLegitimateInterest.set(2222, true);

// to get
const hasConsent = tcModel.vendorLegitimateInterest.get(2222);
```

___

## Accessors

<a id="cmpid"></a>

###  cmpId

**get cmpId**(): `number`

**set cmpId**(integer: *`number`*): `void`

*Defined in [TCModel.ts:225](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L225)*

**Returns:** `number`
*   A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab.

*Defined in [TCModel.ts:206](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L206)*

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

*Defined in [TCModel.ts:254](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L254)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:235](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L235)*

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

*Defined in [TCModel.ts:330](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L330)*

**Returns:** `string`
*   lowercase [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented

*Defined in [TCModel.ts:297](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L297)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| lang | `string` |  lowercase [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented |

**Returns:** `void`

___
<a id="consentscreen"></a>

###  consentScreen

**get consentScreen**(): `number`

**set consentScreen**(integer: *`number`*): `void`

*Defined in [TCModel.ts:285](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L285)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:266](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L266)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| integer | `number` |  Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP. |

**Returns:** `void`

___
<a id="created"></a>

###  created

**get created**(): `Date`

**set created**(date: *`Date`*): `void`

*Defined in [TCModel.ts:173](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L173)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was created and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:163](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L163)*

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

*Defined in [TCModel.ts:150](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L150)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

**Returns:** [GVL](gvl.md)
the gvl instance set on this TCModel instance

*Defined in [TCModel.ts:125](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L125)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

*__throws__*: {TCModelError} if a gvl is already set on this TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| gvl | [GVL](gvl.md) |  may only be set once for this model. |

**Returns:** `void`
the gvl instance set on this TCModel instance

___
<a id="lastupdated"></a>

###  lastUpdated

**get lastUpdated**(): `Date`

**set lastUpdated**(date: *`Date`*): `void`

*Defined in [TCModel.ts:194](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L194)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was last updated and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:184](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L184)*

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

*Defined in [TCModel.ts:349](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L349)*

**Returns:** `number`
*   the policyVersion this TCModel is constructed with

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**get vendorListVersion**(): `number`

*Defined in [TCModel.ts:340](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L340)*

**Returns:** `number`
*   the global vendor list version this TCModel is constructed with

___
<a id="version"></a>

###  version

**get version**(): `number`

**set version**(num: *`number`*): `void`

*Defined in [TCModel.ts:369](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L369)*

**Returns:** `number`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

*Defined in [TCModel.ts:358](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/TCModel.ts#L358)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  indicates what version a TCString should be encoded as |

**Returns:** `void`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

___

