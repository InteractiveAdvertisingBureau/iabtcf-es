[@iabtcf/core - API Documentation](../README.md) > [TCString](../classes/tcstring.md)

# Class: TCString

Main class for encoding and decoding a TCF Transparency and Consent String

## Hierarchy

**TCString**

## Index

### Methods

* [decode](tcstring.md#decode)
* [encode](tcstring.md#encode)

---

## Methods

<a id="decode"></a>

### `<Static>` decode

▸ **decode**(encodedString: *`string`*): [TCModel](tcmodel.md)

*Defined in [TCString.ts:90](https://github.com/chrispaterson/iabtcf-es/blob/9d52060/modules/core/src/TCString.ts#L90)*

Decodes a string into a TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| encodedString | `string` |  web-safe base64 encoded Transparency and Consent String to decode |

**Returns:** [TCModel](tcmodel.md)
*   Returns populated TCModel

___
<a id="encode"></a>

### `<Static>` encode

▸ **encode**(tcModel: *[TCModel](tcmodel.md)*): `string`

*Defined in [TCString.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/9d52060/modules/core/src/TCString.ts#L23)*

encodes a model into a TCString

*__type__*: {TCModel}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tcModel | [TCModel](tcmodel.md) |  model to convert into encoded string |

**Returns:** `string`
*   web-safe base64 encoded Transparency and Consent String

___

