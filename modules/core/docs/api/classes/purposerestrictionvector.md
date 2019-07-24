[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

**PurposeRestrictionVector**

## Index

### Accessors

* [numRestrictions](purposerestrictionvector.md#numrestrictions)

### Methods

* [add](purposerestrictionvector.md#add)
* [getAllRestrictions](purposerestrictionvector.md#getallrestrictions)
* [getRestriction](purposerestrictionvector.md#getrestriction)
* [getVendors](purposerestrictionvector.md#getvendors)
* [isEmpty](purposerestrictionvector.md#isempty)
* [remove](purposerestrictionvector.md#remove)

---

## Accessors

<a id="numrestrictions"></a>

###  numRestrictions

**get numRestrictions**(): `number`

*Defined in [model/PurposeRestrictionVector.ts:111](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L111)*

**Returns:** `number`

___

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:33](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___
<a id="getallrestrictions"></a>

###  getAllRestrictions

▸ **getAllRestrictions**(): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:73](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L73)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:55](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:47](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:106](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L106)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:87](https://github.com/chrispaterson/iabtcf-es/blob/42cb912/modules/core/src/model/PurposeRestrictionVector.ts#L87)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

