[@iabtcf/core - API Documentation](../README.md) > [Base64Url](../classes/base64url.md)

# Class: Base64Url

This class exists because all base64 encoding libraries that I have seen including the browser-based atob() and btoa() are for encoding 8 bit string characters into base64. Secondly, there is no url safe option. So if we were to encode the arbitrary bit string, we would first need to create a byte array and then run it through the standard base64 encoder. After that, to make it url safe we would have to search through the resulting string and replace the unsafe ‘+’ and ‘/‘ characters with a string.replace method which is an additional overhead of O(2n) complexity. All opensource implementations I have seen follow this approach to creating url-safe base 64 encoded strings. Granted a native implementation of the btoa() would leverage the native browser code, which is always faster than executing the interpreted javascript layer but there are quite a few manipulations that have to happen pre and post process that I think it warrants a custom implementation.

Some things to note:

1.  Because this base64 encoder is encoding an arbitrary number of bits most likely there will be some trailing zeros added to the end of the string in order to pad to the full 6-bit bucket. This then makes the encoding "unstable" in that the string bitfield will not be exactly equal to the inputted value when decoded.
    
2.  Because we are not encoding bytes to 6 bits the standard padding characters defined by [RFC4648](https://tools.ietf.org/html/rfc4648#section-3.2) are omitted on this implementation. The checksum should be the solution for determining string integreity.

## Hierarchy

**Base64Url**

## Index

### Methods

* [decode](base64url.md#decode)
* [encode](base64url.md#encode)

---

## Methods

<a id="decode"></a>

### `<Static>` decode

▸ **decode**(str: *`string`*): `string`

*Defined in [tcstring/Base64Url.ts:168](https://github.com/chrispaterson/iabtcf-es/blob/90d8169/modules/core/src/tcstring/Base64Url.ts#L168)*

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

*Defined in [tcstring/Base64Url.ts:118](https://github.com/chrispaterson/iabtcf-es/blob/90d8169/modules/core/src/tcstring/Base64Url.ts#L118)*

encodes an arbitrary-length bitfield string into base64url

*__static__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  arbitrary-length bitfield string to be encoded to base64url |

**Returns:** `string`
*   base64url encoded result

___

