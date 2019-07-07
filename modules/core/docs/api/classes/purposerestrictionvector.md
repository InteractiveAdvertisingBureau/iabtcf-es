[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVector](../classes/purposerestrictionvector.md)

# Class: PurposeRestrictionVector

## Hierarchy

**PurposeRestrictionVector**

## Index

### Methods

* [add](purposerestrictionvector.md#add)
* [forEach](purposerestrictionvector.md#foreach)
* [getMaxVendor](purposerestrictionvector.md#getmaxvendor)
* [getMinVendor](purposerestrictionvector.md#getminvendor)
* [getRestriction](purposerestrictionvector.md#getrestriction)
* [getVendors](purposerestrictionvector.md#getvendors)
* [remove](purposerestrictionvector.md#remove)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:34](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L34)*

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

*Defined in [model/PurposeRestrictionVector.ts:87](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L87)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |
| callback | `function` |

**Returns:** `void`

___
<a id="getmaxvendor"></a>

###  getMaxVendor

▸ **getMaxVendor**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number` \| `undefined`

*Defined in [model/PurposeRestrictionVector.ts:71](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number` \| `undefined`

___
<a id="getminvendor"></a>

###  getMinVendor

▸ **getMinVendor**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number` \| `undefined`

*Defined in [model/PurposeRestrictionVector.ts:79](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L79)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number` \| `undefined`

___
<a id="getrestriction"></a>

###  getRestriction

▸ **getRestriction**(vendorId: *`number`*): [PurposeRestriction](purposerestriction.md)[]

*Defined in [model/PurposeRestrictionVector.ts:54](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |

**Returns:** [PurposeRestriction](purposerestriction.md)[]

___
<a id="getvendors"></a>

###  getVendors

▸ **getVendors**(purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `number`[]

*Defined in [model/PurposeRestrictionVector.ts:47](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `number`[]

___
<a id="remove"></a>

###  remove

▸ **remove**(vendorId: *`number`*, purposeRestriction: *[PurposeRestriction](purposerestriction.md)*): `void`

*Defined in [model/PurposeRestrictionVector.ts:96](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/model/PurposeRestrictionVector.ts#L96)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vendorId | `number` |
| purposeRestriction | [PurposeRestriction](purposerestriction.md) |

**Returns:** `void`

___

