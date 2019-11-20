[@iabtcf/cmpapi - API Documentation](../README.md) > [CustomCommand](../classes/customcommand.md)

# Class: CustomCommand

Custom command used by a CMP to execute a custom method. No validation will be performed on the arguments passed in to this class.

## Hierarchy

**CustomCommand**

## Implements

* [Command](../interfaces/command.md)

## Index

### Constructors

* [constructor](customcommand.md#constructor)

### Properties

* [callback](customcommand.md#callback)
* [customMethod](customcommand.md#custommethod)
* [param](customcommand.md#param)
* [version](customcommand.md#version)

### Methods

* [execute](customcommand.md#execute)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CustomCommand**(customMethod: *[CustomCommandFunction](../#customcommandfunction)*, version: *`number`*, callback: *[Callback](callback.md)*, param?: *[Param](../#param)*): [CustomCommand](customcommand.md)

*Defined in [command/commands/CustomCommand.ts:16](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| customMethod | [CustomCommandFunction](../#customcommandfunction) |
| version | `number` |
| callback | [Callback](callback.md) |
| `Optional` param | [Param](../#param) |

**Returns:** [CustomCommand](customcommand.md)

___

## Properties

<a id="callback"></a>

### `<Protected>` callback

**● callback**: *[Callback](callback.md)*

*Defined in [command/commands/CustomCommand.ts:15](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L15)*

___
<a id="custommethod"></a>

### `<Protected>` customMethod

**● customMethod**: *[CustomCommandFunction](../#customcommandfunction)*

*Defined in [command/commands/CustomCommand.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L13)*

___
<a id="param"></a>

### `<Protected>``<Optional>` param

**● param**: *[Param](../#param)*

*Defined in [command/commands/CustomCommand.ts:16](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L16)*

___
<a id="version"></a>

### `<Protected>` version

**● version**: *`number`*

*Defined in [command/commands/CustomCommand.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L14)*

___

## Methods

<a id="execute"></a>

###  execute

▸ **execute**(): `void`

*Implementation of [Command](../interfaces/command.md).[execute](../interfaces/command.md#execute)*

*Defined in [command/commands/CustomCommand.ts:27](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L27)*

**Returns:** `void`

___

