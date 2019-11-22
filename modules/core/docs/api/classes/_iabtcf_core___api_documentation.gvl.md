[@iabtcf/core - API Documentation](../README.md) > [GVL](../classes/_iabtcf_core___api_documentation.gvl.md)

# Class: GVL

class with utilities for managing the global vendor list. Will use JSON to fetch the vendor list from specified url and will serialize it into this object and provide accessors. Provides ways to group vendors on the list by purpose and feature.

## Hierarchy

 [Cloneable](_iabtcf_core___api_documentation.cloneable.md)<[GVL](_iabtcf_core___api_documentation.gvl.md)>

**↳ GVL**

## Implements

* [VendorList](../interfaces/_iabtcf_core___api_documentation.vendorlist.md)
* [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md)

## Index

### Constructors

* [constructor](_iabtcf_core___api_documentation.gvl.md#constructor)

### Properties

* [features](_iabtcf_core___api_documentation.gvl.md#features)
* [gvlSpecificationVersion](_iabtcf_core___api_documentation.gvl.md#gvlspecificationversion)
* [lastUpdated](_iabtcf_core___api_documentation.gvl.md#lastupdated)
* [purposes](_iabtcf_core___api_documentation.gvl.md#purposes)
* [readyPromise](_iabtcf_core___api_documentation.gvl.md#readypromise)
* [specialFeatures](_iabtcf_core___api_documentation.gvl.md#specialfeatures)
* [specialPurposes](_iabtcf_core___api_documentation.gvl.md#specialpurposes)
* [stacks](_iabtcf_core___api_documentation.gvl.md#stacks)
* [tcfPolicyVersion](_iabtcf_core___api_documentation.gvl.md#tcfpolicyversion)
* [vendorListVersion](_iabtcf_core___api_documentation.gvl.md#vendorlistversion)
* [DEFAULT_LANGUAGE](_iabtcf_core___api_documentation.gvl.md#default_language)
* [baseUrl](_iabtcf_core___api_documentation.gvl.md#baseurl)
* [languageFilename](_iabtcf_core___api_documentation.gvl.md#languagefilename)
* [latestFilename](_iabtcf_core___api_documentation.gvl.md#latestfilename)
* [versionedFilename](_iabtcf_core___api_documentation.gvl.md#versionedfilename)

### Accessors

* [language](_iabtcf_core___api_documentation.gvl.md#language)
* [vendors](_iabtcf_core___api_documentation.gvl.md#vendors)

### Methods

* [changeLanguage](_iabtcf_core___api_documentation.gvl.md#changelanguage)
* [clone](_iabtcf_core___api_documentation.gvl.md#clone)
* [emptyLanguageCache](_iabtcf_core___api_documentation.gvl.md#emptylanguagecache)
* [getVendorsWithConsentPurpose](_iabtcf_core___api_documentation.gvl.md#getvendorswithconsentpurpose)
* [getVendorsWithFeature](_iabtcf_core___api_documentation.gvl.md#getvendorswithfeature)
* [getVendorsWithFlexiblePurpose](_iabtcf_core___api_documentation.gvl.md#getvendorswithflexiblepurpose)
* [getVendorsWithLegIntPurpose](_iabtcf_core___api_documentation.gvl.md#getvendorswithlegintpurpose)
* [getVendorsWithSpecialFeature](_iabtcf_core___api_documentation.gvl.md#getvendorswithspecialfeature)
* [getVendorsWithSpecialPurpose](_iabtcf_core___api_documentation.gvl.md#getvendorswithspecialpurpose)
* [narrowVendorsTo](_iabtcf_core___api_documentation.gvl.md#narrowvendorsto)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GVL**(versionOrVendorList?: *[VersionOrVendorList](../#versionorvendorlist)*): [GVL](_iabtcf_core___api_documentation.gvl.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[constructor](_iabtcf_core___api_documentation.cloneable.md#constructor)*

*Defined in [src/GVL.ts:170](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L170)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` versionOrVendorList | [VersionOrVendorList](../#versionorvendorlist) |

**Returns:** [GVL](_iabtcf_core___api_documentation.gvl.md)

___

## Properties

<a id="features"></a>

###  features

**● features**: *[IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Feature](../interfaces/_iabtcf_core___api_documentation.feature.md)>*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[features](../interfaces/_iabtcf_core___api_documentation.declarations.md#features)*

*Defined in [src/GVL.ts:123](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L123)*

*__param__*: collection of [Feature](../interfaces/_iabtcf_core___api_documentation.feature.md)s

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[gvlSpecificationVersion](../interfaces/_iabtcf_core___api_documentation.declarations.md#gvlspecificationversion)*

*Defined in [src/GVL.ts:85](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L85)*

*__param__*: schema version for the GVL that is used

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[lastUpdated](../interfaces/_iabtcf_core___api_documentation.declarations.md#lastupdated)*

*Defined in [src/GVL.ts:108](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L108)*

*__param__*: the date in which the vendor list json file was last updated.

___
<a id="purposes"></a>

###  purposes

**● purposes**: *[IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Purpose](../interfaces/_iabtcf_core___api_documentation.purpose.md)>*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[purposes](../interfaces/_iabtcf_core___api_documentation.declarations.md#purposes)*

*Defined in [src/GVL.ts:113](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L113)*

*__param__*: collection of [Purpose](../interfaces/_iabtcf_core___api_documentation.purpose.md)s

___
<a id="readypromise"></a>

###  readyPromise

**● readyPromise**: *`Promise`<`void` \| [GVLError](_iabtcf_core___api_documentation.gvlerror.md)>*

*Defined in [src/GVL.ts:80](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L80)*

*__param__*: when this GVL object is populated with the data or rejected if there is an error

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *[IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Feature](../interfaces/_iabtcf_core___api_documentation.feature.md)>*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[specialFeatures](../interfaces/_iabtcf_core___api_documentation.declarations.md#specialfeatures)*

*Defined in [src/GVL.ts:128](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L128)*

*__param__*: collection of [Feature](../interfaces/_iabtcf_core___api_documentation.feature.md)s

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *[IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Purpose](../interfaces/_iabtcf_core___api_documentation.purpose.md)>*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[specialPurposes](../interfaces/_iabtcf_core___api_documentation.declarations.md#specialpurposes)*

*Defined in [src/GVL.ts:118](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L118)*

*__param__*: collection of [Purpose](../interfaces/_iabtcf_core___api_documentation.purpose.md)s

___
<a id="stacks"></a>

###  stacks

**● stacks**: *[IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Stack](../interfaces/_iabtcf_core___api_documentation.stack.md)>*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[stacks](../interfaces/_iabtcf_core___api_documentation.declarations.md#stacks)*

*Defined in [src/GVL.ts:163](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L163)*

*__param__*: collection of [Stack](../interfaces/_iabtcf_core___api_documentation.stack.md)s

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[tcfPolicyVersion](../interfaces/_iabtcf_core___api_documentation.declarations.md#tcfpolicyversion)*

*Defined in [src/GVL.ts:102](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L102)*

*__param__*: The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Implementation of [Declarations](../interfaces/_iabtcf_core___api_documentation.declarations.md).[vendorListVersion](../interfaces/_iabtcf_core___api_documentation.declarations.md#vendorlistversion)*

*Defined in [src/GVL.ts:90](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L90)*

*__param__*: with each published file change

___
<a id="default_language"></a>

### `<Static>` DEFAULT_LANGUAGE

**● DEFAULT_LANGUAGE**: *`string`* = "EN"

*Defined in [src/GVL.ts:26](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L26)*

___
<a id="baseurl"></a>

### `<Static>` baseUrl

**● baseUrl**: *`string`*

*Defined in [src/GVL.ts:34](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L34)*

*__static__*: 

*__param__*: the base url to load the vendor-list.json from. This is broken out from the filename because it follows a different scheme for latest file vs versioned files.

___
<a id="languagefilename"></a>

### `<Static>` languageFilename

**● languageFilename**: *`string`* = "purposes-[LANG].json"

*Defined in [src/GVL.ts:74](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L74)*

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

*Defined in [src/GVL.ts:41](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L41)*

*__static__*: 

*__param__*: the latest is assumed to be vendor-list.json because that is what the iab uses, but it could be different... if you want

___
<a id="versionedfilename"></a>

### `<Static>` versionedFilename

**● versionedFilename**: *`string`* = "archives/vendor-list-v[VERSION].json"

*Defined in [src/GVL.ts:57](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L57)*

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

*Defined in [src/GVL.ts:395](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L395)*

**Returns:** `string`

___
<a id="vendors"></a>

###  vendors

**get vendors**(): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:632](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L632)*

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [GVL](_iabtcf_core___api_documentation.gvl.md)

*Inherited from [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[_clone](_iabtcf_core___api_documentation.cloneable.md#_clone)*

*Defined in [src/cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [GVL](_iabtcf_core___api_documentation.gvl.md)

___
<a id="changelanguage"></a>

###  changeLanguage

▸ **changeLanguage**(lang: *`string`*): `Promise`<`void` \| [GVLError](_iabtcf_core___api_documentation.gvlerror.md)>

*Defined in [src/GVL.ts:321](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L321)*

changeLanguage - retrieves the purpose language translation and sets the internal language variable

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| lang | `string` |  ISO 639-1 langauge code to change language to |

**Returns:** `Promise`<`void` \| [GVLError](_iabtcf_core___api_documentation.gvlerror.md)>
*   returns the `readyPromise` and resolves when this GVL is populated with the data from the language file.

___
<a id="clone"></a>

###  clone

▸ **clone**(): [GVL](_iabtcf_core___api_documentation.gvl.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[clone](_iabtcf_core___api_documentation.cloneable.md#clone)*

*Defined in [src/GVL.ts:230](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L230)*

Creates a clone of this GVL

**Returns:** [GVL](_iabtcf_core___api_documentation.gvl.md)

___
<a id="emptylanguagecache"></a>

###  emptyLanguageCache

▸ **emptyLanguageCache**(lang?: *`undefined` \| `string`*): `boolean`

*Defined in [src/GVL.ts:244](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L244)*

emptyLanguageCache

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` lang | `undefined` \| `string` |

**Returns:** `boolean`
*   whether or not the item specified was in the cache and subsequently removed

___
<a id="getvendorswithconsentpurpose"></a>

###  getVendorsWithConsentPurpose

▸ **getVendorsWithConsentPurpose**(purposeId: *`number`*): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:566](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L566)*

getVendorsWithConsentPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>
*   list of vendors that have declared the consent purpose id

___
<a id="getvendorswithfeature"></a>

###  getVendorsWithFeature

▸ **getVendorsWithFeature**(featureId: *`number`*): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:614](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L614)*

getVendorsWithFeature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| featureId | `number` |  \- |

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>
*   list of vendors that have declared the feature id

___
<a id="getvendorswithflexiblepurpose"></a>

###  getVendorsWithFlexiblePurpose

▸ **getVendorsWithFlexiblePurpose**(purposeId: *`number`*): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:590](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L590)*

getVendorsWithFlexiblePurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>
*   list of vendors that have declared the flexible purpose id

___
<a id="getvendorswithlegintpurpose"></a>

###  getVendorsWithLegIntPurpose

▸ **getVendorsWithLegIntPurpose**(purposeId: *`number`*): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:578](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L578)*

getVendorsWithLegIntPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| purposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>
*   list of vendors that have declared the legInt (Legitimate Interest) purpose id

___
<a id="getvendorswithspecialfeature"></a>

###  getVendorsWithSpecialFeature

▸ **getVendorsWithSpecialFeature**(specialFeatureId: *`number`*): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:626](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L626)*

getVendorsWithSpecialFeature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| specialFeatureId | `number` |  \- |

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>
*   list of vendors that have declared the special feature id

___
<a id="getvendorswithspecialpurpose"></a>

###  getVendorsWithSpecialPurpose

▸ **getVendorsWithSpecialPurpose**(specialPurposeId: *`number`*): [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>

*Defined in [src/GVL.ts:602](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L602)*

getVendorsWithSpecialPurpose

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| specialPurposeId | `number` |  \- |

**Returns:** [IntMap](../interfaces/_iabtcf_core___api_documentation.intmap.md)<[Vendor](../interfaces/_iabtcf_core___api_documentation.vendor.md)>
*   list of vendors that have declared the special purpose id

___
<a id="narrowvendorsto"></a>

###  narrowVendorsTo

▸ **narrowVendorsTo**(vendorIds: *`number`[]*): `void`

*Defined in [src/GVL.ts:644](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L644)*

narrowVendorsTo - narrows vendors represented in this GVL to the list of ids passed in

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| vendorIds | `number`[] |  list of ids to narrow this GVL to |

**Returns:** `void`

___

