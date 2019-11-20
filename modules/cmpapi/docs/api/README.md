
#  @iabtcf/cmpapi - API Documentation

## Index

### Enumerations

* [CmpStatus](enums/cmpstatus.md)
* [Commands](enums/commands.md)
* [DisplayStatus](enums/displaystatus.md)
* [EventStatus](enums/eventstatus.md)

### Classes

* [AddEventListenerCommand](classes/addeventlistenercommand.md)
* [BaseCommand](classes/basecommand.md)
* [Callback](classes/callback.md)
* [CmpApi](classes/cmpapi.md)
* [CmpData](classes/cmpdata.md)
* [CmpLog](classes/cmplog.md)
* [CommandBroker](classes/commandbroker.md)
* [CommandQueue](classes/commandqueue.md)
* [CommandStream](classes/commandstream.md)
* [CustomCommand](classes/customcommand.md)
* [EventListenerQueue](classes/eventlistenerqueue.md)
* [GetInAppTcDataCommand](classes/getinapptcdatacommand.md)
* [GetTcDataCommand](classes/gettcdatacommand.md)
* [GetVendorListCommand](classes/getvendorlistcommand.md)
* [GlobalVendorListBldr](classes/globalvendorlistbldr.md)
* [InAppTCDataBldr](classes/inapptcdatabldr.md)
* [PingBldr](classes/pingbldr.md)
* [PingCommand](classes/pingcommand.md)
* [RemoveEventListenerCommand](classes/removeeventlistenercommand.md)
* [ResponseBuilder](classes/responsebuilder.md)
* [TCDataBldr](classes/tcdatabldr.md)
* [ValidationMessages](classes/validationmessages.md)
* [ValidationUtil](classes/validationutil.md)

### Interfaces

* [BooleanVector](interfaces/booleanvector.md)
* [CmpDataReader](interfaces/cmpdatareader.md)
* [Command](interfaces/command.md)
* [CustomCommandRegistration](interfaces/customcommandregistration.md)
* [GlobalVendorList](interfaces/globalvendorlist.md)
* [InAppTCData](interfaces/inapptcdata.md)
* [Ping](interfaces/ping.md)
* [Response](interfaces/response.md)
* [Restrictions](interfaces/restrictions.md)
* [StringBoolVector](interfaces/stringboolvector.md)
* [TCData](interfaces/tcdata.md)
* [Validatable](interfaces/validatable.md)
* [ValidationResult](interfaces/validationresult.md)

### Type aliases

