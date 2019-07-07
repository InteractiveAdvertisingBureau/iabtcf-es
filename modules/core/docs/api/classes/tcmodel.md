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
* [purposeRestrictions](tcmodel.md#purposerestrictions)
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

*Defined in [TCModel.ts:99](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L99)*

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

*Defined in [TCModel.ts:46](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L46)*

Renamed from `PurposesAllowed` in TCF v1.1 The user’s consent value for each Purpose established on the legal basis of consent. Purposes are published in the Global Vendor List (see. [GVL](gvl.md)).

___
<a id="purposelitransparency"></a>

###  purposeLITransparency

**● purposeLITransparency**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:53](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L53)*

The user’s permission for each Purpose established on the legal basis of legitimate interest. If the user has exercised right-to-object for a purpose, the corresponding bit for that purpose should be set to false.

___
<a id="purposerestrictions"></a>

###  purposeRestrictions

**● purposeRestrictions**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:99](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L99)*

TODO: add an event for when something is added because we need to force service specific if any purpose restrictions are created

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:39](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L39)*

The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[Vector](vector.md)* =  new Vector()

*Defined in [TCModel.ts:66](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L66)*

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

*Defined in [TCModel.ts:80](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L80)*

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

*Defined in [TCModel.ts:220](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L220)*

**Returns:** `number`
*   A unique ID will be assigned to each Consent Manager Provider (CMP) from the iab.

*Defined in [TCModel.ts:201](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L201)*

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

*Defined in [TCModel.ts:249](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L249)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:230](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L230)*

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

*Defined in [TCModel.ts:310](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L310)*

**Returns:** `string`
*   lowercase [two-letter ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which the CMP UI was presented

*Defined in [TCModel.ts:292](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L292)*

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

*Defined in [TCModel.ts:280](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L280)*

**Returns:** `number`
*   Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.

*Defined in [TCModel.ts:261](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L261)*

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

*Defined in [TCModel.ts:168](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L168)*

sets encoded created date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was created and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:158](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L158)*

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

*Defined in [TCModel.ts:145](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L145)*

sets the [GVL](gvl.md) with side effects of also setting the `vendorListVersion` and `policyVersion`

**Returns:** [GVL](gvl.md)
the gvl instance set on this TCModel instance

*Defined in [TCModel.ts:125](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L125)*

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

*Defined in [TCModel.ts:420](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L420)*

Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False). A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).

**Returns:** `boolean`
bool - value that was set

*Defined in [TCModel.ts:406](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L406)*

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

*Defined in [TCModel.ts:189](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L189)*

sets encoded last updated date. Will auto convert to deciseconds as the encoding requires

**Returns:** `Date`
*   date this TCModel was last updated and/or the string that this TCModel was decoded from.

*Defined in [TCModel.ts:179](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L179)*

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

*Defined in [TCModel.ts:363](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L363)*

**Returns:** `number`
*   the policyVersion this TCModel is constructed with

*Defined in [TCModel.ts:346](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L346)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  the policyVersion for this TCModel |

**Returns:** `void`
*   the policyVersion this TCModel is constructed with

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**get useNonStandardStacks**(): `boolean`

**set useNonStandardStacks**(bool: *`boolean`*): `void`

*Defined in [TCModel.ts:448](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L448)*

Non-standard stacks means that a CMP is using publisher-customized stack descriptions. Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.

**Returns:** `boolean`
bool - value that was set

*Defined in [TCModel.ts:434](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L434)*

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

*Defined in [TCModel.ts:337](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L337)*

**Returns:** `number`
*   the global vendor list version this TCModel is constructed with

*Defined in [TCModel.ts:319](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L319)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| num | `number` |  the global vendor list version for this TCModel |

**Returns:** `void`
*   the global vendor list version this TCModel is constructed with

___
<a id="version"></a>

###  version

**get version**(): `number`

**set version**(num: *`number`*): `void`

*Defined in [TCModel.ts:391](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L391)*

**Returns:** `number`
*   Incremented when TC String format changes. Indicates what encoding format the TCString will follow v1 or v2. v1 fields will omit fields.

*Defined in [TCModel.ts:372](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L372)*

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

*Defined in [TCModel.ts:710](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L710)*

isValid - returns whether all fields have a value

**Returns:** `boolean`

___
<a id="setall"></a>

###  setAll

▸ **setAll**(): `void`

*Defined in [TCModel.ts:648](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L648)*

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

*Defined in [TCModel.ts:576](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L576)*

setAllPurposeConsents - sets all purposes on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallpurposelitransparency"></a>

###  setAllPurposeLITransparency

▸ **setAllPurposeLITransparency**(): `void`

*Defined in [TCModel.ts:598](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L598)*

setAllPurposeLITransparency - sets all purposes on the GVL LI Transparency (true)

**Returns:** `void`

___
<a id="setallspecialfeatureoptins"></a>

###  setAllSpecialFeatureOptIns

▸ **setAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:620](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L620)*

setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="setallvendorconsents"></a>

###  setAllVendorConsents

▸ **setAllVendorConsents**(): `void`

*Defined in [TCModel.ts:532](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L532)*

setAllVendorConsents - sets all vendors on the GVL Consent (true)

**Returns:** `void`

___
<a id="setallvendorlegitimateinterest"></a>

###  setAllVendorLegitimateInterest

▸ **setAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:554](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L554)*

setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)

**Returns:** `void`

___
<a id="unsetall"></a>

###  unsetAll

▸ **unsetAll**(): `void`

*Defined in [TCModel.ts:669](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L669)*

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

*Defined in [TCModel.ts:587](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L587)*

unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallpurposelitransparency"></a>

###  unsetAllPurposeLITransparency

▸ **unsetAllPurposeLITransparency**(): `void`

*Defined in [TCModel.ts:609](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L609)*

unsetAllPurposeLITransparency - unsets all purposes on the GVL LI Transparency (false)

**Returns:** `void`

___
<a id="unsetallspecialfeatureoptins"></a>

###  unsetAllSpecialFeatureOptIns

▸ **unsetAllSpecialFeatureOptIns**(): `void`

*Defined in [TCModel.ts:631](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L631)*

unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)

**Returns:** `void`

___
<a id="unsetallvendorconsents"></a>

###  unsetAllVendorConsents

▸ **unsetAllVendorConsents**(): `void`

*Defined in [TCModel.ts:543](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L543)*

unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)

**Returns:** `void`

___
<a id="unsetallvendorlegitimateinterest"></a>

###  unsetAllVendorLegitimateInterest

▸ **unsetAllVendorLegitimateInterest**(): `void`

*Defined in [TCModel.ts:565](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L565)*

unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)

**Returns:** `void`

___
<a id="updated"></a>

###  updated

▸ **updated**(): `void`

*Defined in [TCModel.ts:698](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/TCModel.ts#L698)*

updated - updates the lastUpdatedDate with a 'now' timestamp

**Returns:** `void`

___

