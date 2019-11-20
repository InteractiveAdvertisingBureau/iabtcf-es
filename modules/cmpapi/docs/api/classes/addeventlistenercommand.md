[@iabtcf/cmpapi - API Documentation](../README.md) > [AddEventListenerCommand](../classes/addeventlistenercommand.md)

# Class: AddEventListenerCommand

Adds an event listener to an EventListenerQueue

## Hierarchy

 [BaseCommand](basecommand.md)

**↳ AddEventListenerCommand**

## Implements

* [Command](../interfaces/command.md)
* [Validatable](../interfaces/validatable.md)

## Index

### Constructors

* [constructor](addeventlistenercommand.md#constructor)

### Properties

* [callback](addeventlistenercommand.md#callback)
* [cmpData](addeventlistenercommand.md#cmpdata)
* [command](addeventlistenercommand.md#command)
* [param](addeventlistenercommand.md#param)
* [version](addeventlistenercommand.md#version)
* [versionString](addeventlistenercommand.md#versionstring)

### Methods

* [execute](addeventlistenercommand.md#execute)
* [isValidVendorListVersion](addeventlistenercommand.md#isvalidvendorlistversion)
* [isVendorsListValid](addeventlistenercommand.md#isvendorslistvalid)
* [setBaseReturnFields](addeventlistenercommand.md#setbasereturnfields)
* [validate](addeventlistenercommand.md#validate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AddEventListenerCommand**(eventListenerQueue: *[EventListenerQueue](eventlistenerqueue.md)*, cmpData: *[CmpDataReader](../interfaces/cmpdatareader.md)*, command: *`string`*, version: *`number`*, callback: *[Callback](callback.md)*, param?: *[Param](../#param)*): [AddEventListenerCommand](addeventlistenercommand.md)

*Overrides [BaseCommand](basecommand.md).[constructor](basecommand.md#constructor)*

*Defined in [command/commands/eventlistener/AddEventListenerCommand.ts:16](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/eventlistener/AddEventListenerCommand.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventListenerQueue | [EventListenerQueue](eventlistenerqueue.md) |
| cmpData | [CmpDataReader](../interfaces/cmpdatareader.md) |
| command | `string` |
| version | `number` |
| callback | [Callback](callback.md) |
| `Optional` param | [Param](../#param) |

**Returns:** [AddEventListenerCommand](addeventlistenercommand.md)

___

## Properties

<a id="callback"></a>

### `<Protected>` callback

**● callback**: *[Callback](callback.md)*

*Inherited from [BaseCommand](basecommand.md).[callback](basecommand.md#callback)*

*Defined in [command/commands/BaseCommand.ts:18](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L18)*

___
<a id="cmpdata"></a>

### `<Protected>` cmpData

**● cmpData**: *[CmpDataReader](../interfaces/cmpdatareader.md)*

*Inherited from [BaseCommand](basecommand.md).[cmpData](basecommand.md#cmpdata)*

*Defined in [command/commands/BaseCommand.ts:13](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L13)*

___
<a id="command"></a>

### `<Protected>` command

**● command**: *`string`*

*Inherited from [BaseCommand](basecommand.md).[command](basecommand.md#command)*

*Defined in [command/commands/BaseCommand.ts:15](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L15)*

___
<a id="param"></a>

### `<Protected>``<Optional>` param

**● param**: *[Param](../#param)*

*Inherited from [BaseCommand](basecommand.md).[param](basecommand.md#param)*

*Defined in [command/commands/BaseCommand.ts:19](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L19)*

___
<a id="version"></a>

### `<Protected>` version

**● version**: *`number`*

*Inherited from [BaseCommand](basecommand.md).[version](basecommand.md#version)*

*Defined in [command/commands/BaseCommand.ts:16](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L16)*

___
<a id="versionstring"></a>

### `<Protected>` versionString

**● versionString**: *`string`*

*Inherited from [BaseCommand](basecommand.md).[versionString](basecommand.md#versionstring)*

*Defined in [command/commands/BaseCommand.ts:17](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L17)*

___

## Methods

<a id="execute"></a>

###  execute

▸ **execute**(): `void`

*Implementation of [Command](../interfaces/command.md).[execute](../interfaces/command.md#execute)*

*Defined in [command/commands/eventlistener/AddEventListenerCommand.ts:34](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/eventlistener/AddEventListenerCommand.ts#L34)*

**Returns:** `void`

___
<a id="isvalidvendorlistversion"></a>

### `<Protected>` isValidVendorListVersion

▸ **isValidVendorListVersion**(): `boolean`

*Inherited from [BaseCommand](basecommand.md).[isValidVendorListVersion](basecommand.md#isvalidvendorlistversion)*

*Defined in [command/commands/BaseCommand.ts:115](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L115)*

Validates the current vendor list id version

**Returns:** `boolean`

___
<a id="isvendorslistvalid"></a>

### `<Protected>` isVendorsListValid

▸ **isVendorsListValid**(): `boolean`

*Inherited from [BaseCommand](basecommand.md).[isVendorsListValid](basecommand.md#isvendorslistvalid)*

*Defined in [command/commands/BaseCommand.ts:93](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L93)*

**Returns:** `boolean`

___
<a id="setbasereturnfields"></a>

### `<Protected>` setBaseReturnFields

▸ **setBaseReturnFields**(returnObj: *[ResponseBuilder](responsebuilder.md)*): `void`

*Inherited from [BaseCommand](basecommand.md).[setBaseReturnFields](basecommand.md#setbasereturnfields)*

*Defined in [command/commands/BaseCommand.ts:35](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/BaseCommand.ts#L35)*

Sets all the fields on a Return object using current cmp api data

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| returnObj | [ResponseBuilder](responsebuilder.md) |  a Return object |

**Returns:** `void`

___
<a id="validate"></a>

###  validate

▸ **validate**(failCallbackIfNotValid?: *`undefined` \| `false` \| `true`*): [ValidationResult](../interfaces/validationresult.md)

*Implementation of [Validatable](../interfaces/validatable.md).[validate](../interfaces/validatable.md#validate)*

*Overrides [BaseCommand](basecommand.md).[validate](basecommand.md#validate)*

*Defined in [command/commands/eventlistener/AddEventListenerCommand.ts:40](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/commands/eventlistener/AddEventListenerCommand.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` failCallbackIfNotValid | `undefined` \| `false` \| `true` |

**Returns:** [ValidationResult](../interfaces/validationresult.md)

___

