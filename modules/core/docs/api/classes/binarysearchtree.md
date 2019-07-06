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

*Defined in [model/BinarySearchTree.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `void`

___
<a id="contains"></a>

###  contains

▸ **contains**(value: *`number`*): `boolean`

*Defined in [model/BinarySearchTree.ts:152](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L152)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `boolean`

___
<a id="get"></a>

###  get

▸ **get**(): `number`[]

*Defined in [model/BinarySearchTree.ts:110](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L110)*

performs Morris in-order traversal

**Returns:** `number`[]
sorted array

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [model/BinarySearchTree.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L11)*

**Returns:** `boolean`

___
<a id="max"></a>

###  max

▸ **max**(current?: *[TreeNodeOrNull](../#treenodeornull)*): `number`

*Defined in [model/BinarySearchTree.ts:201](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L201)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` current | [TreeNodeOrNull](../#treenodeornull) |  this.root |

**Returns:** `number`

___
<a id="min"></a>

###  min

▸ **min**(current?: *[TreeNodeOrNull](../#treenodeornull)*): `number`

*Defined in [model/BinarySearchTree.ts:179](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L179)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` current | [TreeNodeOrNull](../#treenodeornull) |  this.root |

**Returns:** `number`

___
<a id="remove"></a>

###  remove

▸ **remove**(value: *`number`*, current?: *[TreeNodeOrNull](../#treenodeornull)*): `void`

*Defined in [model/BinarySearchTree.ts:223](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/BinarySearchTree.ts#L223)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `number` | - |
| `Default value` current | [TreeNodeOrNull](../#treenodeornull) |  this.root |

**Returns:** `void`

___

