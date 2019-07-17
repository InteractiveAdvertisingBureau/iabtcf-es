[@iabtcf/core - API Documentation](../README.md) > [FixedVectorEncoder](../classes/fixedvectorencoder.md)

# Class: FixedVectorEncoder

## Hierarchy

**FixedVectorEncoder**

## Implements

* [Encoder](../interfaces/encoder.md)<[Vector](vector.md)>

## Index

### Methods

* [decode](fixedvectorencoder.md#decode)
* [encode](fixedvectorencoder.md#encode)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*): [Vector](vector.md)

*Implementation of [Encoder](../interfaces/encoder.md).[decode](../interfaces/encoder.md#decode)*

*Defined in [encoder/FixedVectorEncoder.ts:22](https://github.com/chrispaterson/iabtcf-es/blob/ffdba84/modules/core/src/encoder/FixedVectorEncoder.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [Vector](vector.md)

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *[Vector](vector.md)*, numBits: *`number`*): `string`

*Defined in [encoder/FixedVectorEncoder.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/ffdba84/modules/core/src/encoder/FixedVectorEncoder.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | [Vector](vector.md) |
| numBits | `number` |

**Returns:** `string`

___