* [BoolInt](#boolint)
* [BoolString](#boolstring)
* [CallbackFunction](#callbackfunction)
* [CommandArgsHandler](#commandargshandler)
* [CustomCommandFunction](#customcommandfunction)
* [IATCDataCallback](#iatcdatacallback)
* [PageCallHandler](#pagecallhandler)
* [Param](#param)
* [PingCallback](#pingcallback)
* [RemoveListenerCallback](#removelistenercallback)
* [TCDataCallback](#tcdatacallback)
* [TcModelChangeEventHandler](#tcmodelchangeeventhandler)
* [TcfApiArgSet](#tcfapiargset)
* [VendorListCallback](#vendorlistcallback)

### Functions

* [createBooleanVector](#createbooleanvector)
* [createStringBoolVector](#createstringboolvector)
* [isValidatable](#isvalidatable)

---

## Type aliases

<a id="boolint"></a>

###  BoolInt

**Ƭ BoolInt**: *`0` \| `1`*

*Defined in [types/BoolInt.ts:1](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/BoolInt.ts#L1)*

___
<a id="boolstring"></a>

###  BoolString

**Ƭ BoolString**: *"0" \| "1"*

*Defined in [types/BoolString.ts:1](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/BoolString.ts#L1)*

___
<a id="callbackfunction"></a>

###  CallbackFunction

**Ƭ CallbackFunction**: *[TCDataCallback](#tcdatacallback) \| [IATCDataCallback](#iatcdatacallback) \| [PingCallback](#pingcallback) \| [VendorListCallback](#vendorlistcallback) \| [RemoveListenerCallback](#removelistenercallback)*

*Defined in [types/callbacks/CallbackFunction.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/callbacks/CallbackFunction.ts#L10)*

Union type of all default command callback function signatures

___
<a id="commandargshandler"></a>

###  CommandArgsHandler

**Ƭ CommandArgsHandler**: *`function`*

*Defined in [types/handlers/CommandArgsHandler.ts:3](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/handlers/CommandArgsHandler.ts#L3)*

#### Type declaration
▸(argSets: *[TcfApiArgSet](#tcfapiargset)[]*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| argSets | [TcfApiArgSet](#tcfapiargset)[] |

**Returns:** `void`

___
<a id="customcommandfunction"></a>

###  CustomCommandFunction

**Ƭ CustomCommandFunction**: *`function`*

*Defined in [command/commands/CustomCommand.ts:5](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/commands/CustomCommand.ts#L5)*

#### Type declaration
▸(...args: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | `any` |

**Returns:** `void`

___
<a id="iatcdatacallback"></a>

###  IATCDataCallback

**Ƭ IATCDataCallback**: *`function`*

*Defined in [types/callbacks/IATCDataCallback.ts:3](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/callbacks/IATCDataCallback.ts#L3)*

#### Type declaration
▸(IATCData: *[InAppTCData](interfaces/inapptcdata.md) \| `null`*, success: *`boolean`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| IATCData | [InAppTCData](interfaces/inapptcdata.md) \| `null` |
| success | `boolean` |

**Returns:** `void`

___
<a id="pagecallhandler"></a>

###  PageCallHandler

**Ƭ PageCallHandler**: *`function`*

*Defined in [types/handlers/PageCallHandler.ts:4](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/handlers/PageCallHandler.ts#L4)*

#### Type declaration
▸(command: *`string`*, version: *`number`*, callback: *[CallbackFunction](#callbackfunction)*, param?: *[Param](#param)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| command | `string` |
| version | `number` |
| callback | [CallbackFunction](#callbackfunction) |
| `Optional` param | [Param](#param) |

**Returns:** `void`

___
<a id="param"></a>

###  Param

**Ƭ Param**: *`number`[] \| [CallbackFunction](#callbackfunction) \| `number` \| `string`*

*Defined in [types/Param.ts:3](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/Param.ts#L3)*

___
<a id="pingcallback"></a>

###  PingCallback

**Ƭ PingCallback**: *`function`*

*Defined in [types/callbacks/PingCallback.ts:3](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/callbacks/PingCallback.ts#L3)*

#### Type declaration
▸(pingReturn: *[Ping](interfaces/ping.md) \| `null`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| pingReturn | [Ping](interfaces/ping.md) \| `null` |

**Returns:** `void`

___
<a id="removelistenercallback"></a>

###  RemoveListenerCallback

**Ƭ RemoveListenerCallback**: *`function`*

*Defined in [types/callbacks/RemoveListenerCallback.ts:1](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/callbacks/RemoveListenerCallback.ts#L1)*

#### Type declaration
▸(status: *`boolean` \| `null`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| status | `boolean` \| `null` |

**Returns:** `void`

___
<a id="tcdatacallback"></a>

###  TCDataCallback

**Ƭ TCDataCallback**: *`function`*

*Defined in [types/callbacks/TCDataCallback.ts:3](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/callbacks/TCDataCallback.ts#L3)*

#### Type declaration
▸(tcData: *[TCData](interfaces/tcdata.md) \| `null`*, success: *`boolean`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| tcData | [TCData](interfaces/tcdata.md) \| `null` |
| success | `boolean` |

**Returns:** `void`

___
<a id="tcmodelchangeeventhandler"></a>

###  TcModelChangeEventHandler

**Ƭ TcModelChangeEventHandler**: *`function`*

*Defined in [types/handlers/TcModelChangeEventHandler.ts:1](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/handlers/TcModelChangeEventHandler.ts#L1)*

#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="tcfapiargset"></a>

###  TcfApiArgSet

**Ƭ TcfApiArgSet**: *[`string`, `number`, [CallbackFunction](#callbackfunction), [Param](#param)]*

*Defined in [types/TcfApiArgSet.ts:7](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/TcfApiArgSet.ts#L7)*

Arguments passed to page level api function

___
<a id="vendorlistcallback"></a>

###  VendorListCallback

**Ƭ VendorListCallback**: *`function`*

*Defined in [types/callbacks/VendorListCallback.ts:3](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/types/callbacks/VendorListCallback.ts#L3)*

#### Type declaration
▸(gvl: *[GlobalVendorList](interfaces/globalvendorlist.md) \| `null`*, success: *`boolean`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| gvl | [GlobalVendorList](interfaces/globalvendorlist.md) \| `null` |
| success | `boolean` |

**Returns:** `void`

___

## Functions

<a id="createbooleanvector"></a>

### `<Const>` createBooleanVector

▸ **createBooleanVector**(ids: *`string`[]*, vector: *`Vector`*): [BooleanVector](interfaces/booleanvector.md)

*Defined in [model/BooleanVector.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/BooleanVector.ts#L13)*

Creates a boolean vector with a value for each id where each value is true if its id is in the passed in vector

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ids | `string`[] |  \- |
| vector | `Vector` |  \- |

**Returns:** [BooleanVector](interfaces/booleanvector.md)

___
<a id="createstringboolvector"></a>

### `<Const>` createStringBoolVector

▸ **createStringBoolVector**(ids: *`string`[]*, vector: *`Vector`*): [StringBoolVector](interfaces/stringboolvector.md)

*Defined in [model/StringBoolVector.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/StringBoolVector.ts#L14)*

Creates a string bool vector with a value for each id where each value is '1' if its id is in the passed in vector

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ids | `string`[] |  \- |
| vector | `Vector` |  \- |

**Returns:** [StringBoolVector](interfaces/stringboolvector.md)

___
<a id="isvalidatable"></a>

### `<Const>` isValidatable

▸ **isValidatable**(obj: *`object`*): `boolean`

*Defined in [validation/Validatable.ts:17](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/validation/Validatable.ts#L17)*

Checks if an object implements the Validatable interface

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| obj | `object` |  \- |

**Returns:** `boolean`

___

