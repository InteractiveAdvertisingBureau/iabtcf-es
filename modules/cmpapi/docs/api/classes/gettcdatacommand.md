[@iabtcf/cmpapi - API Documentation](../README.md) > [GetTcDataCommand](../classes/gettcdatacommand.md)

# Class: GetTcDataCommand

## Hierarchy

 [BaseCommand](basecommand.md)

**↳ GetTcDataCommand**

↳  [GetInAppTcDataCommand](getinapptcdatacommand.md)

## Implements

* [Command](../interfaces/command.md)
* [Validatable](../interfaces/validatable.md)

## Index

### Constructors

* [constructor](gettcdatacommand.md#constructor)

### Properties

* [callback](gettcdatacommand.md#callback)
* [cmpData](gettcdatacommand.md#cmpdata)
* [command](gettcdatacommand.md#command)
* [param](gettcdatacommand.md#param)
* [version](gettcdatacommand.md#version)
* [versionString](gettcdatacommand.md#versionstring)

### Methods

* [execute](gettcdatacommand.md#execute)
* [isValidVendorListVersion](gettcdatacommand.md#isvalidvendorlistversion)
* [isVendorsListValid](gettcdatacommand.md#isvendorslistvalid)
* [setBaseReturnFields](gettcdatacommand.md#setbasereturnfields)
* [validate](gettcdatacommand.md#validate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new GetTcDataCommand**(cmpData: *[CmpDataReader](../interfaces/cmpdatareader.md)*, command: *`string`*, version: *`number`*, callback: *[Callback](callback.md)*, param?: *[Param](../#param)*): [GetTcDataCommand](gettcdatacommand.md)

*Overrides [BaseCommand](basecommand.md).[constructor](basecommand.md#constructor)*

*Defined in [command/commands/GetTcDataCommand.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/GetTcDataCommand.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cmpData | [CmpDataReader](../interfaces/cmpdatareader.md) |
| command | `string` |
| version | `number` |
| callback | [Callback](callback.md) |
| `Optional` param | [Param](../#param) |

**Returns:** [GetTcDataCommand](gettcdatacommand.md)

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

*Defined in [command/commands/GetTcDataCommand.ts:20](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/GetTcDataCommand.ts#L20)*

Executes the get tc data command

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

*Overrides [BaseCommand](basecommand.md).[validate](basecommand.md#validate)*

*Defined in [command/commands/GetTcDataCommand.ts:34](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/GetTcDataCommand.ts#L34)*

Validates the vendor list was valid and returns the result. Base class validation is also handled.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` failCallbackIfNotValid | `boolean` | false |  \- |

**Returns:** [ValidationResult](../interfaces/validationresult.md)

___

