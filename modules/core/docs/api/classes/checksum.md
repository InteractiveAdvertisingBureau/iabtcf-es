[@iabtcf/core - API Documentation](../README.md) > [Checksum](../classes/checksum.md)

# Class: Checksum

## Hierarchy

**Checksum**

## Index

### Methods

* [create](checksum.md#create)

---

## Methods

<a id="create"></a>

### `<Static>` create

▸ **create**(bitField: *`string`*, returnLength?: *`number`*): `string`

*Defined in [tcstring/Checksum.ts:50](https://github.com/chrispaterson/iabtcf-es/blob/3c9246f/modules/core/src/tcstring/Checksum.ts#L50)*

create - creates a crc16 modbus checksum from a binary string.

*__static__*: 

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| bitField | `string` | - |  field of string ones and zeros |
| `Default value` returnLength | `number` | 0 |

**Returns:** `string`
*   crc16 modbus checksum of the bitField passed in as binary string

___

