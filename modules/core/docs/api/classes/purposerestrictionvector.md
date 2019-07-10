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
* [getRestrictions](purposerestrictionvector.md#getrestrictions)
* [getVendors](purposerestrictionvector.md#getvendors)
* [isEmpty](purposerestrictionvector.md#isempty)
* [remove](purposerestrictionvector.md#remove)

---

## Accessors

<a id="numrestrictions"></a>

###  numRestrictions

**get numRestrictions**(): `number`

*Defined in [model/PurposeRestrictionVector.ts:108](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L108)*

**Returns:** `number`

___

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:30](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L30)*

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

*Defined in [model/PurposeRestrictionVector.ts:70](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L70)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getrestrictions"></a>

###  getRestrictions

▸ **getRestrictions**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:52](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:44](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:103](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L103)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:84](https://github.com/chrispaterson/iabtcf-es/blob/2c1666e/modules/core/src/model/PurposeRestrictionVector.ts#L84)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

