[@iabtcf/core - API Documentation](../README.md) > [GVL](../classes/gvl.md)

# Class: GVL

TODO: consider alternate url schemes

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
* [speciaLFeatures](gvl.md#specialfeatures)
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

*Defined in [GVL.ts:102](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` versionOrObject | [VersionOrObject](../#versionorobject) |

**Returns:** [GVL](gvl.md)

___

## Properties

<a id="features"></a>

###  features

**● features**: *[Features](../interfaces/features.md)*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[features](../interfaces/gvlschema.md#features)*

*Defined in [GVL.ts:87](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L87)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[gvlSpecificationVersion](../interfaces/gvlschema.md#gvlspecificationversion)*

*Defined in [GVL.ts:53](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L53)*

*__param__*: schema version for the GVL that is used

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[lastUpdated](../interfaces/gvlschema.md#lastupdated)*

*Defined in [GVL.ts:72](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L72)*

___
<a id="purposes"></a>

###  purposes

**● purposes**: *[Purposes](../interfaces/purposes.md)*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[purposes](../interfaces/gvlschema.md#purposes)*

*Defined in [GVL.ts:77](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L77)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="readypromise"></a>

###  readyPromise

**● readyPromise**: *`Promise`<`void` \| [GVLError](gvlerror.md)>*

*Defined in [GVL.ts:48](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L48)*

*__param__*: when this GVL object is populated with the data from the [GVLSchema](../interfaces/gvlschema.md) or rejected if there is an error

___
<a id="specialfeatures"></a>

###  speciaLFeatures

**● speciaLFeatures**: *[SpecialFeatures](../interfaces/specialfeatures.md)*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[speciaLFeatures](../interfaces/gvlschema.md#specialfeatures)*

*Defined in [GVL.ts:92](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L92)*

*__param__*: collection of [Feature](../interfaces/feature.md)s

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *[SpecialPurposes](../interfaces/specialpurposes.md)*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[specialPurposes](../interfaces/gvlschema.md#specialpurposes)*

*Defined in [GVL.ts:82](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L82)*

*__param__*: collection of [Purpose](../interfaces/purpose.md)s

___
<a id="stacks"></a>

###  stacks

**● stacks**: *[Stacks](../interfaces/stacks.md)*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[stacks](../interfaces/gvlschema.md#stacks)*

*Defined in [GVL.ts:102](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L102)*

*__param__*: collection of [Stack](../interfaces/stack.md)s

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[tcfPolicyVersion](../interfaces/gvlschema.md#tcfpolicyversion)*

*Defined in [GVL.ts:70](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L70)*

*__param__*: The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[vendorListVersion](../interfaces/gvlschema.md#vendorlistversion)*

*Defined in [GVL.ts:58](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L58)*

*__param__*: with each published file change

___
<a id="vendors"></a>

###  vendors

**● vendors**: *[Vendors](../interfaces/vendors.md)*

*Implementation of [GVLSchema](../interfaces/gvlschema.md).[vendors](../interfaces/gvlschema.md#vendors)*

*Defined in [GVL.ts:97](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L97)*

*__param__*: collection of [Vendor](../interfaces/vendor.md)s

___
<a id="baseurl"></a>

### `<Static>` baseUrl

**● baseUrl**: *`string`*

*Defined in [GVL.ts:19](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L19)*

*__static__*: 

*__param__*: the base url to load the vendor-list.json from. This is broken out from the filename because it follows a different scheme for latest file vs versioned files.

___
<a id="latestfilename"></a>

### `<Static>` latestFilename

**● latestFilename**: *`string`* = "vendor-list.json"

*Defined in [GVL.ts:26](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L26)*

*__static__*: 

*__param__*: the latest is assumed to be vendor-list.json because that is what the iab uses, but it could be different... if you want

___
<a id="versionedfilename"></a>

### `<Static>` versionedFilename

**● versionedFilename**: *`string`* = "archives/vendor-list-v[VERSION].json"

*Defined in [GVL.ts:42](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/GVL.ts#L42)*

*__static__*: 

*__param__*: the versioned name is assumed to be vendor-list-v\[VERSION\].json where \[VERSION\] will be replaced with the specified version. But it could be different... if you want just make sure to include the \[VERSION\] macro if you have a numbering scheme, it's a simple string substitution.

eg.

```javascript
GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
```

___

