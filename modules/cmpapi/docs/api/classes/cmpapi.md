[@iabtcf/cmpapi - API Documentation](../README.md) > [CmpApi](../classes/cmpapi.md)

# Class: CmpApi

Consent Management Platform API

This is the only class that the CMP should create and interface with to set data for commands to utilize.

## Hierarchy

**CmpApi**

## Index

### Constructors

* [constructor](cmpapi.md#constructor)

### Methods

* [setCmpStatus](cmpapi.md#setcmpstatus)
* [setDisplayStatus](cmpapi.md#setdisplaystatus)
* [setGdprApplies](cmpapi.md#setgdprapplies)
* [setTCModel](cmpapi.md#settcmodel)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CmpApi**(cmpId: *`number`*, cmpVersion: *`number`*, customCommands?: *[CustomCommandRegistration](../interfaces/customcommandregistration.md)[]*): [CmpApi](cmpapi.md)

*Defined in [CmpApi.ts:21](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/CmpApi.ts#L21)*

Constructor

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| cmpId | `number` | - |  \- |
| cmpVersion | `number` | - |  \- |
| `Default value` customCommands | [CustomCommandRegistration](../interfaces/customcommandregistration.md)[] |  [] |   |

**Returns:** [CmpApi](cmpapi.md)

___

## Methods

<a id="setcmpstatus"></a>

###  setCmpStatus

▸ **setCmpStatus**(cmpStatus: *[CmpStatus](../enums/cmpstatus.md)*): `void`

*Defined in [CmpApi.ts:63](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/CmpApi.ts#L63)*

Sets the current status of the cmp

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| cmpStatus | [CmpStatus](../enums/cmpstatus.md) |   |

**Returns:** `void`

___
<a id="setdisplaystatus"></a>

###  setDisplayStatus

▸ **setDisplayStatus**(displayStatus: *[DisplayStatus](../enums/displaystatus.md)*): `void`

*Defined in [CmpApi.ts:73](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/CmpApi.ts#L73)*

Sets the current display status

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| displayStatus | [DisplayStatus](../enums/displaystatus.md) |   |

**Returns:** `void`

___
<a id="setgdprapplies"></a>

###  setGdprApplies

▸ **setGdprApplies**(applies: *`boolean`*): `void`

*Defined in [CmpApi.ts:53](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/CmpApi.ts#L53)*

Sets the value for GDPR Applies

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| applies | `boolean` |   |

**Returns:** `void`

___
<a id="settcmodel"></a>

###  setTCModel

▸ **setTCModel**(tcModel: *`TCModel`*, eventStatus?: *[EventStatus](../enums/eventstatus.md)*): `void`

*Defined in [CmpApi.ts:43](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/CmpApi.ts#L43)*

Sets the TCModel Note: A clone will be used if the cloneable interface was implemented for the model.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | `TCModel` |  \- |
| `Optional` eventStatus | [EventStatus](../enums/eventstatus.md) |   |

**Returns:** `void`

___

