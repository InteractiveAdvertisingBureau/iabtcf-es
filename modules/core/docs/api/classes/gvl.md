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
* [latestFilename](gvl.md#latestfilename)
* [versionedFilename](gvl.md#versionedfilename)

### Accessors

* [vendors](gvl.md#vendors)

### Methods

* [getVendorsWithConsentPurpose](gvl.md#getvendorswithconsentpurpose)
* [getVendorsWithFeature](gvl.md#getvendorswithfeature)
* [getVendorsWithFlexiblePurpose](gvl.md#getvendorswithflexiblepurpose)
* [getVendorsWithLegIntPurpose](gvl.md#getvendorswithlegintpurpose)
* [getVendorsWithSpecialFeature](gvl.md#getvendorswithspecialfeature)
* [setWhiteList](gvl.md#setwhitelist)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GVL**(versionOrObject?: *[VersionOrObject](../#versionorobject)*): [GVL](gvl.md)

*Defined in [GVL.ts:141](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L141)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` versionOrObject | [VersionOrObject](../#versionorobject) |

**Returns:** [GVL](gvl.md)

___

## Properties

<a id="features"></a>

###  features

**● features**: *[GVLMap](../interfaces/gvlmap.md)<[Feature](../interfaces/feature.md)>*

*Defined in [GVL.ts:106](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L106)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Defined in [GVL.ts:68](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L68)*

*__param__*: schema version for the GVL that is used

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Defined in [GVL.ts:91](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L91)*

*__param__*: the date in which the vendor list json file was last updated.

___
<a id="purposes"></a>

###  purposes

**● purposes**: *[GVLMap](../interfaces/gvlmap.md)<[Purpose](../interfaces/purpose.md)>*

*Defined in [GVL.ts:96](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L96)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="readypromise"></a>

###  readyPromise

**● readyPromise**: *`Promise`<`void` \| [GVLError](gvlerror.md)>*

*Defined in [GVL.ts:63](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L63)*

*__param__*: when this GVL object is populated with the data from the [GVLSchema](../interfaces/gvlschema.md) or rejected if there is an error

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *[GVLMap](../interfaces/gvlmap.md)<[Feature](../interfaces/feature.md)>*

*Defined in [GVL.ts:111](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L111)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *[GVLMap](../interfaces/gvlmap.md)<[Purpose](../interfaces/purpose.md)>*

*Defined in [GVL.ts:101](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L101)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="stacks"></a>

###  stacks

**● stacks**: *[GVLMap](../interfaces/gvlmap.md)<[Stack](../interfaces/stack.md)>*

*Defined in [GVL.ts:141](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L141)*

*__param__*: collection of [Stack](../interfaces/stack.md)s

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Defined in [GVL.ts:85](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L85)*

*__param__*: The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Defined in [GVL.ts:73](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L73)*

*__param__*: with each published file change

___
<a id="baseurl"></a>

### `<Static>` baseUrl

**● baseUrl**: *`string`*

*Defined in [GVL.ts:34](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L34)*

*__static__*: 

*__param__*: the base url to load the vendor-list.json from. This is broken out from the filename because it follows a different scheme for latest file vs versioned files.

___
<a id="latestfilename"></a>

### `<Static>` latestFilename

**● latestFilename**: *`string`* = "vendor-list.json"

*Defined in [GVL.ts:41](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L41)*

*__static__*: 

*__param__*: the latest is assumed to be vendor-list.json because that is what the iab uses, but it could be different... if you want

___
<a id="versionedfilename"></a>

### `<Static>` versionedFilename

**● versionedFilename**: *`string`* = "archives/vendor-list-v[VERSION].json"

*Defined in [GVL.ts:57](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L57)*

*__static__*: 

*__param__*: the versioned name is assumed to be vendor-list-v\[VERSION\].json where \[VERSION\] will be replaced with the specified version. But it could be different... if you want just make sure to include the \[VERSION\] macro if you have a numbering scheme, it's a simple string substitution.

eg.

```javascript
GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
```

___

## Accessors

<a id="vendors"></a>

###  vendors

**get vendors**(): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:363](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L363)*

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___

## Methods

<a id="getvendorswithconsentpurpose"></a>

###  getVendorsWithConsentPurpose

▸ **getVendorsWithConsentPurpose**(purposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:337](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L337)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeId | `number` |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___
<a id="getvendorswithfeature"></a>

###  getVendorsWithFeature

▸ **getVendorsWithFeature**(featureId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:352](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L352)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| featureId | `number` |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___
<a id="getvendorswithflexiblepurpose"></a>

###  getVendorsWithFlexiblePurpose

▸ **getVendorsWithFlexiblePurpose**(purposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:347](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L347)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeId | `number` |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___
<a id="getvendorswithlegintpurpose"></a>

###  getVendorsWithLegIntPurpose

▸ **getVendorsWithLegIntPurpose**(purposeId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:342](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L342)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeId | `number` |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___
<a id="getvendorswithspecialfeature"></a>

###  getVendorsWithSpecialFeature

▸ **getVendorsWithSpecialFeature**(featureId: *`number`*): [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

*Defined in [GVL.ts:357](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L357)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| featureId | `number` |

**Returns:** [GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>

___
<a id="setwhitelist"></a>

###  setWhiteList

▸ **setWhiteList**(ids: *`number`[]*): `void`

*Defined in [GVL.ts:369](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L369)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `number`[] |

**Returns:** `void`

___

