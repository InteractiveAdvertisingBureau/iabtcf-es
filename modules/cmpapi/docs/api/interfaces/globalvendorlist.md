[@iabtcf/cmpapi - API Documentation](../README.md) > [GlobalVendorList](../interfaces/globalvendorlist.md)

# Interface: GlobalVendorList

GlobalVendorList response model to be returned to TCF Api Command issuer

## Hierarchy

 `VendorList`

 `Declarations`

 [Response](response.md)

**↳ GlobalVendorList**

## Implemented by

* [GlobalVendorListBldr](../classes/globalvendorlistbldr.md)

## Index

### Properties

* [cmpId](globalvendorlist.md#cmpid)
* [cmpVersion](globalvendorlist.md#cmpversion)
* [features](globalvendorlist.md#features)
* [gdprApplies](globalvendorlist.md#gdprapplies)
* [gvlSpecificationVersion](globalvendorlist.md#gvlspecificationversion)
* [lastUpdated](globalvendorlist.md#lastupdated)
* [purposes](globalvendorlist.md#purposes)
* [specialFeatures](globalvendorlist.md#specialfeatures)
* [specialPurposes](globalvendorlist.md#specialpurposes)
* [stacks](globalvendorlist.md#stacks)
* [tcfPolicyVersion](globalvendorlist.md#tcfpolicyversion)
* [vendorListVersion](globalvendorlist.md#vendorlistversion)
* [vendors](globalvendorlist.md#vendors)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Inherited from [Response](response.md).[cmpId](response.md#cmpid)*

*Defined in [model/responses/Response.ts:7](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L7)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Inherited from [Response](response.md).[cmpVersion](response.md#cmpversion)*

*Defined in [model/responses/Response.ts:8](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L8)*

___
<a id="features"></a>

###  features

**● features**: *`IntMap`<`Feature`>*

*Inherited from Declarations.features*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:12*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [Response](response.md).[gdprApplies](response.md#gdprapplies)*

*Defined in [model/responses/Response.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L9)*

___
<a id="gvlspecificationversion"></a>

###  gvlSpecificationVersion

**● gvlSpecificationVersion**: *`number`*

*Inherited from Declarations.gvlSpecificationVersion*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:6*

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *`string` \| `Date`*

*Inherited from Declarations.lastUpdated*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:9*

___
<a id="purposes"></a>

###  purposes

**● purposes**: *`IntMap`<`Purpose`>*

*Inherited from Declarations.purposes*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:10*

___
<a id="specialfeatures"></a>

###  specialFeatures

**● specialFeatures**: *`IntMap`<`Feature`>*

*Inherited from Declarations.specialFeatures*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:13*

___
<a id="specialpurposes"></a>

###  specialPurposes

**● specialPurposes**: *`IntMap`<`Purpose`>*

*Inherited from Declarations.specialPurposes*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:11*

___
<a id="stacks"></a>

###  stacks

**● stacks**: *`IntMap`<`Stack`>*

*Inherited from Declarations.stacks*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:14*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Inherited from Declarations.tcfPolicyVersion*

*Overrides [Response](response.md).[tcfPolicyVersion](response.md#tcfpolicyversion)*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:8*

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *`number`*

*Inherited from Declarations.vendorListVersion*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/Declarations.d.ts:7*

___
<a id="vendors"></a>

###  vendors

**● vendors**: *`IntMap`<`Vendor`>*

*Inherited from VendorList.vendors*

*Defined in /Users/cpaterson/projects/iab/iabtcf/modules/cmpapi/node_modules/@iabtcf/core/lib/model/gvl/VendorList.d.ts:4*

___

