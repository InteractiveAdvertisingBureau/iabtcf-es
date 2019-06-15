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

*Defined in tcstring/encoder/VendorVectorEncoder.ts:14*

___
<a id="intencoder"></a>

### `<Protected>` intEncoder

**● intEncoder**: *[IntEncoder](intencoder.md)* =  new IntEncoder()

*Defined in tcstring/encoder/VendorVectorEncoder.ts:13*

___
<a id="ranges"></a>

### `<Protected>` ranges

**● ranges**: *`number`[][]*

*Defined in tcstring/encoder/VendorVectorEncoder.ts:17*

___
<a id="range_default"></a>

### `<Static>` RANGE_DEFAULT

**● RANGE_DEFAULT**: *`boolean`* = false

*Defined in tcstring/encoder/VendorVectorEncoder.ts:11*

___

## Accessors

<a id="userange"></a>

### `<Protected>` useRange

**get useRange**(): `boolean`

*Defined in tcstring/encoder/VendorVectorEncoder.ts:130*

**Returns:** `boolean`

___

## Methods

<a id="buildrangeencoding"></a>

### `<Protected>` buildRangeEncoding

▸ **buildRangeEncoding**(): `string`

*Defined in tcstring/encoder/VendorVectorEncoder.ts:98*

**Returns:** `string`

___
<a id="encode"></a>

###  encode

▸ **encode**(vector: *[TCModelPropType](../#tcmodelproptype)*): `string`

*Defined in tcstring/encoder/VendorVectorEncoder.ts:20*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vector | [TCModelPropType](../#tcmodelproptype) |

**Returns:** `string`

___

