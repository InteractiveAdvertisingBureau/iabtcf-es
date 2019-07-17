[@iabtcf/core - API Documentation](../README.md) > [Encoder](../interfaces/encoder.md)

# Interface: Encoder

## Type parameters
#### T 
## Hierarchy

**Encoder**

## Implemented by

* [BooleanEncoder](../classes/booleanencoder.md)
* [DateEncoder](../classes/dateencoder.md)
* [FixedVectorEncoder](../classes/fixedvectorencoder.md)
* [IntEncoder](../classes/intencoder.md)
* [LangEncoder](../classes/langencoder.md)
* [PurposeRestrictionVectorEncoder](../classes/purposerestrictionvectorencoder.md)
* [TCString](../classes/tcstring.md)
* [VendorVectorEncoder](../classes/vendorvectorencoder.md)

## Index

### Methods

* [decode](encoder.md#decode)
* [encode](encoder.md#encode)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*): `T`

*Defined in [encoder/Encoder.ts:3](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/encoder/Encoder.ts#L3)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `T`

___
<a id="encode"></a>

###  encode

▸ **encode**(value: *`T`*, numBits?: *`undefined` \| `number`*): `string`

*Defined in [encoder/Encoder.ts:2](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/encoder/Encoder.ts#L2)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `T` |
| `Optional` numBits | `undefined` \| `number` |

**Returns:** `string`

___

