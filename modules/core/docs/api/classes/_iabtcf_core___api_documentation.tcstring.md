[@iabtcf/core - API Documentation](../README.md) > [TCString](../classes/_iabtcf_core___api_documentation.tcstring.md)

# Class: TCString

Main class for encoding and decoding a TCF Transparency and Consent String

## Hierarchy

**TCString**

## Index

### Methods

* [decode](_iabtcf_core___api_documentation.tcstring.md#decode)
* [encode](_iabtcf_core___api_documentation.tcstring.md#encode)

---

## Methods

<a id="decode"></a>

### `<Static>` decode

▸ **decode**(encodedString: *`string`*): [TCModel](_iabtcf_core___api_documentation.tcmodel.md)

*Defined in [src/TCString.ts:65](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCString.ts#L65)*

Decodes a string into a TCModel

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| encodedString | `string` |  base64url encoded Transparency and Consent String to decode |

**Returns:** [TCModel](_iabtcf_core___api_documentation.tcmodel.md)
*   Returns populated TCModel

___
<a id="encode"></a>

### `<Static>` encode

▸ **encode**(tcModel: *[TCModel](_iabtcf_core___api_documentation.tcmodel.md)*, isForSaving?: *`boolean`*): `string`

*Defined in [src/TCString.ts:34](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCString.ts#L34)*

encodes a model into a TCString

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| tcModel | [TCModel](_iabtcf_core___api_documentation.tcmodel.md) | - |  model to convert into encoded string |
| `Default value` isForSaving | `boolean` | false |  \= false - Defaults to false. Whether a TC String is meant for storage (true) or meant to be handed to AdTech through the tcfapi (true). This will modify which segments are handed back with the string. |

**Returns:** `string`
*   base64url encoded Transparency and Consent String

___

