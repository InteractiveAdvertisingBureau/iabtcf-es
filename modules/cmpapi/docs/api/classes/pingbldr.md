[@iabtcf/cmpapi - API Documentation](../README.md) > [PingBldr](../classes/pingbldr.md)

# Class: PingBldr

Ping response builder

## Hierarchy

 [ResponseBuilder](responsebuilder.md)

**↳ PingBldr**

## Implements

* [Response](../interfaces/response.md)
* [Ping](../interfaces/ping.md)

## Index

### Properties

* [apiVersion](pingbldr.md#apiversion)
* [cmpId](pingbldr.md#cmpid)
* [cmpLoaded](pingbldr.md#cmploaded)
* [cmpStatus](pingbldr.md#cmpstatus)
* [cmpVersion](pingbldr.md#cmpversion)
* [displayStatus](pingbldr.md#displaystatus)
* [gdprApplies](pingbldr.md#gdprapplies)
* [gvlVersion](pingbldr.md#gvlversion)
* [tcfPolicyVersion](pingbldr.md#tcfpolicyversion)

### Methods

* [buildResponse](pingbldr.md#buildresponse)

---

## Properties

<a id="apiversion"></a>

###  apiVersion

**● apiVersion**: *`string`*

*Implementation of [Ping](../interfaces/ping.md).[apiVersion](../interfaces/ping.md#apiversion)*

*Defined in [command/responsebuilders/PingBldr.ts:29](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/PingBldr.ts#L29)*

version of the CMP API that is supported; e.g. “2”

___
<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Implementation of [Ping](../interfaces/ping.md).[cmpId](../interfaces/ping.md#cmpid)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpId](responsebuilder.md#cmpid)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L9)*

___
<a id="cmploaded"></a>

###  cmpLoaded

**● cmpLoaded**: *`boolean`*

*Implementation of [Ping](../interfaces/ping.md).[cmpLoaded](../interfaces/ping.md#cmploaded)*

*Defined in [command/responsebuilders/PingBldr.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/PingBldr.ts#L14)*

true - CMP main script is loaded false - still running stub

___
<a id="cmpstatus"></a>

###  cmpStatus

**● cmpStatus**: *[CmpStatus](../enums/cmpstatus.md)*

*Implementation of [Ping](../interfaces/ping.md).[cmpStatus](../interfaces/ping.md#cmpstatus)*

*Defined in [command/responsebuilders/PingBldr.ts:19](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/PingBldr.ts#L19)*

see Ping Status Codes in following table

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Implementation of [Ping](../interfaces/ping.md).[cmpVersion](../interfaces/ping.md#cmpversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[cmpVersion](responsebuilder.md#cmpversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L10)*

___
<a id="displaystatus"></a>

###  displayStatus

**● displayStatus**: *[DisplayStatus](../enums/displaystatus.md)*

*Implementation of [Ping](../interfaces/ping.md).[displayStatus](../interfaces/ping.md#displaystatus)*

*Defined in [command/responsebuilders/PingBldr.ts:24](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/PingBldr.ts#L24)*

see Ping Status Codes in following table

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Implementation of [Ping](../interfaces/ping.md).[gdprApplies](../interfaces/ping.md#gdprapplies)*

*Inherited from [ResponseBuilder](responsebuilder.md).[gdprApplies](responsebuilder.md#gdprapplies)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:11](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L11)*

___
<a id="gvlversion"></a>

###  gvlVersion

**● gvlVersion**: *`number`*

*Implementation of [Ping](../interfaces/ping.md).[gvlVersion](../interfaces/ping.md#gvlversion)*

*Defined in [command/responsebuilders/PingBldr.ts:35](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/PingBldr.ts#L35)*

Version of the GVL currently loaded by the CMP undefined if still the stub

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Implementation of [Ping](../interfaces/ping.md).[tcfPolicyVersion](../interfaces/ping.md#tcfpolicyversion)*

*Inherited from [ResponseBuilder](responsebuilder.md).[tcfPolicyVersion](responsebuilder.md#tcfpolicyversion)*

*Defined in [command/responsebuilders/ResponseBuilder.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/responsebuilders/ResponseBuilder.ts#L12)*

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

