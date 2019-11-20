[@iabtcf/cmpapi - API Documentation](../README.md) > [TCDataBldr](../classes/tcdatabldr.md)

# Class: TCDataBldr

TCData response builder

## Hierarchy

 [ResponseBuilder](responsebuilder.md)

**↳ TCDataBldr**

↳  [InAppTCDataBldr](inapptcdatabldr.md)

## Implements

* [Response](../interfaces/response.md)
* [TCData](../interfaces/tcdata.md)

## Index

### Constructors

* [constructor](tcdatabldr.md#constructor)

### Properties

* [cmpId](tcdatabldr.md#cmpid)
* [cmpVersion](tcdatabldr.md#cmpversion)
* [eventStatus](tcdatabldr.md#eventstatus)
* [gdprApplies](tcdatabldr.md#gdprapplies)
* [isServiceSpecific](tcdatabldr.md#isservicespecific)
* [outOfBand](tcdatabldr.md#outofband)
* [publisher](tcdatabldr.md#publisher)
* [publisherCC](tcdatabldr.md#publishercc)
* [purpose](tcdatabldr.md#purpose)
* [purposeOneTreatment](tcdatabldr.md#purposeonetreatment)
* [specialFeatureOptins](tcdatabldr.md#specialfeatureoptins)
* [tcString](tcdatabldr.md#tcstring)
* [tcfPolicyVersion](tcdatabldr.md#tcfpolicyversion)
* [useNonStandardStacks](tcdatabldr.md#usenonstandardstacks)
* [vendor](tcdatabldr.md#vendor)

### Methods

* [buildResponse](tcdatabldr.md#buildresponse)
* [createRestrictions](tcdatabldr.md#createrestrictions)
* [createVectorField](tcdatabldr.md#createvectorfield)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCDataBldr**(tcModel: *`TCModel`*, eventStatus: *[EventStatus](../enums/eventstatus.md)*, _vendorIds?: *`number`[]*): [TCDataBldr](tcdatabldr.md)

*Defined in [command/responsebuilders/TCDataBldr.ts:50](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L50)*

Constructor to create a TCData object from a TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | `TCModel` |  \- |
| eventStatus | [EventStatus](../enums/eventstatus.md) |  is optional |
| `Optional` _vendorIds | `number`[] |  if not undefined, will be used to filter vendor ids |

**Returns:** [TCDataBldr](tcdatabldr.md)

___

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Implementation of [TCData](../interfaces/tcdata.md).[cmpId](../interfaces/tcdata.md#cmpid)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpId](responsebuilder.md#cmpid)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:9](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L9)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Implementation of [TCData](../interfaces/tcdata.md).[cmpVersion](../interfaces/tcdata.md#cmpversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpVersion](responsebuilder.md#cmpversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:10](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L10)*

___
<a id="eventstatus"></a>

###  eventStatus

**● eventStatus**: *`string`*

*Implementation of [TCData](../interfaces/tcdata.md).[eventStatus](../interfaces/tcdata.md#eventstatus)*

*Defined in [command/responsebuilders/TCDataBldr.ts:13](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L13)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [TCData](../interfaces/tcdata.md).[gdprApplies](../interfaces/tcdata.md#gdprapplies)*

*Inherited from [ResponseBuilder](responsebuilder.md).[gdprApplies](responsebuilder.md#gdprapplies)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:11](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L11)*

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [TCData](../interfaces/tcdata.md).[isServiceSpecific](../interfaces/tcdata.md#isservicespecific)*

*Defined in [command/responsebuilders/TCDataBldr.ts:14](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L14)*

___
<a id="outofband"></a>

###  outOfBand

**● outOfBand**: *`object` \| `undefined`*

*Implementation of [TCData](../interfaces/tcdata.md).[outOfBand](../interfaces/tcdata.md#outofband)*

*Defined in [command/responsebuilders/TCDataBldr.ts:20](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L20)*

___
<a id="publisher"></a>

###  publisher

**● publisher**: *`object`*

*Implementation of [TCData](../interfaces/tcdata.md).[publisher](../interfaces/tcdata.md#publisher)*

*Defined in [command/responsebuilders/TCDataBldr.ts:39](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L39)*

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

*Implementation of [TCData](../interfaces/tcdata.md).[publisherCC](../interfaces/tcdata.md#publishercc)*

*Defined in [command/responsebuilders/TCDataBldr.ts:16](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L16)*

___
<a id="purpose"></a>

###  purpose

**● purpose**: *`object`*

*Implementation of [TCData](../interfaces/tcdata.md).[purpose](../interfaces/tcdata.md#purpose)*

*Defined in [command/responsebuilders/TCDataBldr.ts:26](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L26)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md) \| `string`

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [TCData](../interfaces/tcdata.md).[purposeOneTreatment](../interfaces/tcdata.md#purposeonetreatment)*

*Defined in [command/responsebuilders/TCDataBldr.ts:17](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L17)*

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptins

**● specialFeatureOptins**: *[BooleanVector](../interfaces/booleanvector.md) \| `string`*

*Implementation of [TCData](../interfaces/tcdata.md).[specialFeatureOptins](../interfaces/tcdata.md#specialfeatureoptins)*

*Defined in [command/responsebuilders/TCDataBldr.ts:38](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L38)*

___
<a id="tcstring"></a>

###  tcString

**● tcString**: *`string`*

*Implementation of [TCData](../interfaces/tcdata.md).[tcString](../interfaces/tcdata.md#tcstring)*

*Defined in [command/responsebuilders/TCDataBldr.ts:12](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L12)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [TCData](../interfaces/tcdata.md).[tcfPolicyVersion](../interfaces/tcdata.md#tcfpolicyversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[tcfPolicyVersion](responsebuilder.md#tcfpolicyversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:12](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L12)*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [TCData](../interfaces/tcdata.md).[useNonStandardStacks](../interfaces/tcdata.md#usenonstandardstacks)*

*Defined in [command/responsebuilders/TCDataBldr.ts:15](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L15)*

___
<a id="vendor"></a>

###  vendor

**● vendor**: *`object`*

*Implementation of [TCData](../interfaces/tcdata.md).[vendor](../interfaces/tcdata.md#vendor)*

*Defined in [command/responsebuilders/TCDataBldr.ts:32](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L32)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md) \| `string`

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md) \| `string`

___

## Methods

<a id="buildresponse"></a>

###  buildResponse

▸ **buildResponse**(): `this`

*Inherited from [ResponseBuilder](responsebuilder.md).[buildResponse](responsebuilder.md#buildresponse)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:18](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L18)*

Returns this with fields only

**Returns:** `this`

___
<a id="createrestrictions"></a>

### `<Protected>` createRestrictions

▸ **createRestrictions**(tcModel: *`TCModel`*): [Restrictions](../interfaces/restrictions.md)

*Defined in [command/responsebuilders/TCDataBldr.ts:125](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L125)*

Creates a restrictions object given a TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | `TCModel` |  \- |

**Returns:** [Restrictions](../interfaces/restrictions.md)

___
<a id="createvectorfield"></a>

### `<Protected>` createVectorField

▸ **createVectorField**(ids: *`string`[]*, vector: *`Vector`*): [BooleanVector](../interfaces/booleanvector.md) \| `string`

*Defined in [command/responsebuilders/TCDataBldr.ts:151](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/responsebuilders/TCDataBldr.ts#L151)*

Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector Can be overwritten to return a string

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ids | `string`[] |  \- |
| vector | `Vector` |  \- |

**Returns:** [BooleanVector](../interfaces/booleanvector.md) \| `string`

___

