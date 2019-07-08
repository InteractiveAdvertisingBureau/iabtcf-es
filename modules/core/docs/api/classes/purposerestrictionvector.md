[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

**PurposeRestrictionVector**

## Index

### Methods

* [add](purposerestrictionvector.md#add)
* [forEach](purposerestrictionvector.md#foreach)
* [getAllRestrictions](purposerestrictionvector.md#getallrestrictions)
* [getMaxVendor](purposerestrictionvector.md#getmaxvendor)
* [getMinVendor](purposerestrictionvector.md#getminvendor)
* [getRestrictions](purposerestrictionvector.md#getrestrictions)
* [getVendors](purposerestrictionvector.md#getvendors)
* [isEmpty](purposerestrictionvector.md#isempty)
* [remove](purposerestrictionvector.md#remove)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*, callback: *`function`*): `void`

*Defined in [model/PurposeRestrictionVector.ts:88](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L88)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |
| callback | `function` |

**Returns:** `void`

___
<a id="getallrestrictions"></a>

###  getAllRestrictions

▸ **getAllRestrictions**(): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:58](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L58)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getmaxvendor"></a>

###  getMaxVendor

▸ **getMaxVendor**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number` \| `undefined`

*Defined in [model/PurposeRestrictionVector.ts:72](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L72)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number` \| `undefined`

___
<a id="getminvendor"></a>

###  getMinVendor

▸ **getMinVendor**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number` \| `undefined`

*Defined in [model/PurposeRestrictionVector.ts:80](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L80)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number` \| `undefined`

___
<a id="getrestrictions"></a>

###  getRestrictions

▸ **getRestrictions**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:40](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:32](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:116](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L116)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:97](https://github.com/chrispaterson/iabtcf-es/blob/7542805/modules/core/src/model/PurposeRestrictionVector.ts#L97)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

