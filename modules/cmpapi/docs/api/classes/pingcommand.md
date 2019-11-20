[@iabtcf/cmpapi - API Documentation](../README.md) > [PingCommand](../classes/pingcommand.md)

# Class: PingCommand

Executes a ping command request and executes its callback method with ping data

## Hierarchy

 [BaseCommand](basecommand.md)

**↳ PingCommand**

## Implements

* [Command](../interfaces/command.md)
* [Validatable](../interfaces/validatable.md)

## Index

### Constructors

* [constructor](pingcommand.md#constructor)

### Properties

* [callback](pingcommand.md#callback)
* [cmpData](pingcommand.md#cmpdata)
* [command](pingcommand.md#command)
* [param](pingcommand.md#param)
* [version](pingcommand.md#version)
* [versionString](pingcommand.md#versionstring)

### Methods

* [execute](pingcommand.md#execute)
* [isValidVendorListVersion](pingcommand.md#isvalidvendorlistversion)
* [isVendorsListValid](pingcommand.md#isvendorslistvalid)
* [setBaseReturnFields](pingcommand.md#setbasereturnfields)
* [validate](pingcommand.md#validate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PingCommand**(cmpData: *[CmpDataReader](../interfaces/cmpdatareader.md)*, command: *`string`*, version: *`number`*, callback: *[Callback](callback.md)*, param?: *[Param](../#param)*): [PingCommand](pingcommand.md)

*Overrides [BaseCommand](basecommand.md).[constructor](basecommand.md#constructor)*

*Defined in [command/commands/PingCommand.ts:12](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/PingCommand.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cmpData | [CmpDataReader](../interfaces/cmpdatareader.md) |
| command | `string` |
| version | `number` |
| callback | [Callback](callback.md) |
| `Optional` param | [Param](../#param) |

**Returns:** [PingCommand](pingcommand.md)

___

## Properties

<a id="callback"></a>

### `<Protected>` callback

**● callback**: *[Callback](callback.md)*

*Inherited from [BaseCommand](basecommand.md).[callback](basecommand.md#callback)*

*Defined in [command/commands/BaseCommand.ts:18](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L18)*

___
<a id="cmpdata"></a>

### `<Protected>` cmpData

**● cmpData**: *[CmpDataReader](../interfaces/cmpdatareader.md)*

*Inherited from [BaseCommand](basecommand.md).[cmpData](basecommand.md#cmpdata)*

*Defined in [command/commands/BaseCommand.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L13)*

___
<a id="command"></a>

### `<Protected>` command

**● command**: *`string`*

*Inherited from [BaseCommand](basecommand.md).[command](basecommand.md#command)*

*Defined in [command/commands/BaseCommand.ts:15](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L15)*

___
<a id="param"></a>

### `<Protected>``<Optional>` param

**● param**: *[Param](../#param)*

*Inherited from [BaseCommand](basecommand.md).[param](basecommand.md#param)*

*Defined in [command/commands/BaseCommand.ts:19](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L19)*

___
<a id="version"></a>

### `<Protected>` version

**● version**: *`number`*

*Inherited from [BaseCommand](basecommand.md).[version](basecommand.md#version)*

*Defined in [command/commands/BaseCommand.ts:16](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L16)*

___
<a id="versionstring"></a>

### `<Protected>` versionString

**● versionString**: *`string`*

*Inherited from [BaseCommand](basecommand.md).[versionString](basecommand.md#versionstring)*

*Defined in [command/commands/BaseCommand.ts:17](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L17)*

___

## Methods

<a id="execute"></a>

###  execute

▸ **execute**(): `void`

*Implementation of [Command](../interfaces/command.md).[execute](../interfaces/command.md#execute)*

*Defined in [command/commands/PingCommand.ts:23](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/PingCommand.ts#L23)*

Executes the ping command

**Returns:** `void`

___
<a id="isvalidvendorlistversion"></a>

### `<Protected>` isValidVendorListVersion

▸ **isValidVendorListVersion**(): `boolean`

*Inherited from [BaseCommand](basecommand.md).[isValidVendorListVersion](basecommand.md#isvalidvendorlistversion)*

*Defined in [command/commands/BaseCommand.ts:115](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L115)*

Validates the current vendor list id version

**Returns:** `boolean`

___
<a id="isvendorslistvalid"></a>

### `<Protected>` isVendorsListValid

▸ **isVendorsListValid**(): `boolean`

*Inherited from [BaseCommand](basecommand.md).[isVendorsListValid](basecommand.md#isvendorslistvalid)*

*Defined in [command/commands/BaseCommand.ts:93](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L93)*

**Returns:** `boolean`

___
<a id="setbasereturnfields"></a>

### `<Protected>` setBaseReturnFields

▸ **setBaseReturnFields**(returnObj: *[ResponseBuilder](responsebuilder.md)*): `void`

*Inherited from [BaseCommand](basecommand.md).[setBaseReturnFields](basecommand.md#setbasereturnfields)*

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

*Inherited from [BaseCommand](basecommand.md).[validate](basecommand.md#validate)*

*Defined in [command/commands/BaseCommand.ts:50](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/BaseCommand.ts#L50)*

Validates that the common parameters used to execute a command are valid. If failCallbackIfNotValid is true, the method will call the callback with failed values if not valid.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` failCallbackIfNotValid | `boolean` | false |  \- |

**Returns:** [ValidationResult](../interfaces/validationresult.md)

___

