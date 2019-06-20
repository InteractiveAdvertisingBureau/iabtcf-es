[@iabtcf/core - API Documentation](../README.md) > [TCModel](../classes/tcmodel.md)

# Class: TCModel

## Hierarchy

**TCModel**

## Index

### Constructors

* [constructor](tcmodel.md#constructor)

### Properties

* [purposeConsents](tcmodel.md#purposeconsents)
* [purposeLITransparency](tcmodel.md#purposelitransparency)
* [specialFeatureOptIns](tcmodel.md#specialfeatureoptins)
* [vendorConsents](tcmodel.md#vendorconsents)
* [vendorLegitimateInterest](tcmodel.md#vendorlegitimateinterest)
* [MAX_ENCODING_VERSION](tcmodel.md#max_encoding_version)

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
* [useNonStandardStacks](tcmodel.md#usenonstandardstacks)
* [vendorListVersion](tcmodel.md#vendorlistversion)
* [version](tcmodel.md#version)

### Methods

* [isValid](tcmodel.md#isvalid)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCModel**(gvl?: *[GVL](gvl.md)*): [TCModel](tcmodel.md)

*Defined in [TCModel.ts:69](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L69)*

Constructs the TCModel. Passing a [GVL](gvl.md) is optional when constructing as this TCModel may be constructed from decoding an existing encoded TCString.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](gvl.md) |

**Returns:** [TCModel](tcmodel.md)

___

## Properties

<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:35](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L35)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](gvl.md)).

___
<a id="purposelitransparency"></a>

###  purposeLITransparency

**● purposeLITransparency**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:42](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L42)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose, the corresponding bit for that purpose should be set to false.

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:28](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L28)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:55](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L55)*

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

**● vendorLegitimateInterest**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:69](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L69)*

Each [Vendor](../interfaces/vendor.md) is keyed by id. Whether their Legitimate Interest Disclosures have been established is stored as boolean.

```javascript
// to set
tcModel.vendorLegitimateInterest.set(2222, true);

// to get
const hasConsent = tcModel.vendorLegitimateInterest.get(2222);
```

___
<a id="max_encoding_version"></a>

### `<Static>` MAX_ENCODING_VERSION

**● MAX_ENCODING_VERSION**: *`number`* = 2

*Defined in [TCModel.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L8)*

___

## Accessors

<a id="cmpid"></a>

###  cmpId

**get cmpId**(): `number`

**set cmpId**(integer: *`number`*): `void`

*Defined in [TCModel.ts:205](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L205)*

**Returns:** `number`
*   A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab.

*Defined in [TCModel.ts:185](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L185)*

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

*Defined in [TCModel.ts:235](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L235)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:215](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L215)*

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

*Defined in [TCModel.ts:298](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L298)*

**Returns:** `string`
*   lowercase [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented

*Defined in [TCModel.ts:279](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L279)*

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

*Defined in [TCModel.ts:267](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L267)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:247](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L247)*

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

*Defined in [TCModel.ts:152](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L152)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was created and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:142](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L142)*

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

*Defined in [TCModel.ts:129](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L129)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

**Returns:** [GVL](gvl.md)
the gvl instance set on this TCModel instance

*Defined in [TCModel.ts:109](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L109)*

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

*Defined in [TCModel.ts:376](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L376)*

Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False). A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).

**Returns:** `boolean`
bool - value that was set

*Defined in [TCModel.ts:361](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L361)*

Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False). A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bool | `boolean` |  value to set |

**Returns:** `void`
bool - value that was set

___
<a id="lastupdated"></a>

###  lastUpdated

**get lastUpdated**(): `Date`

**set lastUpdated**(date: *`Date`*): `void`

*Defined in [TCModel.ts:173](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L173)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was last updated and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:163](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L163)*

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

*Defined in [TCModel.ts:317](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L317)*

**Returns:** `number`
*   the policyVersion this TCModel is constructed with

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**get useNonStandardStacks**(): `boolean`

**set useNonStandardStacks**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:405](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L405)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Returns:** `boolean`
bool - value that was set

*Defined in [TCModel.ts:390](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L390)*

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

*Defined in [TCModel.ts:308](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L308)*

**Returns:** `number`
*   the global vendor list version this TCModel is constructed with

___
<a id="version"></a>

###  version

**get version**(): `number`

**set version**(num: *`number`*): `void`

*Defined in [TCModel.ts:346](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L346)*

**Returns:** `number`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

*Defined in [TCModel.ts:326](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L326)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  indicates what version a TCString should be encoded as |

**Returns:** `void`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

___

## Methods

<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [TCModel.ts:442](https://github.com/chrispaterson/iabtcf-es/blob/8dedfba/modules/core/src/TCModel.ts#L442)*

isValid - returns whether all fields have a value

**Returns:** `boolean`

___

