[@iabtcf/cmpapi - API Documentation](../README.md) > [Callback](../classes/callback.md)

# Class: Callback

Callback class wraps a callback function to provide added functionality

## Hierarchy

**Callback**

## Index

### Constructors

* [constructor](callback.md#constructor)

### Accessors

* [function](callback.md#function)
* [isValid](callback.md#isvalid)

### Methods

* [fail](callback.md#fail)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Callback**(callbackFunc: *[CallbackFunction](../#callbackfunction)*): [Callback](callback.md)

*Defined in [command/callback/Callback.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/callback/Callback.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callbackFunc | [CallbackFunction](../#callbackfunction) |

**Returns:** [Callback](callback.md)

___

## Accessors

<a id="function"></a>

###  function

**get function**(): [CallbackFunction](../#callbackfunction)

*Defined in [command/callback/Callback.ts:21](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/callback/Callback.ts#L21)*

Returns the callback function

**Returns:** [CallbackFunction](../#callbackfunction)

___
<a id="isvalid"></a>

###  isValid

**get isValid**(): `boolean`

*Defined in [command/callback/Callback.ts:30](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/callback/Callback.ts#L30)*

Returns true if the callback function is a valid function

**Returns:** `boolean`

___

## Methods

<a id="fail"></a>

###  fail

▸ **fail**(messages?: *`string`[] \| `string`*): `void`

*Defined in [command/callback/Callback.ts:41](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/callback/Callback.ts#L41)*

Attempts to evoke the callback function with failing parameters and logs any messages with it if provided.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` messages | `string`[] \| `string` |  \- |

**Returns:** `void`

___

