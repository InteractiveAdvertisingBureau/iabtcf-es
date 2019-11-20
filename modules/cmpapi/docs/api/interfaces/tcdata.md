[@iabtcf/cmpapi - API Documentation](../README.md) > [TCData](../interfaces/tcdata.md)

# Interface: TCData

TCData response model to be returned to TCF Api Command issuer

## Hierarchy

 [Response](response.md)

**↳ TCData**

↳  [InAppTCData](inapptcdata.md)

## Implemented by

* [InAppTCDataBldr](../classes/inapptcdatabldr.md)
* [TCDataBldr](../classes/tcdatabldr.md)

## Index

### Properties

* [cmpId](tcdata.md#cmpid)
* [cmpVersion](tcdata.md#cmpversion)
* [eventStatus](tcdata.md#eventstatus)
* [gdprApplies](tcdata.md#gdprapplies)
* [isServiceSpecific](tcdata.md#isservicespecific)
* [outOfBand](tcdata.md#outofband)
* [publisher](tcdata.md#publisher)
* [publisherCC](tcdata.md#publishercc)
* [purpose](tcdata.md#purpose)
* [purposeOneTreatment](tcdata.md#purposeonetreatment)
* [specialFeatureOptins](tcdata.md#specialfeatureoptins)
* [tcString](tcdata.md#tcstring)
* [tcfPolicyVersion](tcdata.md#tcfpolicyversion)
* [useNonStandardStacks](tcdata.md#usenonstandardstacks)
* [vendor](tcdata.md#vendor)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Inherited from [Response](response.md).[cmpId](response.md#cmpid)*

*Defined in [model/responses/Response.ts:7](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L7)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Inherited from [Response](response.md).[cmpVersion](response.md#cmpversion)*

*Defined in [model/responses/Response.ts:8](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L8)*

___
<a id="eventstatus"></a>

###  eventStatus

**● eventStatus**: *`string`*

*Defined in [model/responses/TCData.ts:11](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L11)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [Response](response.md).[gdprApplies](response.md#gdprapplies)*

*Defined in [model/responses/Response.ts:9](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L9)*

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *`boolean` \| [BoolInt](../#boolint)*

*Defined in [model/responses/TCData.ts:12](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L12)*

___
<a id="outofband"></a>

###  outOfBand

**● outOfBand**: *`object` \| `undefined`*

*Defined in [model/responses/TCData.ts:16](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L16)*

___
<a id="publisher"></a>

###  publisher

**● publisher**: *`object`*

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

*Defined in [model/responses/TCData.ts:14](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L14)*

___
<a id="purpose"></a>

###  purpose

**● purpose**: *`object`*

*Defined in [model/responses/TCData.ts:22](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L22)*

#### Type declaration

 consents: [BooleanVector](booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](booleanvector.md) \| `string`

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *`boolean` \| [BoolInt](../#boolint)*

*Defined in [model/responses/TCData.ts:15](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L15)*

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptins

**● specialFeatureOptins**: *[BooleanVector](booleanvector.md) \| `string`*

*Defined in [model/responses/TCData.ts:34](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L34)*

___
<a id="tcstring"></a>

###  tcString

**● tcString**: *`string`*

*Defined in [model/responses/TCData.ts:10](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L10)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Inherited from [Response](response.md).[tcfPolicyVersion](response.md#tcfpolicyversion)*

*Defined in [model/responses/Response.ts:10](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/Response.ts#L10)*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *`boolean` \| [BoolInt](../#boolint)*

*Defined in [model/responses/TCData.ts:13](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L13)*

___
<a id="vendor"></a>

###  vendor

**● vendor**: *`object`*

*Defined in [model/responses/TCData.ts:28](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/model/responses/TCData.ts#L28)*

#### Type declaration

 consents: [BooleanVector](booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](booleanvector.md) \| `string`

___

