[@iabtcf/core - API Documentation](../README.md) > [Vector](../classes/_iabtcf_core___api_documentation.vector.md)

# Class: Vector

Vector class is like a Set except it keeps track of a max id

## Hierarchy

 [Cloneable](_iabtcf_core___api_documentation.cloneable.md)<[Vector](_iabtcf_core___api_documentation.vector.md)>

**↳ Vector**

## Index

### Constructors

* [constructor](_iabtcf_core___api_documentation.vector.md#constructor)

### Properties

* [bitLength](_iabtcf_core___api_documentation.vector.md#bitlength)

### Accessors

* [maxId](_iabtcf_core___api_documentation.vector.md#maxid)
* [size](_iabtcf_core___api_documentation.vector.md#size)

### Methods

* [clone](_iabtcf_core___api_documentation.vector.md#clone)
* [empty](_iabtcf_core___api_documentation.vector.md#empty)
* [forEach](_iabtcf_core___api_documentation.vector.md#foreach)
* [has](_iabtcf_core___api_documentation.vector.md#has)
* [set](_iabtcf_core___api_documentation.vector.md#set)
* [unset](_iabtcf_core___api_documentation.vector.md#unset)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Vector**(ids?: *[idOrIds](../#idorids)*): [Vector](_iabtcf_core___api_documentation.vector.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[constructor](_iabtcf_core___api_documentation.cloneable.md#constructor)*

*Defined in [src/model/Vector.ts:20](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L20)*

constructor

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` ids | [idOrIds](../#idorids) |

**Returns:** [Vector](_iabtcf_core___api_documentation.vector.md)

___

## Properties

<a id="bitlength"></a>

###  bitLength

**● bitLength**: *`number`* = 0

*Defined in [src/model/Vector.ts:15](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L15)*

if this originatd from an encoded string we'll need a place to store the bit length; it can be set and got from here

___

## Accessors

<a id="maxid"></a>

###  maxId

**get maxId**(): `number`

*Defined in [src/model/Vector.ts:55](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L55)*

maxId

**Returns:** `number`
*   the highest id in this Vector

___
<a id="size"></a>

###  size

**get size**(): `number`

*Defined in [src/model/Vector.ts:177](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L177)*

**Returns:** `number`

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [Vector](_iabtcf_core___api_documentation.vector.md)

*Inherited from [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[_clone](_iabtcf_core___api_documentation.cloneable.md#_clone)*

*Defined in [src/cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [Vector](_iabtcf_core___api_documentation.vector.md)

___
<a id="clone"></a>

###  clone

▸ **clone**(): [Vector](_iabtcf_core___api_documentation.vector.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[clone](_iabtcf_core___api_documentation.cloneable.md#clone)*

*Defined in [src/model/Vector.ts:44](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L44)*

Creates a clone of this Vector

**Returns:** [Vector](_iabtcf_core___api_documentation.vector.md)

___
<a id="empty"></a>

###  empty

▸ **empty**(): `void`

*Defined in [src/model/Vector.ts:150](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L150)*

**Returns:** `void`

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callback: *`function`*): `void`

*Defined in [src/model/Vector.ts:167](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L167)*

forEach - to traverse from id=1 to id=maxId in a sequential non-sparse manner

*__callback__*: forEachCallback

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callback | `function` |  callback to execute |

**Returns:** `void`

___
<a id="has"></a>

###  has

▸ **has**(id: *`number`*): `boolean`

*Defined in [src/model/Vector.ts:67](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L67)*

get

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `number` |  key for value to check |

**Returns:** `boolean`
*   value of that key, if never set it will be false

___
<a id="set"></a>

###  set

▸ **set**(id: *[idOrIds](../#idorids)*): `void`

*Defined in [src/model/Vector.ts:123](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L123)*

set - sets an id assumed to be a truthy value by its presence

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | [idOrIds](../#idorids) |  id to set a value for or array of ids to include |

**Returns:** `void`

___
<a id="unset"></a>

###  unset

▸ **unset**(id: *[idOrIds](../#idorids)*): `void`

*Defined in [src/model/Vector.ts:81](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L81)*

unset

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | [idOrIds](../#idorids) |  id or ids to unset |

**Returns:** `void`

___

