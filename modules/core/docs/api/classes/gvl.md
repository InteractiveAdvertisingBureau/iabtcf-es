[@iabtcf/core - API Documentation](../README.md) > [GVL](../classes/gvl.md)

# Class: GVL

TODO: Want a way to group vendors by keys, like purposes they use under legal basis

```
     * return all vendors who have purpose under [legalbasis]
```

TODO: way to pass in a whitelist of vendors

## Hierarchy

**GVL**

## Implements

* [GVLSchema](../interfaces/gvlschema.md)

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
* [vendors](gvl.md#vendors)
* [baseUrl](gvl.md#baseurl)
* [latestFilename](gvl.md#latestfilename)
* [versionedFilename](gvl.md#versionedfilename)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GVL**(versionOrObject?: *[VersionOrObject](../#versionorobject)*): [GVL](gvl.md)

*Defined in [GVL.ts:104](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L104)*

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

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[features](../interfaces/gvlschema.md#features)*

*Defined in [GVL.ts:89](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L89)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[gvlSpecificationVersion](../interfaces/gvlschema.md#gvlspecificationversion)*

*Defined in [GVL.ts:55](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L55)*

*__param__*: schema version for the GVL that is used

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[lastUpdated](../interfaces/gvlschema.md#lastupdated)*

*Defined in [GVL.ts:74](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L74)*

___
<a id="purposes"></a>

###  purposes

**● purposes**: *[GVLMap](../interfaces/gvlmap.md)<[Purpose](../interfaces/purpose.md)>*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[purposes](../interfaces/gvlschema.md#purposes)*

*Defined in [GVL.ts:79](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L79)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="readypromise"></a>

###  readyPromise

**● readyPromise**: *`Promise`<`void` \| [GVLError](gvlerror.md)>*

*Defined in [GVL.ts:50](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L50)*

*__param__*: when this GVL object is populated with the data from the [GVLSchema](../interfaces/gvlschema.md) or rejected if there is an error

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *[GVLMap](../interfaces/gvlmap.md)<[Feature](../interfaces/feature.md)>*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[specialFeatures](../interfaces/gvlschema.md#specialfeatures)*

*Defined in [GVL.ts:94](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L94)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *[GVLMap](../interfaces/gvlmap.md)<[Purpose](../interfaces/purpose.md)>*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[specialPurposes](../interfaces/gvlschema.md#specialpurposes)*

*Defined in [GVL.ts:84](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L84)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="stacks"></a>

###  stacks

**● stacks**: *[GVLMap](../interfaces/gvlmap.md)<[Stack](../interfaces/stack.md)>*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[stacks](../interfaces/gvlschema.md#stacks)*

*Defined in [GVL.ts:104](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L104)*

*__param__*: collection of [Stack](../interfaces/stack.md)s

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[tcfPolicyVersion](../interfaces/gvlschema.md#tcfpolicyversion)*

*Defined in [GVL.ts:72](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L72)*

*__param__*: The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[vendorListVersion](../interfaces/gvlschema.md#vendorlistversion)*

*Defined in [GVL.ts:60](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L60)*

*__param__*: with each published file change

___
<a id="vendors"></a>

###  vendors

**● vendors**: *[GVLMap](../interfaces/gvlmap.md)<[Vendor](../interfaces/vendor.md)>*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[vendors](../interfaces/gvlschema.md#vendors)*

*Defined in [GVL.ts:99](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L99)*

*__param__*: collection of [Vendor](../interfaces/vendor.md)s

___
<a id="baseurl"></a>

### `<Static>` baseUrl

**● baseUrl**: *`string`*

*Defined in [GVL.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L21)*

*__static__*: 

*__param__*: the base url to load the vendor-list.json from. This is broken out from the filename because it follows a different scheme for latest file vs versioned files.

___
<a id="latestfilename"></a>

### `<Static>` latestFilename

**● latestFilename**: *`string`* = "vendor-list.json"

*Defined in [GVL.ts:28](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L28)*

*__static__*: 

*__param__*: the latest is assumed to be vendor-list.json because that is what the iab uses, but it could be different... if you want

___
<a id="versionedfilename"></a>

### `<Static>` versionedFilename

**● versionedFilename**: *`string`* = "archives/vendor-list-v[VERSION].json"

*Defined in [GVL.ts:44](https://github.com/chrispaterson/iabtcf-es/blob/a3a6d97/modules/core/src/GVL.ts#L44)*

*__static__*: 

*__param__*: the versioned name is assumed to be vendor-list-v\[VERSION\].json where \[VERSION\] will be replaced with the specified version. But it could be different... if you want just make sure to include the \[VERSION\] macro if you have a numbering scheme, it's a simple string substitution.

eg.

```javascript
GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
```

___

