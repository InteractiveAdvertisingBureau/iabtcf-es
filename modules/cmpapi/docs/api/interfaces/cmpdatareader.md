[@iabtcf/cmpapi - API Documentation](../README.md) > [CmpDataReader](../interfaces/cmpdatareader.md)

# Interface: CmpDataReader

CmpDataReader interface is used to define the methods used to read data from CmpData and restrict access to set methods where applicable.

## Hierarchy

**CmpDataReader**

## Implemented by

* [CmpData](../classes/cmpdata.md)

## Index

### Properties

* [tcModelIsSet](cmpdatareader.md#tcmodelisset)

### Methods

* [getApiVersion](cmpdatareader.md#getapiversion)
* [getCmpId](cmpdatareader.md#getcmpid)
* [getCmpStatus](cmpdatareader.md#getcmpstatus)
* [getCmpVersion](cmpdatareader.md#getcmpversion)
* [getDisplayStatus](cmpdatareader.md#getdisplaystatus)
* [getEventStatus](cmpdatareader.md#geteventstatus)
* [getGdprApplies](cmpdatareader.md#getgdprapplies)
* [getTcModel](cmpdatareader.md#gettcmodel)
* [getTcfPolicyVersion](cmpdatareader.md#gettcfpolicyversion)
* [registerTcModelChangeEventCallback](cmpdatareader.md#registertcmodelchangeeventcallback)

---

## Properties

<a id="tcmodelisset"></a>

###  tcModelIsSet

**● tcModelIsSet**: *`boolean`*

*Defined in [cmpdata/CmpDataReader.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L9)*

___

## Methods

<a id="getapiversion"></a>

###  getApiVersion

▸ **getApiVersion**(): `number`

*Defined in [cmpdata/CmpDataReader.ts:15](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L15)*

**Returns:** `number`

___
<a id="getcmpid"></a>

###  getCmpId

▸ **getCmpId**(): `number`

*Defined in [cmpdata/CmpDataReader.ts:17](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L17)*

**Returns:** `number`

___
<a id="getcmpstatus"></a>

###  getCmpStatus

▸ **getCmpStatus**(): [CmpStatus](../enums/cmpstatus.md)

*Defined in [cmpdata/CmpDataReader.ts:27](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L27)*

**Returns:** [CmpStatus](../enums/cmpstatus.md)

___
<a id="getcmpversion"></a>

###  getCmpVersion

▸ **getCmpVersion**(): `number`

*Defined in [cmpdata/CmpDataReader.ts:19](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L19)*

**Returns:** `number`

___
<a id="getdisplaystatus"></a>

###  getDisplayStatus

▸ **getDisplayStatus**(): [DisplayStatus](../enums/displaystatus.md)

*Defined in [cmpdata/CmpDataReader.ts:29](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L29)*

**Returns:** [DisplayStatus](../enums/displaystatus.md)

___
<a id="geteventstatus"></a>

###  getEventStatus

▸ **getEventStatus**(): [EventStatus](../enums/eventstatus.md)

*Defined in [cmpdata/CmpDataReader.ts:25](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L25)*

**Returns:** [EventStatus](../enums/eventstatus.md)

___
<a id="getgdprapplies"></a>

###  getGdprApplies

▸ **getGdprApplies**(): `boolean`

*Defined in [cmpdata/CmpDataReader.ts:23](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L23)*

**Returns:** `boolean`

___
<a id="gettcmodel"></a>

###  getTcModel

▸ **getTcModel**(): `TCModel`

*Defined in [cmpdata/CmpDataReader.ts:13](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L13)*

**Returns:** `TCModel`

___
<a id="gettcfpolicyversion"></a>

###  getTcfPolicyVersion

▸ **getTcfPolicyVersion**(): `number`

*Defined in [cmpdata/CmpDataReader.ts:21](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L21)*

**Returns:** `number`

___
<a id="registertcmodelchangeeventcallback"></a>

###  registerTcModelChangeEventCallback

▸ **registerTcModelChangeEventCallback**(tcModelChangeCallback: *`function`*): `void`

*Defined in [cmpdata/CmpDataReader.ts:11](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/cmpdata/CmpDataReader.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tcModelChangeCallback | `function` |

**Returns:** `void`

___

