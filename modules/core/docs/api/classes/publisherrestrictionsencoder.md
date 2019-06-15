[@iabtcf/core - API Documentation](../README.md) > [PublisherRestrictionsEncoder](../classes/publisherrestrictionsencoder.md)

# Class: PublisherRestrictionsEncoder

## Hierarchy

 [VendorVectorEncoder](vendorvectorencoder.md)

**↳ PublisherRestrictionsEncoder**

## Implements

* [SpecificEncoder](../interfaces/specificencoder.md)
* [SpecificEncoder](../interfaces/specificencoder.md)

## Index

### Properties

* [boolEnc](publisherrestrictionsencoder.md#boolenc)
* [intEncoder](publisherrestrictionsencoder.md#intencoder)
* [ranges](publisherrestrictionsencoder.md#ranges)
* [RANGE_DEFAULT](publisherrestrictionsencoder.md#range_default)

### Accessors

* [useRange](publisherrestrictionsencoder.md#userange)

### Methods

* [buildRangeEncoding](publisherrestrictionsencoder.md#buildrangeencoding)
* [encode](publisherrestrictionsencoder.md#encode)

---

## Properties

<a id="boolenc"></a>

### `<Protected>` boolEnc

**● boolEnc**: *[BooleanEncoder](booleanencoder.md)* =  new BooleanEncoder()

*Inherited from [VendorVectorEncoder](vendorvectorencoder.md).[boolEnc](vendorvectorencoder.md#boolenc)*

*Defined in [encoder/VendorVectorEncoder.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L14)*

___
<a id="intencoder"></a>

### `<Protected>` intEncoder

**● intEncoder**: *[IntEncoder](intencoder.md)* =  new IntEncoder()

*Inherited from [VendorVectorEncoder](vendorvectorencoder.md).[intEncoder](vendorvectorencoder.md#intencoder)*

*Defined in [encoder/VendorVectorEncoder.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L13)*

___
<a id="ranges"></a>

### `<Protected>` ranges

**● ranges**: *`number`[][]*

*Inherited from [VendorVectorEncoder](vendorvectorencoder.md).[ranges](vendorvectorencoder.md#ranges)*

*Defined in [encoder/VendorVectorEncoder.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L17)*

___
<a id="range_default"></a>

### `<Static>` RANGE_DEFAULT

**● RANGE_DEFAULT**: *`boolean`* = false

*Inherited from [VendorVectorEncoder](vendorvectorencoder.md).[RANGE_DEFAULT](vendorvectorencoder.md#range_default)*

*Defined in [encoder/VendorVectorEncoder.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/VendorVectorEncoder.ts#L11)*

___

## Accessors

<a id="userange"></a>

### `<Protected>` useRange

**get useRange**(): `boolean`

*Overrides [VendorVectorEncoder](vendorvectorencoder.md).[useRange](vendorvectorencoder.md#userange)*

*Defined in [encoder/PublisherRestrictionsEncoder.ts:61](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/PublisherRestrictionsEncoder.ts#L61)*

**Returns:** `boolean`

___

## Methods

<a id="buildrangeencoding"></a>

### `<Protected>` buildRangeEncoding

▸ **buildRangeEncoding**(): `string`

*Overrides [VendorVectorEncoder](vendorvectorencoder.md).[buildRangeEncoding](vendorvectorencoder.md#buildrangeencoding)*

*Defined in [encoder/PublisherRestrictionsEncoder.ts:19](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/PublisherRestrictionsEncoder.ts#L19)*

**Returns:** `string`

___
<a id="encode"></a>

###  encode

▸ **encode**(vector: *[Vector](vector.md)<[PurposeRestriction](purposerestriction.md)>*): `string`

*Overrides [VendorVectorEncoder](vendorvectorencoder.md).[encode](vendorvectorencoder.md#encode)*

*Defined in [encoder/PublisherRestrictionsEncoder.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/5f390d3/modules/core/src/encoder/PublisherRestrictionsEncoder.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| vector | [Vector](vector.md)<[PurposeRestriction](purposerestriction.md)> |

**Returns:** `string`

___

