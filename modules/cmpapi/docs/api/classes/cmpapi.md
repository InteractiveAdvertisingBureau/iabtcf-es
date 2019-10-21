[@iabtcf/cmpapi - API Documentation](../README.md) > [CmpApi](../classes/cmpapi.md)

# Class: CmpApi

## Hierarchy

**CmpApi**

## Index

### Constructors

* [constructor](cmpapi.md#constructor)

### Methods

* [addEventListener](cmpapi.md#addeventlistener)
* [getInAppTCData](cmpapi.md#getinapptcdata)
* [getTCData](cmpapi.md#gettcdata)
* [ping](cmpapi.md#ping)
* [removeventListener](cmpapi.md#removeventlistener)
* [setCmpStatus](cmpapi.md#setcmpstatus)
* [setDisplayStatus](cmpapi.md#setdisplaystatus)
* [setGdprApplies](cmpapi.md#setgdprapplies)
* [setTCModel](cmpapi.md#settcmodel)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CmpApi**(): [CmpApi](cmpapi.md)

*Defined in [CmpApi.ts:52](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L52)*

**Returns:** [CmpApi](cmpapi.md)

___

## Methods

<a id="addeventlistener"></a>

###  addEventListener

▸ **addEventListener**(callback: *[TCDataCallback](../#tcdatacallback)*): `void`

*Defined in [CmpApi.ts:272](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L272)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [TCDataCallback](../#tcdatacallback) |

**Returns:** `void`

___
<a id="getinapptcdata"></a>

###  getInAppTCData

▸ **getInAppTCData**(callback: *[IATCDataCallback](../#iatcdatacallback)*): `void`

*Defined in [CmpApi.ts:242](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L242)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [IATCDataCallback](../#iatcdatacallback) |

**Returns:** `void`

___
<a id="gettcdata"></a>

###  getTCData

▸ **getTCData**(callback: *[TCDataCallback](../#tcdatacallback)*, vendors?: *`number`[]*): `void`

*Defined in [CmpApi.ts:227](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L227)*

Public-facing CMP API commands

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [TCDataCallback](../#tcdatacallback) |
| `Optional` vendors | `number`[] |

**Returns:** `void`

___
<a id="ping"></a>

###  ping

▸ **ping**(callback: *[PingCallback](../#pingcallback)*): `void`

*Defined in [CmpApi.ts:257](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L257)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [PingCallback](../#pingcallback) |

**Returns:** `void`

___
<a id="removeventlistener"></a>

###  removeventListener

▸ **removeventListener**(callback: *[TCDataCallback](../#tcdatacallback)*, registeredCallback: *[TCDataCallback](../#tcdatacallback)*): `void`

*Defined in [CmpApi.ts:287](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L287)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [TCDataCallback](../#tcdatacallback) |
| registeredCallback | [TCDataCallback](../#tcdatacallback) |

**Returns:** `void`

___
<a id="setcmpstatus"></a>

###  setCmpStatus

▸ **setCmpStatus**(cmpStatus: *[CmpStatus](../enums/cmpstatus.md)*): `void`

*Defined in [CmpApi.ts:211](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L211)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cmpStatus | [CmpStatus](../enums/cmpstatus.md) |

**Returns:** `void`

___
<a id="setdisplaystatus"></a>

###  setDisplayStatus

▸ **setDisplayStatus**(displayStatus: *[DisplayStatus](../enums/displaystatus.md)*): `void`

*Defined in [CmpApi.ts:217](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L217)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| displayStatus | [DisplayStatus](../enums/displaystatus.md) |

**Returns:** `void`

___
<a id="setgdprapplies"></a>

###  setGdprApplies

▸ **setGdprApplies**(applies: *`boolean`*): `void`

*Defined in [CmpApi.ts:205](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L205)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| applies | `boolean` |

**Returns:** `void`

___
<a id="settcmodel"></a>

###  setTCModel

▸ **setTCModel**(tcm: *`TCModel`*, eventStatus: *[EventStatus](../enums/eventstatus.md)*): `void`

*Defined in [CmpApi.ts:198](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/CmpApi.ts#L198)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tcm | `TCModel` |
| eventStatus | [EventStatus](../enums/eventstatus.md) |

**Returns:** `void`

___

