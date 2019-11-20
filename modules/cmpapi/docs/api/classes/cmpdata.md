[@iabtcf/cmpapi - API Documentation](../README.md) > [CmpData](../classes/cmpdata.md)

# Class: CmpData

Class holds shareable data across cmp api and provides change event listener for TcModel. Within the context of the CmpApi, this class acts much like a global state or database, where CmpApi sets data and Commands read the data.

## Hierarchy

**CmpData**

## Implements

* [CmpDataReader](../interfaces/cmpdatareader.md)

## Index

### Constructors

* [constructor](cmpdata.md#constructor)

### Accessors

* [tcModelIsSet](cmpdata.md#tcmodelisset)

### Methods

* [getApiVersion](cmpdata.md#getapiversion)
* [getCmpId](cmpdata.md#getcmpid)
* [getCmpStatus](cmpdata.md#getcmpstatus)
* [getCmpVersion](cmpdata.md#getcmpversion)
* [getDisplayStatus](cmpdata.md#getdisplaystatus)
* [getEventStatus](cmpdata.md#geteventstatus)
* [getGdprApplies](cmpdata.md#getgdprapplies)
* [getTcModel](cmpdata.md#gettcmodel)
* [getTcfPolicyVersion](cmpdata.md#gettcfpolicyversion)
* [registerTcModelChangeEventCallback](cmpdata.md#registertcmodelchangeeventcallback)
* [setApiVersion](cmpdata.md#setapiversion)
* [setCmpId](cmpdata.md#setcmpid)
* [setCmpStatus](cmpdata.md#setcmpstatus)
* [setCmpVersion](cmpdata.md#setcmpversion)
* [setDisplayStatus](cmpdata.md#setdisplaystatus)
* [setEventStatus](cmpdata.md#seteventstatus)
* [setGdprApplies](cmpdata.md#setgdprapplies)
* [setTCModel](cmpdata.md#settcmodel)
* [setTcfPolicyVersion](cmpdata.md#settcfpolicyversion)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CmpData**(cmpId: *`number`*, cmpVersion: *`number`*): [CmpData](cmpdata.md)

*Defined in [cmpdata/CmpData.ts:26](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L26)*

Constructor

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| cmpId | `number` |  \- |
| cmpVersion | `number` |   |

**Returns:** [CmpData](cmpdata.md)

___

## Accessors

<a id="tcmodelisset"></a>

###  tcModelIsSet

**get tcModelIsSet**(): `boolean`

*Defined in [cmpdata/CmpData.ts:63](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L63)*

Returns true if the TcModel has been set

**Returns:** `boolean`

___

## Methods

<a id="getapiversion"></a>

###  getApiVersion

▸ **getApiVersion**(): `number`

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getApiVersion](../interfaces/cmpdatareader.md#getapiversion)*

*Defined in [cmpdata/CmpData.ts:107](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L107)*

Gets the Api Version

**Returns:** `number`

___
<a id="getcmpid"></a>

###  getCmpId

▸ **getCmpId**(): `number`

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getCmpId](../interfaces/cmpdatareader.md#getcmpid)*

*Defined in [cmpdata/CmpData.ts:127](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L127)*

Gets the Cmp ID

**Returns:** `number`

___
<a id="getcmpstatus"></a>

###  getCmpStatus

▸ **getCmpStatus**(): [CmpStatus](../enums/cmpstatus.md)

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getCmpStatus](../interfaces/cmpdatareader.md#getcmpstatus)*

*Defined in [cmpdata/CmpData.ts:227](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L227)*

Gets the CMP Status

**Returns:** [CmpStatus](../enums/cmpstatus.md)

___
<a id="getcmpversion"></a>

###  getCmpVersion

▸ **getCmpVersion**(): `number`

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getCmpVersion](../interfaces/cmpdatareader.md#getcmpversion)*

*Defined in [cmpdata/CmpData.ts:147](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L147)*

Gets the Cmp Version

**Returns:** `number`

___
<a id="getdisplaystatus"></a>

###  getDisplayStatus

▸ **getDisplayStatus**(): [DisplayStatus](../enums/displaystatus.md)

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getDisplayStatus](../interfaces/cmpdatareader.md#getdisplaystatus)*

*Defined in [cmpdata/CmpData.ts:247](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L247)*

Gets the current Display Status

**Returns:** [DisplayStatus](../enums/displaystatus.md)

___
<a id="geteventstatus"></a>

###  getEventStatus

▸ **getEventStatus**(): [EventStatus](../enums/eventstatus.md)

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getEventStatus](../interfaces/cmpdatareader.md#geteventstatus)*

*Defined in [cmpdata/CmpData.ts:207](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L207)*

Returns the current event status

**Returns:** [EventStatus](../enums/eventstatus.md)

___
<a id="getgdprapplies"></a>

###  getGdprApplies

▸ **getGdprApplies**(): `boolean`

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getGdprApplies](../interfaces/cmpdatareader.md#getgdprapplies)*

*Defined in [cmpdata/CmpData.ts:187](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L187)*

Returns the current value for GDPR Applies

**Returns:** `boolean`

___
<a id="gettcmodel"></a>

###  getTcModel

▸ **getTcModel**(): `TCModel`

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getTcModel](../interfaces/cmpdatareader.md#gettcmodel)*

*Defined in [cmpdata/CmpData.ts:73](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L73)*

Returns the current TcModel

**Returns:** `TCModel`

___
<a id="gettcfpolicyversion"></a>

###  getTcfPolicyVersion

▸ **getTcfPolicyVersion**(): `number`

*Implementation of [CmpDataReader](../interfaces/cmpdatareader.md).[getTcfPolicyVersion](../interfaces/cmpdatareader.md#gettcfpolicyversion)*

*Defined in [cmpdata/CmpData.ts:167](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L167)*

Gets the TCF Policy Version

**Returns:** `number`

___
<a id="registertcmodelchangeeventcallback"></a>

###  registerTcModelChangeEventCallback

▸ **registerTcModelChangeEventCallback**(tcModelChangeCallback: *[TcModelChangeEventHandler](../#tcmodelchangeeventhandler)*): `void`

*Defined in [cmpdata/CmpData.ts:54](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L54)*

Register a {TcModelChangeEventHandler} to be evoked when ever TcModel is updated.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModelChangeCallback | [TcModelChangeEventHandler](../#tcmodelchangeeventhandler) |  \- |

**Returns:** `void`

___
<a id="setapiversion"></a>

###  setApiVersion

▸ **setApiVersion**(value: *`number`*): `void`

*Defined in [cmpdata/CmpData.ts:117](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L117)*

Sets the Api Version

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `number` |   |

**Returns:** `void`

___
<a id="setcmpid"></a>

###  setCmpId

▸ **setCmpId**(value: *`number`*): `void`

*Defined in [cmpdata/CmpData.ts:137](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L137)*

Sets the Cmp ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `number` |   |

**Returns:** `void`

___
<a id="setcmpstatus"></a>

###  setCmpStatus

▸ **setCmpStatus**(value: *[CmpStatus](../enums/cmpstatus.md)*): `void`

*Defined in [cmpdata/CmpData.ts:237](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L237)*

Sets the CMP Status

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | [CmpStatus](../enums/cmpstatus.md) |   |

**Returns:** `void`

___
<a id="setcmpversion"></a>

###  setCmpVersion

▸ **setCmpVersion**(value: *`number`*): `void`

*Defined in [cmpdata/CmpData.ts:157](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L157)*

Sets the Cmp Version

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `number` |   |

**Returns:** `void`

___
<a id="setdisplaystatus"></a>

###  setDisplayStatus

▸ **setDisplayStatus**(value: *[DisplayStatus](../enums/displaystatus.md)*): `void`

*Defined in [cmpdata/CmpData.ts:257](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L257)*

Sets the current Display Status

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | [DisplayStatus](../enums/displaystatus.md) |   |

**Returns:** `void`

___
<a id="seteventstatus"></a>

###  setEventStatus

▸ **setEventStatus**(value: *[EventStatus](../enums/eventstatus.md)*): `void`

*Defined in [cmpdata/CmpData.ts:217](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L217)*

Sets the event status

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | [EventStatus](../enums/eventstatus.md) |   |

**Returns:** `void`

___
<a id="setgdprapplies"></a>

###  setGdprApplies

▸ **setGdprApplies**(value: *`boolean`*): `void`

*Defined in [cmpdata/CmpData.ts:197](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L197)*

Sets the value for GDPR Applies

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `boolean` |   |

**Returns:** `void`

___
<a id="settcmodel"></a>

###  setTCModel

▸ **setTCModel**(tcModel: *`TCModel`*, eventStatus?: *[EventStatus](../enums/eventstatus.md)*): `void`

*Defined in [cmpdata/CmpData.ts:86](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L86)*

Sets clone of TcModel and EventStatus Todo: I think we might want to force the event status. Ask chris.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | `TCModel` |  \- |
| `Optional` eventStatus | [EventStatus](../enums/eventstatus.md) |  \- |

**Returns:** `void`

___
<a id="settcfpolicyversion"></a>

###  setTcfPolicyVersion

▸ **setTcfPolicyVersion**(value: *`number`*): `void`

*Defined in [cmpdata/CmpData.ts:177](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpData.ts#L177)*

Sets the TCF Policy Version

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `number` |   |

**Returns:** `void`

___

