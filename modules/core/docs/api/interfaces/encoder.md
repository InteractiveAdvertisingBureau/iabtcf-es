[@iabtcf/core - API Documentation](../README.md) > [Encoder](../interfaces/encoder.md)

# Interface: Encoder

## Type parameters
#### T 
## Hierarchy

**Encoder**

## Implemented by

* [Base64Url](../classes/base64url.md)
* [BooleanEncoder](../classes/booleanencoder.md)
* [CoreTCEncoder](../classes/coretcencoder.md)
* [DateEncoder](../classes/dateencoder.md)
* [FixedVectorEncoder](../classes/fixedvectorencoder.md)
* [IntEncoder](../classes/intencoder.md)
* [LangEncoder](../classes/langencoder.md)
* [OOBVendorsEncoder](../classes/oobvendorsencoder.md)
* [PublisherTCEncoder](../classes/publishertcencoder.md)
* [PurposeRestrictionVectorEncoder](../classes/purposerestrictionvectorencoder.md)
* [TCString](../classes/tcstring.md)
* [VendorVectorEncoder](../classes/vendorvectorencoder.md)

## Index

### Methods

* [decode](encoder.md#decode)
* [encode](encoder.md#encode)
* [getBitLength](encoder.md#getbitlength)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*, target?: *[T]()*, param?: *`number` \| `string`*): `T`

*Defined in [encoder/Encoder.ts:3](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/encoder/Encoder.ts#L3)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |
| `Optional` target | [T]() |
| `Optional` param | `number` \| `string` |

**Returns:** `T`

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *`T`*, param?: *`number` \| `string` \| `boolean`*): `string`

*Defined in [encoder/Encoder.ts:2](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/encoder/Encoder.ts#L2)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `T` |
| `Optional` param | `number` \| `string` \| `boolean` |

**Returns:** `string`

___
<a id="getbitlength"></a>

### `<Optional>` getBitLength

▸ **getBitLength**(): `number`

*Defined in [encoder/Encoder.ts:4](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/encoder/Encoder.ts#L4)*

**Returns:** `number`

___

