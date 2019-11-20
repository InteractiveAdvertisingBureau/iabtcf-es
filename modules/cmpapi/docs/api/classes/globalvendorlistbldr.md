[@iabtcf/cmpapi - API Documentation](../README.md) > [GlobalVendorListBldr](../classes/globalvendorlistbldr.md)

# Class: GlobalVendorListBldr

GlobalVendorList response builder

## Hierarchy

 [ResponseBuilder](responsebuilder.md)

**↳ GlobalVendorListBldr**

## Implements

* [Response](../interfaces/response.md)
* [GlobalVendorList](../interfaces/globalvendorlist.md)

## Index

### Constructors

* [constructor](globalvendorlistbldr.md#constructor)

### Properties

* [cmpId](globalvendorlistbldr.md#cmpid)
* [cmpVersion](globalvendorlistbldr.md#cmpversion)
* [features](globalvendorlistbldr.md#features)
* [gdprApplies](globalvendorlistbldr.md#gdprapplies)
* [gvlSpecificationVersion](globalvendorlistbldr.md#gvlspecificationversion)
* [lastUpdated](globalvendorlistbldr.md#lastupdated)
* [purposes](globalvendorlistbldr.md#purposes)
* [specialFeatures](globalvendorlistbldr.md#specialfeatures)
* [specialPurposes](globalvendorlistbldr.md#specialpurposes)
* [stacks](globalvendorlistbldr.md#stacks)
* [tcfPolicyVersion](globalvendorlistbldr.md#tcfpolicyversion)
* [vendorListVersion](globalvendorlistbldr.md#vendorlistversion)
* [vendors](globalvendorlistbldr.md#vendors)

### Methods

* [buildResponse](globalvendorlistbldr.md#buildresponse)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GlobalVendorListBldr**(gvl: *`GVL`*): [GlobalVendorListBldr](globalvendorlistbldr.md)

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:18](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| gvl | `GVL` |

**Returns:** [GlobalVendorListBldr](globalvendorlistbldr.md)

___

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[cmpId](../interfaces/globalvendorlist.md#cmpid)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpId](responsebuilder.md#cmpid)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L9)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[cmpVersion](../interfaces/globalvendorlist.md#cmpversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpVersion](responsebuilder.md#cmpversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L10)*

___
<a id="features"></a>

###  features

**● features**: *`IntMap`<`Feature`>*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[features](../interfaces/globalvendorlist.md#features)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:15](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L15)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[gdprApplies](../interfaces/globalvendorlist.md#gdprapplies)*

*Inherited from [ResponseBuilder](responsebuilder.md).[gdprApplies](responsebuilder.md#gdprapplies)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:11](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L11)*

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[gvlSpecificationVersion](../interfaces/globalvendorlist.md#gvlspecificationversion)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L10)*

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[lastUpdated](../interfaces/globalvendorlist.md#lastupdated)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L12)*

___
<a id="purposes"></a>

###  purposes

**● purposes**: *`IntMap`<`Purpose`>*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[purposes](../interfaces/globalvendorlist.md#purposes)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L13)*

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *`IntMap`<`Feature`>*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[specialFeatures](../interfaces/globalvendorlist.md#specialfeatures)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:16](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L16)*

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *`IntMap`<`Purpose`>*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[specialPurposes](../interfaces/globalvendorlist.md#specialpurposes)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L14)*

___
<a id="stacks"></a>

###  stacks

**● stacks**: *`IntMap`<`Stack`>*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[stacks](../interfaces/globalvendorlist.md#stacks)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:18](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L18)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[tcfPolicyVersion](../interfaces/globalvendorlist.md#tcfpolicyversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[tcfPolicyVersion](responsebuilder.md#tcfpolicyversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L12)*

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[vendorListVersion](../interfaces/globalvendorlist.md#vendorlistversion)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:11](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L11)*

___
<a id="vendors"></a>

###  vendors

**● vendors**: *`IntMap`<`Vendor`>*

*Implementation of [GlobalVendorList](../interfaces/globalvendorlist.md).[vendors](../interfaces/globalvendorlist.md#vendors)*

*Defined in [command/responsebuilders/GlobalVendorListBldr.ts:17](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/GlobalVendorListBldr.ts#L17)*

___

## Methods

<a id="buildresponse"></a>

###  buildResponse

▸ **buildResponse**(): `this`

*Inherited from [ResponseBuilder](responsebuilder.md).[buildResponse](responsebuilder.md#buildresponse)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:18](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L18)*

Returns this with fields only

**Returns:** `this`

___

