[@iabtcf/core - API Documentation](../README.md) > [Vector](../classes/vector.md)

# Class: Vector

## Type parameters
#### T 
## Hierarchy

**Vector**

## Index

### Constructors

* [constructor](vector.md#constructor)

### Accessors

* [length](vector.md#length)

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

⊕ **new Vector**(gvl?: *[GVL](gvl.md)*, vectorPath?: *[VectorPath](../enums/vectorpath.md)*, initValue?: *[T]()*): [Vector](vector.md)

*Defined in [Vector.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L6)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` gvl | [GVL](gvl.md) |
| `Optional` vectorPath | [VectorPath](../enums/vectorpath.md) |
| `Optional` initValue | [T]() |

**Returns:** [Vector](vector.md)

___

## Accessors

<a id="length"></a>

###  length

**get length**(): `number`

*Defined in [Vector.ts:60](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L60)*

**Returns:** `number`
the highest id passed set on this Vector

___

## Methods

<a id="get"></a>

###  get

▸ **get**(id: *`number`*): `T` \| `undefined`

*Defined in [Vector.ts:66](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `T` \| `undefined`

___
<a id="has"></a>

###  has

▸ **has**(id: *`number`*): `boolean`

*Defined in [Vector.ts:72](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L72)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `boolean`

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [Vector.ts:90](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L90)*

**Returns:** `boolean`

___
<a id="keys"></a>

###  keys

▸ **keys**(): `Iterator`<`number`>

*Defined in [Vector.ts:78](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L78)*

**Returns:** `Iterator`<`number`>

___
<a id="set"></a>

###  set

▸ **set**(id: *`number`*, value: *`T`*): `void`

*Defined in [Vector.ts:45](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L45)*

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

*Defined in [Vector.ts:84](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Vector.ts#L84)*

**Returns:** `Iterator`<`T`>

___

