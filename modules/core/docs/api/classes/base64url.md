[@iabtcf/core - API Documentation](../README.md) > [Base64Url](../classes/base64url.md)

# Class: Base64Url

## Hierarchy

**Base64Url**

## Implements

* [Encoder](../interfaces/encoder.md)<`string`>

## Index

### Methods

* [decode](base64url.md#decode)
* [encode](base64url.md#encode)

---

## Methods

<a id="decode"></a>

###  decode

▸ **decode**(str: *`string`*): `string`

*Defined in [encoder/Base64Url.ts:180](https://github.com/chrispaterson/iabtcf-es/blob/2c7676b/modules/core/src/encoder/Base64Url.ts#L180)*

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

###  encode

▸ **encode**(str: *`string`*): `string`

*Defined in [encoder/Base64Url.ts:120](https://github.com/chrispaterson/iabtcf-es/blob/2c7676b/modules/core/src/encoder/Base64Url.ts#L120)*

encodes an arbitrary-length bitfield string into base64url

*__static__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  arbitrary-length bitfield string to be encoded to base64url |

**Returns:** `string`
*   base64url encoded result

___

