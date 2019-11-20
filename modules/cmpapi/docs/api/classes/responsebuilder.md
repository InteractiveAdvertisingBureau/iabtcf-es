[@iabtcf/cmpapi - API Documentation](../README.md) > [ResponseBuilder](../classes/responsebuilder.md)

# Class: ResponseBuilder

Base response class containing all basic required response data and common methods

## Hierarchy

**ResponseBuilder**

↳  [TCDataBldr](tcdatabldr.md)

↳  [PingBldr](pingbldr.md)

↳  [GlobalVendorListBldr](globalvendorlistbldr.md)

## Implements

* [Response](../interfaces/response.md)

## Index

### Properties

* [cmpId](responsebuilder.md#cmpid)
* [cmpVersion](responsebuilder.md#cmpversion)
* [gdprApplies](responsebuilder.md#gdprapplies)
* [tcfPolicyVersion](responsebuilder.md#tcfpolicyversion)

### Methods

* [buildResponse](responsebuilder.md#buildresponse)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Implementation of [Response](../interfaces/response.md).[cmpId](../interfaces/response.md#cmpid)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L9)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Implementation of [Response](../interfaces/response.md).[cmpVersion](../interfaces/response.md#cmpversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L10)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [Response](../interfaces/response.md).[gdprApplies](../interfaces/response.md#gdprapplies)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:11](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L11)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [Response](../interfaces/response.md).[tcfPolicyVersion](../interfaces/response.md#tcfpolicyversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L12)*

___

## Methods

<a id="buildresponse"></a>

###  buildResponse

▸ **buildResponse**(): `this`

*Defined in [command/responsebuilders/ResponseBuilder.ts:18](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L18)*

Returns this with fields only

**Returns:** `this`

___

