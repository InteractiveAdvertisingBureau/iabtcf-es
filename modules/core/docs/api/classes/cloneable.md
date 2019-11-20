[@iabtcf/core - API Documentation](../README.md) > [Cloneable](../classes/cloneable.md)

# Class: Cloneable

Abstract Class Cloneable can be extended to give the child class the ability to clone its self. The child class must pass its class to super. You can then pass any needed arguments to help build the cloned class to the protected \_clone() method.

Example:

class Example extends Cloneable {

public constructor() { super(Example); }

public clone(): Example { // if you have arguments that must be passed to constructor, pass them here. return this.\_clone(); } } Todo: There must be more non primitive build in types to check. But for our current purposes, this works great.

## Type parameters
#### T 
## Hierarchy

**Cloneable**

↳  [PurposeRestriction](purposerestriction.md)

↳  [PurposeRestrictionVector](purposerestrictionvector.md)

↳  [Vector](vector.md)

↳  [GVL](gvl.md)

↳  [TCModel](tcmodel.md)

## Index

### Constructors

* [constructor](cloneable.md#constructor)

### Methods

* [clone](cloneable.md#clone)

---

## Constructors

<a id="constructor"></a>

### `<Protected>` constructor

⊕ **new Cloneable**(childConstructor: *[AnyConstructor](../interfaces/anyconstructor.md)<`T`>*): [Cloneable](cloneable.md)

*Defined in [cloneable/Cloneable.ts:34](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/cloneable/Cloneable.ts#L34)*

Constructor

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| childConstructor | [AnyConstructor](../interfaces/anyconstructor.md)<`T`> |   |

**Returns:** [Cloneable](cloneable.md)

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): `T`

*Defined in [cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** `T`

___
<a id="clone"></a>

### `<Abstract>` clone

▸ **clone**(): `T`

*Defined in [cloneable/Cloneable.ts:29](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/cloneable/Cloneable.ts#L29)*

Child class must implement the clone() method

**Returns:** `T`

___

