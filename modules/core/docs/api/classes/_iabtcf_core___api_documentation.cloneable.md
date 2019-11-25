[@iabtcf/core - API Documentation](../README.md) > [Cloneable](../classes/_iabtcf_core___api_documentation.cloneable.md)

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

↳  [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

↳  [PurposeRestrictionVector](_iabtcf_core___api_documentation.purposerestrictionvector.md)

↳  [Vector](_iabtcf_core___api_documentation.vector.md)

↳  [GVL](_iabtcf_core___api_documentation.gvl.md)

↳  [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

## Index

### Constructors

* [constructor](_iabtcf_core___api_documentation.cloneable.md#constructor)

### Methods

* [clone](_iabtcf_core___api_documentation.cloneable.md#clone)

---

## Constructors

<a id="constructor"></a>

### `<Protected>` constructor

⊕ **new Cloneable**(childConstructor: *[AnyConstructor](../interfaces/_iabtcf_core___api_documentation.anyconstructor.md)<`T`>*): [Cloneable](_iabtcf_core___api_documentation.cloneable.md)

*Defined in [src/cloneable/Cloneable.ts:34](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L34)*

Constructor

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| childConstructor | [AnyConstructor](../interfaces/_iabtcf_core___api_documentation.anyconstructor.md)<`T`> |   |

**Returns:** [Cloneable](_iabtcf_core___api_documentation.cloneable.md)

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): `T`

*Defined in [src/cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L52)*

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

*Defined in [src/cloneable/Cloneable.ts:29](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L29)*

Child class must implement the clone() method

**Returns:** `T`

___

