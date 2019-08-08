[@iabtcf/core - API Documentation](../README.md) > [TCString](../classes/tcstring.md)

# Class: TCString

Main class for encoding and decoding a TCF Transparency and Consent String

## Hierarchy

**TCString**

## Implements

* [Encoder](../interfaces/encoder.md)<[TCModel](tcmodel.md)>

## Index

### Methods

* [decode](tcstring.md#decode)
* [encode](tcstring.md#encode)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(encodedString: *`string`*): [TCModel](tcmodel.md)

*Defined in [TCString.ts:57](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/TCString.ts#L57)*

Decodes a string into a TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| encodedString | `string` |  base64url encoded Transparency and Consent String to decode |

**Returns:** [TCModel](tcmodel.md)
*   Returns populated TCModel

___
<a id="encode"></a>

###  encode

▸ **encode**(tcModel: *[TCModel](tcmodel.md)*): `string`

*Defined in [TCString.ts:26](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/TCString.ts#L26)*

encodes a model into a TCString

*__type__*: {TCModel}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | [TCModel](tcmodel.md) |  model to convert into encoded string |

**Returns:** `string`
*   base64url encoded Transparency and Consent String

___

