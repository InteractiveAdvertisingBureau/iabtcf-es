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

*Defined in [model/PurposeRestrictionVector.ts:206](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L206)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Returns:** [GVL](gvl.md)

*Defined in [model/PurposeRestrictionVector.ts:171](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L171)*

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

*Defined in [model/PurposeRestrictionVector.ts:223](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L223)*

**Returns:** `number`

___

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:86](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L86)*

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

*Defined in [model/PurposeRestrictionVector.ts:131](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L131)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:113](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L113)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:105](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L105)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:212](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L212)*

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:217](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L217)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:145](https://github.com/chrispaterson/iabtcf-es/blob/5097780/modules/core/src/model/PurposeRestrictionVector.ts#L145)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

