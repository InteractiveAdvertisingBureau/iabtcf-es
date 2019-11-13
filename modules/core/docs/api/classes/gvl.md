[@iabtcf/core - API Documentation](../README.md) > [GVL](../classes/gvl.md)

# Class: GVL

class with utilities for managing the global vendor list. Will use JSON to fetch the vendor list from specified url and will serialize it into this object and provide accessors. Provides ways to group vendors on the list by purpose and feature.

## Hierarchy

**GVL**

## Implements

* [VendorList](../interfaces/vendorlist.md)
* [Declarations](../interfaces/declarations.md)

## Index

### Constructors

* [constructor](gvl.md#constructor)

### Properties

* [features](gvl.md#features)
* [gvlSpecificationVersion](gvl.md#gvlspecificationversion)
* [lastUpdated](gvl.md#lastupdated)
* [purposes](gvl.md#purposes)
* [readyPromise](gvl.md#readypromise)
* [specialFeatures](gvl.md#specialfeatures)
* [specialPurposes](gvl.md#specialpurposes)
* [stacks](gvl.md#stacks)
* [tcfPolicyVersion](gvl.md#tcfpolicyversion)
* [vendorListVersion](gvl.md#vendorlistversion)
* [DEFAULT_LANGUAGE](gvl.md#default_language)
* [baseUrl](gvl.md#baseurl)
* [languageFilename](gvl.md#languagefilename)
* [latestFilename](gvl.md#latestfilename)
* [versionedFilename](gvl.md#versionedfilename)

### Accessors

* [language](gvl.md#language)
* [vendors](gvl.md#vendors)

### Methods

* [changeLanguage](gvl.md#changelanguage)
* [getVendorsWithConsentPurpose](gvl.md#getvendorswithconsentpurpose)
* [getVendorsWithFeature](gvl.md#getvendorswithfeature)
* [getVendorsWithFlexiblePurpose](gvl.md#getvendorswithflexiblepurpose)
* [getVendorsWithLegIntPurpose](gvl.md#getvendorswithlegintpurpose)
* [getVendorsWithSpecialFeature](gvl.md#getvendorswithspecialfeature)
* [getVendorsWithSpecialPurpose](gvl.md#getvendorswithspecialpurpose)
* [narrowVendorsTo](gvl.md#narrowvendorsto)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GVL**(versionOrVendorList?: *[VersionOrVendorList](../#versionorvendorlist)*): [GVL](gvl.md)

*Defined in [GVL.ts:183](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L183)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` versionOrVendorList | [VersionOrVendorList](../#versionorvendorlist) |

**Returns:** [GVL](gvl.md)

___

## Properties

<a id="features"></a>

###  features

**● features**: *[IntMap](../interfaces/intmap.md)<[Feature](../interfaces/feature.md)>*

*Implementation of [Declarations](../interfaces/declarations.md).[features](../interfaces/declarations.md#features)*

*Defined in [GVL.ts:136](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L136)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Implementation of [Declarations](../interfaces/declarations.md).[gvlSpecificationVersion](../interfaces/declarations.md#gvlspecificationversion)*

*Defined in [GVL.ts:98](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L98)*

*__param__*: schema version for the GVL that is used

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Implementation of [Declarations](../interfaces/declarations.md).[lastUpdated](../interfaces/declarations.md#lastupdated)*

*Defined in [GVL.ts:121](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L121)*

*__param__*: the date in which the vendor list json file was last updated.

___
<a id="purposes"></a>

###  purposes

**● purposes**: *[IntMap](../interfaces/intmap.md)<[Purpose](../interfaces/purpose.md)>*

*Implementation of [Declarations](../interfaces/declarations.md).[purposes](../interfaces/declarations.md#purposes)*

*Defined in [GVL.ts:126](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L126)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="readypromise"></a>

###  readyPromise

**● readyPromise**: *`Promise`<`void` \| [GVLError](gvlerror.md)>*

*Defined in [GVL.ts:93](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L93)*

*__param__*: when this GVL object is populated with the data or rejected if there is an error

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *[IntMap](../interfaces/intmap.md)<[Feature](../interfaces/feature.md)>*

*Implementation of [Declarations](../interfaces/declarations.md).[specialFeatures](../interfaces/declarations.md#specialfeatures)*

*Defined in [GVL.ts:141](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L141)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *[IntMap](../interfaces/intmap.md)<[Purpose](../interfaces/purpose.md)>*

*Implementation of [Declarations](../interfaces/declarations.md).[specialPurposes](../interfaces/declarations.md#specialpurposes)*

*Defined in [GVL.ts:131](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L131)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="stacks"></a>

###  stacks

**● stacks**: *[IntMap](../interfaces/intmap.md)<[Stack](../interfaces/stack.md)>*

*Implementation of [Declarations](../interfaces/declarations.md).[stacks](../interfaces/declarations.md#stacks)*

*Defined in [GVL.ts:176](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L176)*

*__param__*: collection of [Stack](../interfaces/stack.md)s

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [Declarations](../interfaces/declarations.md).[tcfPolicyVersion](../interfaces/declarations.md#tcfpolicyversion)*

*Defined in [GVL.ts:115](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L115)*

*__param__*: The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Implementation of [Declarations](../interfaces/declarations.md).[vendorListVersion](../interfaces/declarations.md#vendorlistversion)*

*Defined in [GVL.ts:103](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L103)*

*__param__*: with each published file change

___
<a id="default_language"></a>

### `<Static>` DEFAULT_LANGUAGE

**● DEFAULT_LANGUAGE**: *`string`* = "EN"

*Defined in [GVL.ts:39](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L39)*

___
<a id="baseurl"></a>

### `<Static>` baseUrl

**● baseUrl**: *`string`*

*Defined in [GVL.ts:47](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L47)*

*__static__*: 

*__param__*: the base url to load the vendor-list.json from. This is broken out from the filename because it follows a different scheme for latest file vs versioned files.

___
<a id="languagefilename"></a>

### `<Static>` languageFilename

**● languageFilename**: *`string`* = "purposes-[LANG].json"

*Defined in [GVL.ts:87](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L87)*

*__param__*: Translations of the names and descriptions for Purposes, Special Purposes, Features, and Special Features to non-English languages are contained in a file where attributes containing English content (except vendor declaration information) are translated. The iab publishes one following the scheme below where the LANG is the iso639-1 language code. For a list of available translations [please go here](https://register.consensu.org/Translation).

eg.

```javascript
GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
GVL.languageFilename = "purposes?getPurposes=[LANG]";
```

___
<a id="latestfilename"></a>

### `<Static>` latestFilename

**● latestFilename**: *`string`* = "vendor-list.json"

*Defined in [GVL.ts:54](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L54)*

*__static__*: 

*__param__*: the latest is assumed to be vendor-list.json because that is what the iab uses, but it could be different... if you want

___
<a id="versionedfilename"></a>

### `<Static>` versionedFilename

**● versionedFilename**: *`string`* = "archives/vendor-list-v[VERSION].json"

*Defined in [GVL.ts:70](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L70)*

*__static__*: 

*__param__*: the versioned name is assumed to be vendor-list-v\[VERSION\].json where \[VERSION\] will be replaced with the specified version. But it could be different... if you want just make sure to include the \[VERSION\] macro if you have a numbering scheme, it's a simple string substitution.

eg.

```javascript
GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
```

___

## Accessors

<a id="language"></a>

###  language

**get language**(): `string`

*Defined in [GVL.ts:365](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L365)*

**Returns:** `string`

___
<a id="vendors"></a>

###  vendors

**get vendors**(): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:601](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L601)*

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

___

## Methods

<a id="changelanguage"></a>

###  changeLanguage

▸ **changeLanguage**(lang: *`string`*): `Promise`<`void` \| [GVLError](gvlerror.md)>

*Defined in [GVL.ts:294](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L294)*

changeLanguage - retrieves the purpose language translation and sets the internal language variable

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| lang | `string` |  ISO 639-1 langauge code to change language to |

**Returns:** `Promise`<`void` \| [GVLError](gvlerror.md)>
*   returns the `readyPromise` and resolves when this GVL is populated with the data from the language file.

___
<a id="getvendorswithconsentpurpose"></a>

###  getVendorsWithConsentPurpose

▸ **getVendorsWithConsentPurpose**(purposeId: *`number`*): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:535](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L535)*

getVendorsWithConsentPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the consent purpose id

___
<a id="getvendorswithfeature"></a>

###  getVendorsWithFeature

▸ **getVendorsWithFeature**(featureId: *`number`*): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:583](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L583)*

getVendorsWithFeature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| featureId | `number` |  \- |

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the feature id

___
<a id="getvendorswithflexiblepurpose"></a>

###  getVendorsWithFlexiblePurpose

▸ **getVendorsWithFlexiblePurpose**(purposeId: *`number`*): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:559](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L559)*

getVendorsWithFlexiblePurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the flexible purpose id

___
<a id="getvendorswithlegintpurpose"></a>

###  getVendorsWithLegIntPurpose

▸ **getVendorsWithLegIntPurpose**(purposeId: *`number`*): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:547](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L547)*

getVendorsWithLegIntPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the legInt (Legitimate Interest) purpose id

___
<a id="getvendorswithspecialfeature"></a>

###  getVendorsWithSpecialFeature

▸ **getVendorsWithSpecialFeature**(specialFeatureId: *`number`*): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:595](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L595)*

getVendorsWithSpecialFeature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| specialFeatureId | `number` |  \- |

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the special feature id

___
<a id="getvendorswithspecialpurpose"></a>

###  getVendorsWithSpecialPurpose

▸ **getVendorsWithSpecialPurpose**(specialPurposeId: *`number`*): [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:571](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L571)*

getVendorsWithSpecialPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| specialPurposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/intmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the special purpose id

___
<a id="narrowvendorsto"></a>

###  narrowVendorsTo

▸ **narrowVendorsTo**(vendorIds: *`number`[]*): `void`

*Defined in [GVL.ts:613](https://github.com/chrispaterson/iabtcf/blob/ef31894/modules/core/src/GVL.ts#L613)*

narrowVendorsTo - narrows vendors represented in this GVL to the list of ids passed in

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| vendorIds | `number`[] |  list of ids to narrow this GVL to |

**Returns:** `void`

___

