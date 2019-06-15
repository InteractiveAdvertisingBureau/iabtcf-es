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

*Defined in model/Vector.ts:8*

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

*Defined in model/Vector.ts:8*

___

## Accessors

<a id="maxid"></a>

###  maxId

**get maxId**(): `number`

*Defined in model/Vector.ts:64*

**Returns:** `number`
the highest id passed set on this Vector

___

## Methods

<a id="get"></a>

###  get

▸ **get**(id: *`number`*): `T` \| `undefined`

*Defined in model/Vector.ts:70*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `T` \| `undefined`

___
<a id="has"></a>

###  has

▸ **has**(id: *`number`*): `boolean`

*Defined in model/Vector.ts:76*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `boolean`

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in model/Vector.ts:94*

**Returns:** `boolean`

___
<a id="keys"></a>

###  keys

▸ **keys**(): `Iterator`<`number`>

*Defined in model/Vector.ts:82*

**Returns:** `Iterator`<`number`>

___
<a id="set"></a>

###  set

▸ **set**(id: *`number`*, value: *`T`*): `void`

*Defined in model/Vector.ts:49*

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

*Defined in model/Vector.ts:88*

**Returns:** `Iterator`<`T`>

___

