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

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*): [PurposeRestrictionVector](purposerestrictionvector.md)

*Implementation of [Encoder](../interfaces/encoder.md).[decode](../interfaces/encoder.md#decode)*

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:99](https://github.com/chrispaterson/iabtcf-es/blob/ffdba84/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L99)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [PurposeRestrictionVector](purposerestrictionvector.md)

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *[PurposeRestrictionVector](purposerestrictionvector.md)*): `string`

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/ffdba84/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L16)*

TODO: Must check to see if vendor has flexible purposes first TODO: if the RestrctionType is NOT\_ALLOWED it doesn't matter if the vendor has a flexible purpose

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | [PurposeRestrictionVector](purposerestrictionvector.md) |

**Returns:** `string`

___

