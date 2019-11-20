[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

 [Cloneable](cloneable.md)<[PurposeRestrictionVector](purposerestrictionvector.md)>

**↳ PurposeRestrictionVector**

## Index

### Constructors

* [constructor](purposerestrictionvector.md#constructor)

### Properties

* [bitLength](purposerestrictionvector.md#bitlength)

### Accessors

* [gvl](purposerestrictionvector.md#gvl)
* [numRestrictions](purposerestrictionvector.md#numrestrictions)

### Methods

* [add](purposerestrictionvector.md#add)
* [clone](purposerestrictionvector.md#clone)
* [getAllRestrictions](purposerestrictionvector.md#getallrestrictions)
* [getRestriction](purposerestrictionvector.md#getrestriction)
* [getVendors](purposerestrictionvector.md#getvendors)
* [isEmpty](purposerestrictionvector.md#isempty)
* [isValid](purposerestrictionvector.md#isvalid)
* [remove](purposerestrictionvector.md#remove)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PurposeRestrictionVector**(): [PurposeRestrictionVector](purposerestrictionvector.md)

*Overrides [Cloneable](cloneable.md).[constructor](cloneable.md#constructor)*

*Defined in [model/PurposeRestrictionVector.ts:23](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L23)*

**Returns:** [PurposeRestrictionVector](purposerestrictionvector.md)

___

## Properties

<a id="bitlength"></a>

###  bitLength

**● bitLength**: *`number`* = 0

*Defined in [model/PurposeRestrictionVector.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L14)*

if this originatd from an encoded string we'll need a place to store the bit length; it can be set and got from here

___

## Accessors

<a id="gvl"></a>

###  gvl

**get gvl**(): [GVL](gvl.md)

**set gvl**(value: *[GVL](gvl.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:225](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L225)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Returns:** [GVL](gvl.md)

*Defined in [model/PurposeRestrictionVector.ts:190](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L190)*

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

*Defined in [model/PurposeRestrictionVector.ts:242](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L242)*

**Returns:** `number`

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [PurposeRestrictionVector](purposerestrictionvector.md)

*Inherited from [Cloneable](cloneable.md).[_clone](cloneable.md#_clone)*

*Defined in [cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [PurposeRestrictionVector](purposerestrictionvector.md)

___
<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:104](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L104)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___
<a id="clone"></a>

###  clone

▸ **clone**(): [PurposeRestrictionVector](purposerestrictionvector.md)

*Overrides [Cloneable](cloneable.md).[clone](cloneable.md#clone)*

*Defined in [model/PurposeRestrictionVector.ts:35](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L35)*

Creates a clone of this PurposeRestrictionVector

**Returns:** [PurposeRestrictionVector](purposerestrictionvector.md)

___
<a id="getallrestrictions"></a>

###  getAllRestrictions

▸ **getAllRestrictions**(): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:149](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L149)*

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:131](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L131)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:123](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L123)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:231](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L231)*

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [model/PurposeRestrictionVector.ts:236](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L236)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:163](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestrictionVector.ts#L163)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

