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

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:110](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L110)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [PurposeRestrictionVector](purposerestrictionvector.md)

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *[PurposeRestrictionVector](purposerestrictionvector.md)*): `string`

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L21)*

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

*Defined in [encoder/PurposeRestrictionVectorEncoder.ts:104](https://github.com/chrispaterson/iabtcf-es/blob/0ed9ac2/modules/core/src/encoder/PurposeRestrictionVectorEncoder.ts#L104)*

**Returns:** `number`

___

