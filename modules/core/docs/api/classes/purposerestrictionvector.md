[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

**PurposeRestrictionVector**

## Index

### Methods

* [add](purposerestrictionvector.md#add)
* [forEach](purposerestrictionvector.md#foreach)
* [getMax](purposerestrictionvector.md#getmax)
* [getMin](purposerestrictionvector.md#getmin)
* [getRestriction](purposerestrictionvector.md#getrestriction)
* [getVendors](purposerestrictionvector.md#getvendors)
* [remove](purposerestrictionvector.md#remove)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:37](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*, callback: *`function`*): `void`

*Defined in [model/PurposeRestrictionVector.ts:94](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L94)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |
| callback | `function` |

**Returns:** `void`

___
<a id="getmax"></a>

###  getMax

▸ **getMax**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number` \| `undefined`

*Defined in [model/PurposeRestrictionVector.ts:78](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number` \| `undefined`

___
<a id="getmin"></a>

###  getMin

▸ **getMin**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number` \| `undefined`

*Defined in [model/PurposeRestrictionVector.ts:86](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L86)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number` \| `undefined`

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:57](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:50](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:103](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestrictionVector.ts#L103)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

