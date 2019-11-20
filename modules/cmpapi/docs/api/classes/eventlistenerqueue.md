[@iabtcf/cmpapi - API Documentation](../README.md) > [EventListenerQueue](../classes/eventlistenerqueue.md)

# Class: EventListenerQueue

## Hierarchy

**EventListenerQueue**

## Index

### Methods

* [add](eventlistenerqueue.md#add)
* [executeCommands](eventlistenerqueue.md#executecommands)
* [remove](eventlistenerqueue.md#remove)

---

## Methods

<a id="add"></a>

###  add

▸ **add**(callback: *[CallbackFunction](../#callbackfunction)*, command: *[Command](../interfaces/command.md)*): `void`

*Defined in [command/queues/EventListenerQueue.ts:8](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/EventListenerQueue.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [CallbackFunction](../#callbackfunction) |
| command | [Command](../interfaces/command.md) |

**Returns:** `void`

___
<a id="executecommands"></a>

###  executeCommands

▸ **executeCommands**(): `void`

*Defined in [command/queues/EventListenerQueue.ts:20](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/EventListenerQueue.ts#L20)*

**Returns:** `void`

___
<a id="remove"></a>

###  remove

▸ **remove**(callback: *[CallbackFunction](../#callbackfunction)*): `boolean`

*Defined in [command/queues/EventListenerQueue.ts:14](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/EventListenerQueue.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [CallbackFunction](../#callbackfunction) |

**Returns:** `boolean`

___

