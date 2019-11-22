[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/_iabtcf_core___api_documentation.purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

 [Cloneable](_iabtcf_core___api_documentation.cloneable.md)<[PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)>

**↳ PurposeRestrictionVector**

## Index

### Constructors

* [constructor](_iabtcf_core___api_documentation.purposerestrictionvector.md#constructor)

### Properties

* [bitLength](_iabtcf_core___api_documentation.purposerestrictionvector.md#bitlength)

### Accessors

* [gvl](_iabtcf_core___api_documentation.purposerestrictionvector.md#gvl)
* [numRestrictions](_iabtcf_core___api_documentation.purposerestrictionvector.md#numrestrictions)

### Methods

* [add](_iabtcf_core___api_documentation.purposerestrictionvector.md#add)
* [clone](_iabtcf_core___api_documentation.purposerestrictionvector.md#clone)
* [getAllRestrictions](_iabtcf_core___api_documentation.purposerestrictionvector.md#getallrestrictions)
* [getRestriction](_iabtcf_core___api_documentation.purposerestrictionvector.md#getrestriction)
* [getVendors](_iabtcf_core___api_documentation.purposerestrictionvector.md#getvendors)
* [isEmpty](_iabtcf_core___api_documentation.purposerestrictionvector.md#isempty)
* [isValid](_iabtcf_core___api_documentation.purposerestrictionvector.md#isvalid)
* [remove](_iabtcf_core___api_documentation.purposerestrictionvector.md#remove)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PurposeRestrictionVector**(): [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[constructor](_iabtcf_core___api_documentation.cloneable.md#constructor)*

*Defined in [src/model/PurposeRestrictionVector.ts:23](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L23)*

**Returns:** [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

___

## Properties

<a id="bitlength"></a>

###  bitLength

**● bitLength**: *`number`* = 0

*Defined in [src/model/PurposeRestrictionVector.ts:14](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L14)*

if this originatd from an encoded string we'll need a place to store the bit length; it can be set and got from here

___

## Accessors

<a id="gvl"></a>

###  gvl

**get gvl**(): [GVL](_iabtcf_core___api_documentation.gvl.md)

**set gvl**(value: *[GVL](_iabtcf_core___api_documentation.gvl.md)*): `void`

*Defined in [src/model/PurposeRestrictionVector.ts:225](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L225)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Returns:** [GVL](_iabtcf_core___api_documentation.gvl.md)

*Defined in [src/model/PurposeRestrictionVector.ts:190](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L190)*

Essential for being able to determine whether we can actually set a purpose restriction since they have to have a flexible legal basis

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | [GVL](_iabtcf_core___api_documentation.gvl.md) |  the GVL instance |

**Returns:** `void`

___
<a id="numrestrictions"></a>

###  numRestrictions

**get numRestrictions**(): `number`

*Defined in [src/model/PurposeRestrictionVector.ts:242](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L242)*

**Returns:** `number`

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

*Inherited from [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[_clone](_iabtcf_core___api_documentation.cloneable.md#_clone)*

*Defined in [src/cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

___
<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)*): `void`

*Defined in [src/model/PurposeRestrictionVector.ts:104](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L104)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md) |

**Returns:** `void`

___
<a id="clone"></a>

###  clone

▸ **clone**(): [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[clone](_iabtcf_core___api_documentation.cloneable.md#clone)*

*Defined in [src/model/PurposeRestrictionVector.ts:35](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L35)*

Creates a clone of this PurposeRestrictionVector

**Returns:** [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

___
<a id="getallrestrictions"></a>

###  getAllRestrictions

▸ **getAllRestrictions**(): [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)[]

*Defined in [src/model/PurposeRestrictionVector.ts:149](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L149)*

**Returns:** [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)[]

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)[]

*Defined in [src/model/PurposeRestrictionVector.ts:131](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L131)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)*): `number`[]

*Defined in [src/model/PurposeRestrictionVector.ts:123](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L123)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md) |

**Returns:** `number`[]

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [src/model/PurposeRestrictionVector.ts:231](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L231)*

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [src/model/PurposeRestrictionVector.ts:236](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L236)*

**Returns:** `boolean`

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)*): `void`

*Defined in [src/model/PurposeRestrictionVector.ts:163](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestrictionVector.ts#L163)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md) |

**Returns:** `void`

___

