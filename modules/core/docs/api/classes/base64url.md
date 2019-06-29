[@iabtcf/core - API Documentation](../README.md) > [Base64Url](../classes/base64url.md)

# Class: Base64Url

## Hierarchy

**Base64Url**

## Index

### Methods

* [decode](base64url.md#decode)
* [encode](base64url.md#encode)
* [isValid](base64url.md#isvalid)
* [pad](base64url.md#pad)

---

## Methods

<a id="decode"></a>

### `<Static>` decode

▸ **decode**(str: *`string`*): `string`

*Defined in [tcstring/Base64Url.ts:106](https://github.com/chrispaterson/iabtcf-es/blob/af1d026/modules/core/src/tcstring/Base64Url.ts#L106)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___
<a id="encode"></a>

### `<Static>` encode

▸ **encode**(str: *`string`*): `string`

*Defined in [tcstring/Base64Url.ts:72](https://github.com/chrispaterson/iabtcf-es/blob/af1d026/modules/core/src/tcstring/Base64Url.ts#L72)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___
<a id="isvalid"></a>

### `<Static>` isValid

▸ **isValid**(str: *`string`*): `boolean`

*Defined in [tcstring/Base64Url.ts:138](https://github.com/chrispaterson/iabtcf-es/blob/af1d026/modules/core/src/tcstring/Base64Url.ts#L138)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `boolean`

___
<a id="pad"></a>

### `<Static>` pad

▸ **pad**(str: *`string`*): `string`

*Defined in [tcstring/Base64Url.ts:152](https://github.com/chrispaterson/iabtcf-es/blob/af1d026/modules/core/src/tcstring/Base64Url.ts#L152)*

pad - because base-n encoding requires that bits occupy Log2(n) sized buckets, padding to the right will happen to the original string.

*__static__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  input bit string |

**Returns:** `string`
*   string padded to the base64Url encoded correct length

___

