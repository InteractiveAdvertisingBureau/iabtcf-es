[@iabtcf/cmpapi - API Documentation](../README.md) > [Ping](../classes/ping.md)

# Class: Ping

## Hierarchy

 [Return](return.md)

**↳ Ping**

## Index

### Properties

* [apiVersion](ping.md#apiversion)
* [cmpId](ping.md#cmpid)
* [cmpLoaded](ping.md#cmploaded)
* [cmpStatus](ping.md#cmpstatus)
* [cmpVersion](ping.md#cmpversion)
* [displayStatus](ping.md#displaystatus)
* [gdprApplies](ping.md#gdprapplies)
* [gvlVersion](ping.md#gvlversion)
* [tcfPolicyVersion](ping.md#tcfpolicyversion)

---

## Properties

<a id="apiversion"></a>

###  apiVersion

**● apiVersion**: *`string`*

*Defined in [model/Ping.ts:29](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Ping.ts#L29)*

version of the CMP API that is supported; e.g. “2”

___
<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Inherited from [Return](return.md).[cmpId](return.md#cmpid)*

*Defined in [model/Return.ts:5](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L5)*

___
<a id="cmploaded"></a>

###  cmpLoaded

**● cmpLoaded**: *`boolean`*

*Defined in [model/Ping.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Ping.ts#L14)*

true - CMP main script is loaded false - still running stub

___
<a id="cmpstatus"></a>

###  cmpStatus

**● cmpStatus**: *[CmpStatus](../enums/cmpstatus.md)*

*Defined in [model/Ping.ts:19](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Ping.ts#L19)*

see Ping Status Codes in following table

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Inherited from [Return](return.md).[cmpVersion](return.md#cmpversion)*

*Defined in [model/Return.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L6)*

___
<a id="displaystatus"></a>

###  displayStatus

**● displayStatus**: *[DisplayStatus](../enums/displaystatus.md)*

*Defined in [model/Ping.ts:24](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Ping.ts#L24)*

see Ping Status Codes in following table

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [Return](return.md).[gdprApplies](return.md#gdprapplies)*

*Defined in [model/Return.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L7)*

___
<a id="gvlversion"></a>

###  gvlVersion

**● gvlVersion**: *`number`*

*Defined in [model/Ping.ts:35](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Ping.ts#L35)*

Version of the GVL currently loaded by the CMP undefined if still the stub

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Inherited from [Return](return.md).[tcfPolicyVersion](return.md#tcfpolicyversion)*

*Defined in [model/Return.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L8)*

___

