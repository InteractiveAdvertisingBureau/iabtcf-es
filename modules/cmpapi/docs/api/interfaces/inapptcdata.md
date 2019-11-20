[@iabtcf/cmpapi - API Documentation](../README.md) > [InAppTCData](../interfaces/inapptcdata.md)

# Interface: InAppTCData

InAppTCData response model to be returned to TCF Api Command issuer

## Hierarchy

↳  [TCData](tcdata.md)

 [Response](response.md)

**↳ InAppTCData**

## Implemented by

* [InAppTCDataBldr](../classes/inapptcdatabldr.md)

## Index

### Properties

* [cmpId](inapptcdata.md#cmpid)
* [cmpVersion](inapptcdata.md#cmpversion)
* [eventStatus](inapptcdata.md#eventstatus)
* [gdprApplies](inapptcdata.md#gdprapplies)
* [isServiceSpecific](inapptcdata.md#isservicespecific)
* [outOfBand](inapptcdata.md#outofband)
* [publisher](inapptcdata.md#publisher)
* [publisherCC](inapptcdata.md#publishercc)
* [purpose](inapptcdata.md#purpose)
* [purposeOneTreatment](inapptcdata.md#purposeonetreatment)
* [specialFeatureOptins](inapptcdata.md#specialfeatureoptins)
* [tcString](inapptcdata.md#tcstring)
* [tcfPolicyVersion](inapptcdata.md#tcfpolicyversion)
* [useNonStandardStacks](inapptcdata.md#usenonstandardstacks)
* [vendor](inapptcdata.md#vendor)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Inherited from [Response](response.md).[cmpId](response.md#cmpid)*

*Overrides [Response](response.md).[cmpId](response.md#cmpid)*

*Defined in [model/responses/Response.ts:7](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L7)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Inherited from [Response](response.md).[cmpVersion](response.md#cmpversion)*

*Overrides [Response](response.md).[cmpVersion](response.md#cmpversion)*

*Defined in [model/responses/Response.ts:8](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L8)*

___
<a id="eventstatus"></a>

###  eventStatus

**● eventStatus**: *`string`*

*Inherited from [TCData](tcdata.md).[eventStatus](tcdata.md#eventstatus)*

*Defined in [model/responses/TCData.ts:11](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L11)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [Response](response.md).[gdprApplies](response.md#gdprapplies)*

*Overrides [Response](response.md).[gdprApplies](response.md#gdprapplies)*

*Defined in [model/responses/Response.ts:9](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L9)*

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [TCData](tcdata.md).[isServiceSpecific](tcdata.md#isservicespecific)*

*Defined in [model/responses/TCData.ts:12](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L12)*

___
<a id="outofband"></a>

###  outOfBand

**● outOfBand**: *`undefined`*

*Overrides [TCData](tcdata.md).[outOfBand](tcdata.md#outofband)*

*Defined in [model/responses/InAppTCData.ts:8](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/InAppTCData.ts#L8)*

___
<a id="publisher"></a>

###  publisher

**● publisher**: *`object`*

*Inherited from [TCData](tcdata.md).[publisher](tcdata.md#publisher)*

*Defined in [model/responses/TCData.ts:35](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L35)*

#### Type declaration

 consents: [BooleanVector](booleanvector.md) \| `string`

 customPurpose: `object`

 consents: [BooleanVector](booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](booleanvector.md) \| `string`

 restrictions: [Restrictions](restrictions.md)

___
<a id="publishercc"></a>

###  publisherCC

**● publisherCC**: *`string`*

*Inherited from [TCData](tcdata.md).[publisherCC](tcdata.md#publishercc)*

*Defined in [model/responses/TCData.ts:14](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L14)*

___
<a id="purpose"></a>

###  purpose

**● purpose**: *`object`*

*Inherited from [TCData](tcdata.md).[purpose](tcdata.md#purpose)*

*Defined in [model/responses/TCData.ts:22](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L22)*

#### Type declaration

 consents: [BooleanVector](booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](booleanvector.md) \| `string`

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [TCData](tcdata.md).[purposeOneTreatment](tcdata.md#purposeonetreatment)*

*Defined in [model/responses/TCData.ts:15](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L15)*

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptins

**● specialFeatureOptins**: *[BooleanVector](booleanvector.md) \| `string`*

*Inherited from [TCData](tcdata.md).[specialFeatureOptins](tcdata.md#specialfeatureoptins)*

*Defined in [model/responses/TCData.ts:34](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L34)*

___
<a id="tcstring"></a>

###  tcString

**● tcString**: *`string`*

*Inherited from [TCData](tcdata.md).[tcString](tcdata.md#tcstring)*

*Defined in [model/responses/TCData.ts:10](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L10)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Inherited from [Response](response.md).[tcfPolicyVersion](response.md#tcfpolicyversion)*

*Overrides [Response](response.md).[tcfPolicyVersion](response.md#tcfpolicyversion)*

*Defined in [model/responses/Response.ts:10](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L10)*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [TCData](tcdata.md).[useNonStandardStacks](tcdata.md#usenonstandardstacks)*

*Defined in [model/responses/TCData.ts:13](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L13)*

___
<a id="vendor"></a>

###  vendor

**● vendor**: *`object`*

*Inherited from [TCData](tcdata.md).[vendor](tcdata.md#vendor)*

*Defined in [model/responses/TCData.ts:28](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L28)*

#### Type declaration

 consents: [BooleanVector](booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](booleanvector.md) \| `string`

___

