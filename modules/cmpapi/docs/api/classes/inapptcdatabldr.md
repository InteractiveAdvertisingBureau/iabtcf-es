[@iabtcf/cmpapi - API Documentation](../README.md) > [InAppTCDataBldr](../classes/inapptcdatabldr.md)

# Class: InAppTCDataBldr

InAppTCData response builder

## Hierarchy

↳  [TCDataBldr](tcdatabldr.md)

**↳ InAppTCDataBldr**

## Implements

* [Response](../interfaces/response.md)
* [TCData](../interfaces/tcdata.md)
* [InAppTCData](../interfaces/inapptcdata.md)

## Index

### Constructors

* [constructor](inapptcdatabldr.md#constructor)

### Properties

* [cmpId](inapptcdatabldr.md#cmpid)
* [cmpVersion](inapptcdatabldr.md#cmpversion)
* [eventStatus](inapptcdatabldr.md#eventstatus)
* [gdprApplies](inapptcdatabldr.md#gdprapplies)
* [isServiceSpecific](inapptcdatabldr.md#isservicespecific)
* [outOfBand](inapptcdatabldr.md#outofband)
* [publisher](inapptcdatabldr.md#publisher)
* [publisherCC](inapptcdatabldr.md#publishercc)
* [purpose](inapptcdatabldr.md#purpose)
* [purposeOneTreatment](inapptcdatabldr.md#purposeonetreatment)
* [specialFeatureOptins](inapptcdatabldr.md#specialfeatureoptins)
* [tcString](inapptcdatabldr.md#tcstring)
* [tcfPolicyVersion](inapptcdatabldr.md#tcfpolicyversion)
* [useNonStandardStacks](inapptcdatabldr.md#usenonstandardstacks)
* [vendor](inapptcdatabldr.md#vendor)

### Methods

* [buildResponse](inapptcdatabldr.md#buildresponse)
* [createBitFieldString](inapptcdatabldr.md#createbitfieldstring)
* [createRestrictions](inapptcdatabldr.md#createrestrictions)
* [createVectorField](inapptcdatabldr.md#createvectorfield)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new InAppTCDataBldr**(tcModel: *`TCModel`*, eventStatus: *[EventStatus](../enums/eventstatus.md)*, vendorIds: *`number`[]*): [InAppTCDataBldr](inapptcdatabldr.md)

*Overrides [TCDataBldr](tcdatabldr.md).[constructor](tcdatabldr.md#constructor)*

*Defined in [command/responsebuilders/InAppTCDataBldr.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/InAppTCDataBldr.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tcModel | `TCModel` |
| eventStatus | [EventStatus](../enums/eventstatus.md) |
| vendorIds | `number`[] |

**Returns:** [InAppTCDataBldr](inapptcdatabldr.md)

___

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[cmpId](../interfaces/inapptcdata.md#cmpid)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpId](responsebuilder.md#cmpid)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L9)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[cmpVersion](../interfaces/inapptcdata.md#cmpversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpVersion](responsebuilder.md#cmpversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L10)*

___
<a id="eventstatus"></a>

###  eventStatus

**● eventStatus**: *`string`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[eventStatus](../interfaces/inapptcdata.md#eventstatus)*

*Inherited from [TCDataBldr](tcdatabldr.md).[eventStatus](tcdatabldr.md#eventstatus)*

*Defined in [command/responsebuilders/TCDataBldr.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L13)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[gdprApplies](../interfaces/inapptcdata.md#gdprapplies)*

*Inherited from [ResponseBuilder](responsebuilder.md).[gdprApplies](responsebuilder.md#gdprapplies)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:11](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L11)*

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[isServiceSpecific](../interfaces/inapptcdata.md#isservicespecific)*

*Inherited from [TCDataBldr](tcdatabldr.md).[isServiceSpecific](tcdatabldr.md#isservicespecific)*

*Defined in [command/responsebuilders/TCDataBldr.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L14)*

___
<a id="outofband"></a>

###  outOfBand

**● outOfBand**: *`undefined`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[outOfBand](../interfaces/inapptcdata.md#outofband)*

*Overrides [TCDataBldr](tcdatabldr.md).[outOfBand](tcdatabldr.md#outofband)*

*Defined in [command/responsebuilders/InAppTCDataBldr.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/InAppTCDataBldr.ts#L12)*

___
<a id="publisher"></a>

###  publisher

**● publisher**: *`object`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[publisher](../interfaces/inapptcdata.md#publisher)*

*Inherited from [TCDataBldr](tcdatabldr.md).[publisher](tcdatabldr.md#publisher)*

*Defined in [command/responsebuilders/TCDataBldr.ts:39](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L39)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 customPurpose: `object`

 consents: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 restrictions: [Restrictions](../interfaces/restrictions.md)

___
<a id="publishercc"></a>

###  publisherCC

**● publisherCC**: *`string`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[publisherCC](../interfaces/inapptcdata.md#publishercc)*

*Inherited from [TCDataBldr](tcdatabldr.md).[publisherCC](tcdatabldr.md#publishercc)*

*Defined in [command/responsebuilders/TCDataBldr.ts:16](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L16)*

___
<a id="purpose"></a>

###  purpose

**● purpose**: *`object`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[purpose](../interfaces/inapptcdata.md#purpose)*

*Inherited from [TCDataBldr](tcdatabldr.md).[purpose](tcdatabldr.md#purpose)*

*Defined in [command/responsebuilders/TCDataBldr.ts:26](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L26)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md) \| `string`

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[purposeOneTreatment](../interfaces/inapptcdata.md#purposeonetreatment)*

*Inherited from [TCDataBldr](tcdatabldr.md).[purposeOneTreatment](tcdatabldr.md#purposeonetreatment)*

*Defined in [command/responsebuilders/TCDataBldr.ts:17](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L17)*

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptins

**● specialFeatureOptins**: *[BooleanVector](../interfaces/booleanvector.md) \| `string`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[specialFeatureOptins](../interfaces/inapptcdata.md#specialfeatureoptins)*

*Inherited from [TCDataBldr](tcdatabldr.md).[specialFeatureOptins](tcdatabldr.md#specialfeatureoptins)*

*Defined in [command/responsebuilders/TCDataBldr.ts:38](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L38)*

___
<a id="tcstring"></a>

###  tcString

**● tcString**: *`string`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[tcString](../interfaces/inapptcdata.md#tcstring)*

*Inherited from [TCDataBldr](tcdatabldr.md).[tcString](tcdatabldr.md#tcstring)*

*Defined in [command/responsebuilders/TCDataBldr.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L12)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[tcfPolicyVersion](../interfaces/inapptcdata.md#tcfpolicyversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[tcfPolicyVersion](responsebuilder.md#tcfpolicyversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L12)*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[useNonStandardStacks](../interfaces/inapptcdata.md#usenonstandardstacks)*

*Inherited from [TCDataBldr](tcdatabldr.md).[useNonStandardStacks](tcdatabldr.md#usenonstandardstacks)*

*Defined in [command/responsebuilders/TCDataBldr.ts:15](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L15)*

___
<a id="vendor"></a>

###  vendor

**● vendor**: *`object`*

*Implementation of [InAppTCData](../interfaces/inapptcdata.md).[vendor](../interfaces/inapptcdata.md#vendor)*

*Inherited from [TCDataBldr](tcdatabldr.md).[vendor](tcdatabldr.md#vendor)*

*Defined in [command/responsebuilders/TCDataBldr.ts:32](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L32)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md) \| `string`

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
<a id="createbitfieldstring"></a>

### `<Protected>` createBitFieldString

▸ **createBitFieldString**(ids: *`string`[]*, vector: *`Vector`*): `string`

*Defined in [command/responsebuilders/InAppTCDataBldr.ts:44](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/InAppTCDataBldr.ts#L44)*

Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ids | `string`[] |  \- |
| vector | `Vector` |  \- |

**Returns:** `string`

___
<a id="createrestrictions"></a>

### `<Protected>` createRestrictions

▸ **createRestrictions**(tcModel: *`TCModel`*): [Restrictions](../interfaces/restrictions.md)

*Overrides [TCDataBldr](tcdatabldr.md).[createRestrictions](tcdatabldr.md#createrestrictions)*

*Defined in [command/responsebuilders/InAppTCDataBldr.ts:56](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/InAppTCDataBldr.ts#L56)*

Creates a restrictions object given a TCModel

*__override__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | `TCModel` |  \- |

**Returns:** [Restrictions](../interfaces/restrictions.md)

___
<a id="createvectorfield"></a>

### `<Protected>` createVectorField

▸ **createVectorField**(ids: *`string`[]*, vector: *`Vector`*): [BooleanVector](../interfaces/booleanvector.md) \| `string`

*Overrides [TCDataBldr](tcdatabldr.md).[createVectorField](tcdatabldr.md#createvectorfield)*

*Defined in [command/responsebuilders/InAppTCDataBldr.ts:32](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/InAppTCDataBldr.ts#L32)*

Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector

*__override__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ids | `string`[] |  \- |
| vector | `Vector` |  \- |

**Returns:** [BooleanVector](../interfaces/booleanvector.md) \| `string`

___

