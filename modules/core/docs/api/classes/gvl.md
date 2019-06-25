[@iabtcf/core - API Documentation](../README.md) > [GVL](../classes/gvl.md)

# Class: GVL

class with utilities for managing the global vendor list. Will use JSON to fetch the vendor list from specified url and will serialize it into this object and provide accessors. Provides ways to group vendors on the list by purpose and feature.

## Hierarchy

**GVL**

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
* [baseUrl](gvl.md#baseurl)
* [langTranslationFilename](gvl.md#langtranslationfilename)
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

*Defined in [GVL.ts:181](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L181)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` versionOrVendorList | [VersionOrVendorList](../#versionorvendorlist) |

**Returns:** [GVL](gvl.md)

___

## Properties

<a id="features"></a>

###  features

**● features**: *[GVLMap](../interfaces/gvlmap.md)<[Feature](../interfaces/feature.md)>*

*Defined in [GVL.ts:137](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L137)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Defined in [GVL.ts:99](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L99)*

*__param__*: schema version for the GVL that is used

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Defined in [GVL.ts:122](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L122)*

*__param__*: the date in which the vendor list json file was last updated.

___
<a id="purposes"></a>

###  purposes

**● purposes**: *[GVLMap](../interfaces/gvlmap.md)<[Purpose](../interfaces/purpose.md)>*

*Defined in [GVL.ts:127](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L127)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="readypromise"></a>

###  readyPromise

**● readyPromise**: *`Promise`<`void` \| [GVLError](gvlerror.md)>*

*Defined in [GVL.ts:94](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L94)*

*__param__*: when this GVL object is populated with the data or rejected if there is an error

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *[GVLMap](../interfaces/gvlmap.md)<[Feature](../interfaces/feature.md)>*

*Defined in [GVL.ts:142](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L142)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *[GVLMap](../interfaces/gvlmap.md)<[Purpose](../interfaces/purpose.md)>*

*Defined in [GVL.ts:132](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L132)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="stacks"></a>

###  stacks

**● stacks**: *[GVLMap](../interfaces/gvlmap.md)<[Stack](../interfaces/stack.md)>*

*Defined in [GVL.ts:177](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L177)*

*__param__*: collection of [Stack](../interfaces/stack.md)s

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Defined in [GVL.ts:116](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L116)*

*__param__*: The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Defined in [GVL.ts:104](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L104)*

*__param__*: with each published file change

___
<a id="baseurl"></a>

### `<Static>` baseUrl

**● baseUrl**: *`string`*

*Defined in [GVL.ts:47](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L47)*

*__static__*: 

*__param__*: the base url to load the vendor-list.json from. This is broken out from the filename because it follows a different scheme for latest file vs versioned files.

___
<a id="langtranslationfilename"></a>

### `<Static>` langTranslationFilename

**● langTranslationFilename**: *`string`* = "purposes-[LANG].json"

*Defined in [GVL.ts:88](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L88)*

*__param__*: Translations of the names and descriptions for Purposes, Special Purposes, Features, and Special Features to non-English languages are contained in a file where attributes containing English content (except vendor declaration information) are translated. The iab publishes one following the scheme below where the LANG is the iso639-1 language code. For a list of available translations [please go here](https://register.consensu.org/Translation).

eg.

```javascript
GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
GVL.langTranslationFilename = "purposes?getPurposes=[LANG]";
```

___
<a id="latestfilename"></a>

### `<Static>` latestFilename

**● latestFilename**: *`string`* = "vendor-list.json"

*Defined in [GVL.ts:54](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L54)*

*__static__*: 

*__param__*: the latest is assumed to be vendor-list.json because that is what the iab uses, but it could be different... if you want

___
<a id="versionedfilename"></a>

### `<Static>` versionedFilename

**● versionedFilename**: *`string`* = "archives/vendor-list-v[VERSION].json"

*Defined in [GVL.ts:71](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L71)*

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

*Defined in [GVL.ts:315](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L315)*

**Returns:** `string`

___
<a id="vendors"></a>

###  vendors

**get vendors**(): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:538](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L538)*

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___

## Methods

<a id="changelanguage"></a>

###  changeLanguage

▸ **changeLanguage**(lang: *`string`*): `Promise`<`void` \| [GVLError](gvlerror.md)>

*Defined in [GVL.ts:274](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L274)*

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

▸ **getVendorsWithConsentPurpose**(purposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:472](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L472)*

getVendorsWithConsentPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the consent purpose id

___
<a id="getvendorswithfeature"></a>

###  getVendorsWithFeature

▸ **getVendorsWithFeature**(featureId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:520](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L520)*

getVendorsWithFeature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| featureId | `number` |  \- |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the feature id

___
<a id="getvendorswithflexiblepurpose"></a>

###  getVendorsWithFlexiblePurpose

▸ **getVendorsWithFlexiblePurpose**(purposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:496](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L496)*

getVendorsWithFlexiblePurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the flexible purpose id

___
<a id="getvendorswithlegintpurpose"></a>

###  getVendorsWithLegIntPurpose

▸ **getVendorsWithLegIntPurpose**(purposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:484](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L484)*

getVendorsWithLegIntPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the legInt (Legitimate Interest) purpose id

___
<a id="getvendorswithspecialfeature"></a>

###  getVendorsWithSpecialFeature

▸ **getVendorsWithSpecialFeature**(specialFeatureId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:532](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L532)*

getVendorsWithSpecialFeature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| specialFeatureId | `number` |  \- |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the special feature id

___
<a id="getvendorswithspecialpurpose"></a>

###  getVendorsWithSpecialPurpose

▸ **getVendorsWithSpecialPurpose**(specialPurposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:508](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L508)*

getVendorsWithSpecialPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| specialPurposeId | `number` |  \- |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>
*   list of vendors that have declared the special purpose id

___
<a id="narrowvendorsto"></a>

###  narrowVendorsTo

▸ **narrowVendorsTo**(vendorIds: *`number`[]*): `void`

*Defined in [GVL.ts:550](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L550)*

narrowVendorsTo - narrows vendors represented in this GVL to the list of ids passed in

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| vendorIds | `number`[] |  list of ids to narrow this GVL to |

**Returns:** `void`

___

