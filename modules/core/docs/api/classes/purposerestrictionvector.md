[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

**PurposeRestrictionVector**

## Index

### Accessors

* [gvl](purposerestrictionvector.md#gvl)
* [numRestrictions](purposerestrictionvector.md#numrestrictions)

### Methods

* [add](purposerestrictionvector.md#add)
* [getAllRestrictions](purposerestrictionvector.md#getallrestrictions)
* [getRestriction](purposerestrictionvector.md#getrestriction)
* [getVendors](purposerestrictionvector.md#getvendors)
* [isEmpty](purposerestrictionvector.md#isempty)
* [isValid](purposerestrictionvector.md#isvalid)
* [remove](purposerestrictionvector.md#remove)

---

## Accessors

<a id="gvl"></a>

###  gvl

**get gvl**(): [GVL](gvl.md)

**set gvl**(value: *[GVL](gvl.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:210](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L210)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Returns:** [GVL](gvl.md)

*Defined in [model/PurposeRestrictionVector.ts:175](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L175)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | [GVL](gvl.md) |  the GVL instance |

**Returns:** `void`

___
<a id="numrestrictions"></a>

###  numRestrictions

**get numRestrictions**(): `number`

*Defined in [model/PurposeRestrictionVector.ts:227](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L227)*

**Returns:** `number`

___

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:90](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L90)*

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

*Defined in [model/PurposeRestrictionVector.ts:135](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L135)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:117](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L117)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:109](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L109)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:216](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L216)*

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:221](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L221)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:149](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/model/PurposeRestrictionVector.ts#L149)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

