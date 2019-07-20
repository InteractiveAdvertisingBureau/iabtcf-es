[@iabtcf/core - API Documentation](../README.md) > [Vector](../classes/vector.md)

# Class: Vector

Vector class is like a Set except it keeps track of a max id

## Hierarchy

**Vector**

## Index

### Constructors

* [constructor](vector.md#constructor)

### Accessors

* [maxId](vector.md#maxid)

### Methods

* [empty](vector.md#empty)
* [forEach](vector.md#foreach)
* [has](vector.md#has)
* [set](vector.md#set)
* [unset](vector.md#unset)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Vector**(ids?: *[idOrIds](../#idorids)*): [Vector](vector.md)

*Defined in [model/Vector.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L14)*

constructor

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` ids | [idOrIds](../#idorids) |

**Returns:** [Vector](vector.md)

___

## Accessors

<a id="maxid"></a>

###  maxId

**get maxId**(): `number`

*Defined in [model/Vector.ts:37](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L37)*

maxId

**Returns:** `number`
*   the highest id in this Vector

___

## Methods

<a id="empty"></a>

###  empty

▸ **empty**(): `void`

*Defined in [model/Vector.ts:123](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L123)*

**Returns:** `void`

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callback: *`function`*): `void`

*Defined in [model/Vector.ts:140](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L140)*

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

*Defined in [model/Vector.ts:49](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L49)*

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

*Defined in [model/Vector.ts:100](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L100)*

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

*Defined in [model/Vector.ts:63](https://github.com/chrispaterson/iabtcf-es/blob/1e10023/modules/core/src/model/Vector.ts#L63)*

unset

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | [idOrIds](../#idorids) |  id or ids to unset |

**Returns:** `void`

___

