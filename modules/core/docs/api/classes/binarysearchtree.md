[@iabtcf/core - API Documentation](../README.md) > [BinarySearchTree](../classes/binarysearchtree.md)

# Class: BinarySearchTree

## Hierarchy

**BinarySearchTree**

## Index

### Methods

* [add](binarysearchtree.md#add)
* [contains](binarysearchtree.md#contains)
* [get](binarysearchtree.md#get)
* [isEmpty](binarysearchtree.md#isempty)
* [max](binarysearchtree.md#max)
* [min](binarysearchtree.md#min)
* [remove](binarysearchtree.md#remove)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(value: *`number`*): `void`

*Defined in [model/BinarySearchTree.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `void`

___
<a id="contains"></a>

###  contains

▸ **contains**(value: *`number`*): `boolean`

*Defined in [model/BinarySearchTree.ts:159](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L159)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `boolean`

___
<a id="get"></a>

###  get

▸ **get**(): `number`[]

*Defined in [model/BinarySearchTree.ts:110](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L110)*

performs Morris in-order traversal

**Returns:** `number`[]
sorted array

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/BinarySearchTree.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L11)*

**Returns:** `boolean`

___
<a id="max"></a>

###  max

▸ **max**(current?: *[TreeNodeMaybe](../#treenodemaybe)*): `number`

*Defined in [model/BinarySearchTree.ts:208](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L208)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` current | [TreeNodeMaybe](../#treenodemaybe) |  this.root |

**Returns:** `number`

___
<a id="min"></a>

###  min

▸ **min**(current?: *[TreeNodeMaybe](../#treenodemaybe)*): `number`

*Defined in [model/BinarySearchTree.ts:186](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L186)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` current | [TreeNodeMaybe](../#treenodemaybe) |  this.root |

**Returns:** `number`

___
<a id="remove"></a>

###  remove

▸ **remove**(value: *`number`*, current?: *[TreeNodeMaybe](../#treenodemaybe)*): `void`

*Defined in [model/BinarySearchTree.ts:230](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/BinarySearchTree.ts#L230)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `number` | - |
| `Default value` current | [TreeNodeMaybe](../#treenodemaybe) |  this.root |

**Returns:** `void`

___

