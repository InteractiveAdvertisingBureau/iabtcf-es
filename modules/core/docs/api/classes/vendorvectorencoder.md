[@iabtcf/core - API Documentation](../README.md) > [VendorVectorEncoder](../classes/vendorvectorencoder.md)

# Class: VendorVectorEncoder

## Hierarchy

**VendorVectorEncoder**

↳  [PublisherRestrictionsEncoder](publisherrestrictionsencoder.md)

## Implements

* [SpecificEncoder](../interfaces/specificencoder.md)

## Index

### Properties

* [boolEnc](vendorvectorencoder.md#boolenc)
* [intEncoder](vendorvectorencoder.md#intencoder)
* [ranges](vendorvectorencoder.md#ranges)
* [RANGE_DEFAULT](vendorvectorencoder.md#range_default)

### Accessors

* [useRange](vendorvectorencoder.md#userange)

### Methods

* [buildRangeEncoding](vendorvectorencoder.md#buildrangeencoding)
* [encode](vendorvectorencoder.md#encode)

---

## Properties

<a id="boolenc"></a>

### `<Protected>` boolEnc

**● boolEnc**: *[BooleanEncoder](booleanencoder.md)* =  new BooleanEncoder()

*Defined in [encoder/VendorVectorEncoder.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L14)*

___
<a id="intencoder"></a>

### `<Protected>` intEncoder

**● intEncoder**: *[IntEncoder](intencoder.md)* =  new IntEncoder()

*Defined in [encoder/VendorVectorEncoder.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L13)*

___
<a id="ranges"></a>

### `<Protected>` ranges

**● ranges**: *`number`[][]*

*Defined in [encoder/VendorVectorEncoder.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L17)*

___
<a id="range_default"></a>

### `<Static>` RANGE_DEFAULT

**● RANGE_DEFAULT**: *`boolean`* = false

*Defined in [encoder/VendorVectorEncoder.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L11)*

___

## Accessors

<a id="userange"></a>

### `<Protected>` useRange

**get useRange**(): `boolean`

*Defined in [encoder/VendorVectorEncoder.ts:130](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L130)*

**Returns:** `boolean`

___

## Methods

<a id="buildrangeencoding"></a>

### `<Protected>` buildRangeEncoding

▸ **buildRangeEncoding**(): `string`

*Defined in [encoder/VendorVectorEncoder.ts:98](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L98)*

**Returns:** `string`

___
<a id="encode"></a>

###  encode

▸ **encode**(vector: *[TCModelPropType](../#tcmodelproptype)*): `string`

*Defined in [encoder/VendorVectorEncoder.ts:20](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vector | [TCModelPropType](../#tcmodelproptype) |

**Returns:** `string`

___

