[@iabtcf/core - API Documentation](../README.md) > [Json](../classes/_iabtcf_core___api_documentation.json.md)

# Class: Json

## Hierarchy

**Json**

## Index

### Methods

* [fetch](_iabtcf_core___api_documentation.json.md#fetch)

---

## Methods

<a id="fetch"></a>

### `<Static>` fetch

▸ **fetch**(jsonURL: *`string`*, sendCookies?: *`boolean`*, timeout?: *`number`*): `Promise`<`object`>

*Defined in [src/Json.ts:9](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/Json.ts#L9)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| jsonURL | `string` | - |  full path to the json |
| `Default value` sendCookies | `boolean` | false |  Whether or not to send the XMLHttpRequest with credentials or not |
| `Default value` timeout | `number` | 0 |

**Returns:** `Promise`<`object`>
*   resolves with parsed JSON

___

