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
* [decode](tcstring.md#decode-1)
* [encode](tcstring.md#encode-1)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(encodedString: *`string`*): [TCModel](tcmodel.md)

*Defined in [TCString.ts:121](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCString.ts#L121)*

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

▸ **encode**(tcModel: *[TCModel](tcmodel.md)*, isForSaving?: *`boolean`*): `string`

*Defined in [TCString.ts:64](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCString.ts#L64)*

encodes a model into a TCString

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| tcModel | [TCModel](tcmodel.md) | - |  model to convert into encoded string |
| `Default value` isForSaving | `boolean` | false |  \= false - Defaults to false. Whether a TC String is meant for storage (true) or meant to be handed to AdTech through the tcfapi (true). This will modify which segments are handed back with the string. |

**Returns:** `string`
*   base64url encoded Transparency and Consent String

___
<a id="decode-1"></a>

### `<Static>` decode

▸ **decode**(encodedString: *`string`*): [TCModel](tcmodel.md)

*Defined in [TCString.ts:77](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCString.ts#L77)*

Decodes a string into a TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| encodedString | `string` |  base64url encoded Transparency and Consent String to decode |

**Returns:** [TCModel](tcmodel.md)
*   Returns populated TCModel

___
<a id="encode-1"></a>

### `<Static>` encode

▸ **encode**(tcModel: *[TCModel](tcmodel.md)*, isForSaving?: *`boolean`*): `string`

*Defined in [TCString.ts:30](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/TCString.ts#L30)*

encodes a model into a TCString

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| tcModel | [TCModel](tcmodel.md) | - |  model to convert into encoded string |
| `Default value` isForSaving | `boolean` | false |  \= false - Defaults to false. Whether a TC String is meant for storage (true) or meant to be handed to AdTech through the tcfapi (true). This will modify which segments are handed back with the string. |

**Returns:** `string`
*   base64url encoded Transparency and Consent String

___

