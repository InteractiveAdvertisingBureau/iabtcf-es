[@iabtcf/core - API Documentation](../README.md) > [VendorVectorEncoder](../classes/vendorvectorencoder.md)

# Class: VendorVectorEncoder

## Hierarchy

**VendorVectorEncoder**

## Implements

* [Encoder](../interfaces/encoder.md)<[Vector](vector.md)>

## Index

### Properties

* [RANGE_DEFAULT](vendorvectorencoder.md#range_default)

### Methods

* [decode](vendorvectorencoder.md#decode)
* [encode](vendorvectorencoder.md#encode)
* [getBitLength](vendorvectorencoder.md#getbitlength)

---

## Properties

<a id="range_default"></a>

### `<Static>` RANGE_DEFAULT

**● RANGE_DEFAULT**: *`boolean`* = false

*Defined in [encoder/VendorVectorEncoder.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/encoder/VendorVectorEncoder.ts#L16)*

___

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*): [Vector](vector.md)

*Defined in [encoder/VendorVectorEncoder.ts:97](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/encoder/VendorVectorEncoder.ts#L97)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [Vector](vector.md)

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *[Vector](vector.md)*): `string`

*Defined in [encoder/VendorVectorEncoder.ts:24](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/encoder/VendorVectorEncoder.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | [Vector](vector.md) |

**Returns:** `string`

___
<a id="getbitlength"></a>

###  getBitLength

▸ **getBitLength**(): `number`

*Implementation of [Encoder](../interfaces/encoder.md).[getBitLength](../interfaces/encoder.md#getbitlength)*

*Defined in [encoder/VendorVectorEncoder.ts:217](https://github.com/chrispaterson/iabtcf-es/blob/bc68839/modules/core/src/encoder/VendorVectorEncoder.ts#L217)*

**Returns:** `number`

___

