[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionVectorEncoder](../classes/purposerestrictionvectorencoder.md)

# Class: PurposeRestrictionVectorEncoder

## Hierarchy

**PurposeRestrictionVectorEncoder**

## Implements

* [Encoder](../interfaces/encoder.md)<[PurposeRestrictionVector](purposerestrictionvector.md)>

## Index

### Methods

* [decode](purposerestrictionvectorencoder.md#decode)
* [encode](purposerestrictionvectorencoder.md#encode)
* [getBitLength](purposerestrictionvectorencoder.md#getbitlength)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*): [PurposeRestrictionVector](purposerestrictionvector.md)

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:114](https://github.com/chrispaterson/iabtcf-es/blob/c2fc731/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L114)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [PurposeRestrictionVector](purposerestrictionvector.md)

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *[PurposeRestrictionVector](purposerestrictionvector.md)*): `string`

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:26](https://github.com/chrispaterson/iabtcf-es/blob/c2fc731/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L26)*

TODO: Must check to see if vendor has flexible purposes first TODO: if the RestrctionType is NOT\_ALLOWED it doesn't matter if the vendor has a flexible purpose

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | [PurposeRestrictionVector](purposerestrictionvector.md) |

**Returns:** `string`

___
<a id="getbitlength"></a>

###  getBitLength

▸ **getBitLength**(): `number`

*Implementation of [Encoder](../interfaces/encoder.md).[getBitLength](../interfaces/encoder.md#getbitlength)*

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:108](https://github.com/chrispaterson/iabtcf-es/blob/c2fc731/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L108)*

**Returns:** `number`

___

