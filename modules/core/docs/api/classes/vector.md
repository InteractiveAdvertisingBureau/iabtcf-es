[@iabtcf/core - API Documentation](../README.md) > [Vector](../classes/vector.md)

# Class: Vector

## Type parameters
#### T 
## Hierarchy

**Vector**

## Index

### Constructors

* [constructor](vector.md#constructor)

### Properties

* [path](vector.md#path)

### Accessors

* [maxId](vector.md#maxid)

### Methods

* [get](vector.md#get)
* [has](vector.md#has)
* [isEmpty](vector.md#isempty)
* [keys](vector.md#keys)
* [set](vector.md#set)
* [values](vector.md#values)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Vector**(gvl?: *[GVL](gvl.md)*, path?: *[VectorPath](../enums/vectorpath.md)*, initValue?: *[T]()*): [Vector](vector.md)

*Defined in [Vector.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](gvl.md) |
| `Optional` path | [VectorPath](../enums/vectorpath.md) |
| `Optional` initValue | [T]() |

**Returns:** [Vector](vector.md)

___

## Properties

<a id="path"></a>

###  path

**● path**: *[VectorPath](../enums/vectorpath.md)*

*Defined in [Vector.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L8)*

___

## Accessors

<a id="maxid"></a>

###  maxId

**get maxId**(): `number`

*Defined in [Vector.ts:64](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L64)*

**Returns:** `number`
the highest id passed set on this Vector

___

## Methods

<a id="get"></a>

###  get

▸ **get**(id: *`number`*): `T` \| `undefined`

*Defined in [Vector.ts:70](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `T` \| `undefined`

___
<a id="has"></a>

###  has

▸ **has**(id: *`number`*): `boolean`

*Defined in [Vector.ts:76](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L76)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `boolean`

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [Vector.ts:94](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L94)*

**Returns:** `boolean`

___
<a id="keys"></a>

###  keys

▸ **keys**(): `Iterator`<`number`>

*Defined in [Vector.ts:82](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L82)*

**Returns:** `Iterator`<`number`>

___
<a id="set"></a>

###  set

▸ **set**(id: *`number`*, value: *`T`*): `void`

*Defined in [Vector.ts:49](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |
| value | `T` |

**Returns:** `void`

___
<a id="values"></a>

###  values

▸ **values**(): `Iterator`<`T`>

*Defined in [Vector.ts:88](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/Vector.ts#L88)*

**Returns:** `Iterator`<`T`>

___

