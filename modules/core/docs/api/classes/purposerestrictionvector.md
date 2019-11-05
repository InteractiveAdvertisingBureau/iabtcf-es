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

*Defined in [model/PurposeRestrictionVector.ts:205](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L205)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Returns:** [GVL](gvl.md)

*Defined in [model/PurposeRestrictionVector.ts:170](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L170)*

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

*Defined in [model/PurposeRestrictionVector.ts:222](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L222)*

**Returns:** `number`

___

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:86](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L86)*

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

*Defined in [model/PurposeRestrictionVector.ts:130](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L130)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:112](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L112)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:104](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L104)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:211](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L211)*

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:216](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L216)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:144](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/PurposeRestrictionVector.ts#L144)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

