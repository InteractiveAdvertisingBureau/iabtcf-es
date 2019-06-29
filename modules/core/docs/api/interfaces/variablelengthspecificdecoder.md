[@iabtcf/core - API Documentation](../README.md) > [VariableLengthSpecificDecoder](../interfaces/variablelengthspecificdecoder.md)

# Interface: VariableLengthSpecificDecoder

## Hierarchy

 [SpecificDecoder](specificdecoder.md)

**↳ VariableLengthSpecificDecoder**

## Implemented by

* [VendorVectorDecoder](../classes/vendorvectordecoder.md)

## Index

### Methods

* [decode](variablelengthspecificdecoder.md#decode)
* [getBitLength](variablelengthspecificdecoder.md#getbitlength)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(value: *`string`*): [TCModelPropType](../#tcmodelproptype)

*Inherited from [SpecificDecoder](specificdecoder.md).[decode](specificdecoder.md#decode)*

*Defined in [tcstring/decoders/SpecificDecoder.ts:5](https://github.com/chrispaterson/iabtcf-es/blob/4f7901f/modules/core/src/tcstring/decoders/SpecificDecoder.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [TCModelPropType](../#tcmodelproptype)

___
<a id="getbitlength"></a>

###  getBitLength

▸ **getBitLength**(): `number`

*Defined in [tcstring/decoders/VariableLengthSpecificDecoder.ts:4](https://github.com/chrispaterson/iabtcf-es/blob/4f7901f/modules/core/src/tcstring/decoders/VariableLengthSpecificDecoder.ts#L4)*

**Returns:** `number`

___

