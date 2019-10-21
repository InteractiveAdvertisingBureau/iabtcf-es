
#  @iabtcf/cmpapi - API Documentation

## Index

### Enumerations

* [CmpStatus](enums/cmpstatus.md)
* [DisplayStatus](enums/displaystatus.md)
* [EventStatus](enums/eventstatus.md)

### Classes

* [CmpApi](classes/cmpapi.md)
* [InAppTCData](classes/inapptcdata.md)
* [InAppTCDataBuilder](classes/inapptcdatabuilder.md)
* [Ping](classes/ping.md)
* [PingBuilder](classes/pingbuilder.md)
* [Return](classes/return.md)
* [TCData](classes/tcdata.md)
* [TCDataBuilder](classes/tcdatabuilder.md)

### Interfaces

* [BooleanVector](interfaces/booleanvector.md)
* [Builder](interfaces/builder.md)
* [StringBoolVector](interfaces/stringboolvector.md)

### Type aliases

* [ArgSet](#argset)
* [BoolInt](#boolint)
* [Callback](#callback)
* [IATCDataCallback](#iatcdatacallback)
* [Numberish](#numberish)
* [Param](#param)
* [PingCallback](#pingcallback)
* [TCDataCallback](#tcdatacallback)

---

## Type aliases

<a id="argset"></a>

###  ArgSet

**Ƭ ArgSet**: *[`string`, `number`, [Callback](#callback), [Param](#param)]*

*Defined in [Types.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/Types.ts#L8)*

___
<a id="boolint"></a>

###  BoolInt

**Ƭ BoolInt**: *`0` \| `1` \| `undefined`*

*Defined in [model/BoolInt.ts:1](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/BoolInt.ts#L1)*

___
<a id="callback"></a>

###  Callback

**Ƭ Callback**: *[TCDataCallback](#tcdatacallback) \| [IATCDataCallback](#iatcdatacallback) \| [PingCallback](#pingcallback)*

*Defined in [Types.ts:12](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/Types.ts#L12)*

___
<a id="iatcdatacallback"></a>

###  IATCDataCallback

**Ƭ IATCDataCallback**: *`function`*

*Defined in [Types.ts:10](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/Types.ts#L10)*

#### Type declaration
▸(IATCData: *[InAppTCData](classes/inapptcdata.md)*, success: *`boolean`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| IATCData | [InAppTCData](classes/inapptcdata.md) |
| success | `boolean` |

**Returns:** `void`

___
<a id="numberish"></a>

###  Numberish

**Ƭ Numberish**: *`number` \| `string`*

*Defined in [CmpApi.ts:33](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L33)*

___
<a id="param"></a>

###  Param

**Ƭ Param**: *`number`[] \| [Callback](#callback) \| `number` \| `string`*

*Defined in [Types.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/Types.ts#L7)*

___
<a id="pingcallback"></a>

###  PingCallback

**Ƭ PingCallback**: *`function`*

*Defined in [Types.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/Types.ts#L11)*

#### Type declaration
▸(pingReturn: *[Ping](classes/ping.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| pingReturn | [Ping](classes/ping.md) |

**Returns:** `void`

___
<a id="tcdatacallback"></a>

###  TCDataCallback

**Ƭ TCDataCallback**: *`function`*

*Defined in [Types.ts:9](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/Types.ts#L9)*

#### Type declaration
▸(tcData: *[TCData](classes/tcdata.md)*, success: *`boolean`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| tcData | [TCData](classes/tcdata.md) |
| success | `boolean` |

**Returns:** `void`

___

