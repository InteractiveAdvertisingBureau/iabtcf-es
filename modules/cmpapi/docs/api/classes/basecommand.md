[@iabtcf/cmpapi - API Documentation](../README.md) > [BaseCommand](../classes/basecommand.md)

# Class: BaseCommand

Base command class holds basic command parameters and has functionality to handle basic validation.

## Hierarchy

**BaseCommand**

↳  [PingCommand](pingcommand.md)

↳  [GetTcDataCommand](gettcdatacommand.md)

↳  [GetVendorListCommand](getvendorlistcommand.md)

↳  [AddEventListenerCommand](addeventlistenercommand.md)

↳  [RemoveEventListenerCommand](removeeventlistenercommand.md)

## Index

### Constructors

* [constructor](basecommand.md#constructor)

### Properties

* [callback](basecommand.md#callback)
* [cmpData](basecommand.md#cmpdata)
* [command](basecommand.md#command)
* [param](basecommand.md#param)
* [version](basecommand.md#version)
* [versionString](basecommand.md#versionstring)

### Methods

* [isValidVendorListVersion](basecommand.md#isvalidvendorlistversion)
* [isVendorsListValid](basecommand.md#isvendorslistvalid)
* [setBaseReturnFields](basecommand.md#setbasereturnfields)
* [validate](basecommand.md#validate)

---

## Constructors

<a id="constructor"></a>

### `<Protected>` constructor

⊕ **new BaseCommand**(cmpData: *[CmpDataReader](../interfaces/cmpdatareader.md)*, command: *`string`*, version: *`number`*, callback: *[Callback](callback.md)*, param?: *[Param](../#param)*): [BaseCommand](basecommand.md)

*Defined in [command/commands/BaseCommand.ts:19](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cmpData | [CmpDataReader](../interfaces/cmpdatareader.md) |
| command | `string` |
| version | `number` |
| callback | [Callback](callback.md) |
| `Optional` param | [Param](../#param) |

**Returns:** [BaseCommand](basecommand.md)

___

## Properties

<a id="callback"></a>

### `<Protected>` callback

**● callback**: *[Callback](callback.md)*

*Defined in [command/commands/BaseCommand.ts:18](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L18)*

___
<a id="cmpdata"></a>

### `<Protected>` cmpData

**● cmpData**: *[CmpDataReader](../interfaces/cmpdatareader.md)*

*Defined in [command/commands/BaseCommand.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L13)*

___
<a id="command"></a>

### `<Protected>` command

**● command**: *`string`*

*Defined in [command/commands/BaseCommand.ts:15](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L15)*

___
<a id="param"></a>

### `<Protected>``<Optional>` param

**● param**: *[Param](../#param)*

*Defined in [command/commands/BaseCommand.ts:19](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L19)*

___
<a id="version"></a>

### `<Protected>` version

**● version**: *`number`*

*Defined in [command/commands/BaseCommand.ts:16](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L16)*

___
<a id="versionstring"></a>

### `<Protected>` versionString

**● versionString**: *`string`*

*Defined in [command/commands/BaseCommand.ts:17](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L17)*

___

## Methods

<a id="isvalidvendorlistversion"></a>

### `<Protected>` isValidVendorListVersion

▸ **isValidVendorListVersion**(): `boolean`

*Defined in [command/commands/BaseCommand.ts:115](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L115)*

Validates the current vendor list id version

**Returns:** `boolean`

___
<a id="isvendorslistvalid"></a>

### `<Protected>` isVendorsListValid

▸ **isVendorsListValid**(): `boolean`

*Defined in [command/commands/BaseCommand.ts:93](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L93)*

**Returns:** `boolean`

___
<a id="setbasereturnfields"></a>

### `<Protected>` setBaseReturnFields

▸ **setBaseReturnFields**(returnObj: *[ResponseBuilder](responsebuilder.md)*): `void`

*Defined in [command/commands/BaseCommand.ts:35](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L35)*

Sets all the fields on a Return object using current cmp api data

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| returnObj | [ResponseBuilder](responsebuilder.md) |  a Return object |

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(failCallbackIfNotValid?: *`boolean`*): [ValidationResult](../interfaces/validationresult.md)

*Defined in [command/commands/BaseCommand.ts:50](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L50)*

Validates that the common parameters used to execute a command are valid. If failCallbackIfNotValid is true, the method will call the callback with failed values if not valid.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` failCallbackIfNotValid | `boolean` | false |  \- |

**Returns:** [ValidationResult](../interfaces/validationresult.md)

___

