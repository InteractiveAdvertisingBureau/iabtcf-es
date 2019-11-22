[@iabtcf/core - API Documentation](../README.md) > [Base64Url](../classes/_iabtcf_core___api_documentation.base64url.md)

# Class: Base64Url

## Hierarchy

**Base64Url**

## Index

### Methods

* [decode](_iabtcf_core___api_documentation.base64url.md#decode)
* [encode](_iabtcf_core___api_documentation.base64url.md#encode)

---

## Methods

<a id="decode"></a>

### `<Static>` decode

▸ **decode**(str: *`string`*): `string`

*Defined in [src/encoder/Base64Url.ts:61](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/encoder/Base64Url.ts#L61)*

decodes a base64url encoded bitfield string

*__static__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  base64url encoded bitfield string to be decoded |

**Returns:** `string`
*   bitfield string

___
<a id="encode"></a>

### `<Static>` encode

▸ **encode**(str: *`string`*): `string`

*Defined in [src/encoder/Base64Url.ts:12](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/encoder/Base64Url.ts#L12)*

encodes an arbitrary-length bitfield string into base64url

*__static__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  arbitrary-length bitfield string to be encoded to base64url |

**Returns:** `string`
*   base64url encoded result

___

