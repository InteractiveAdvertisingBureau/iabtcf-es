[@iabtcf/cmpapi - API Documentation](../README.md) > [CommandQueue](../classes/commandqueue.md)

# Class: CommandQueue

Class to hold and execute commands that are not yet ready to be processed

## Hierarchy

**CommandQueue**

## Index

### Constructors

* [constructor](commandqueue.md#constructor)

### Accessors

* [hasCommands](commandqueue.md#hascommands)

### Methods

* [executeAndClearCommands](commandqueue.md#executeandclearcommands)
* [queueCommand](commandqueue.md#queuecommand)
* [queueCommands](commandqueue.md#queuecommands)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CommandQueue**(commands?: *[Command](../interfaces/command.md)[]*): [CommandQueue](commandqueue.md)

*Defined in [command/queues/CommandQueue.ts:8](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/CommandQueue.ts#L8)*

Constructor

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` commands | [Command](../interfaces/command.md)[] |   |

**Returns:** [CommandQueue](commandqueue.md)

___

## Accessors

<a id="hascommands"></a>

###  hasCommands

**get hasCommands**(): `boolean`

*Defined in [command/queues/CommandQueue.ts:24](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/CommandQueue.ts#L24)*

Returns true if we currently have commands waiting to be executed

**Returns:** `boolean`

___

## Methods

<a id="executeandclearcommands"></a>

###  executeAndClearCommands

▸ **executeAndClearCommands**(): `void`

*Defined in [command/queues/CommandQueue.ts:57](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/CommandQueue.ts#L57)*

Executes all commands in the queue and clears the queue

**Returns:** `void`

___
<a id="queuecommand"></a>

###  queueCommand

▸ **queueCommand**(command: *[Command](../interfaces/command.md)*): `void`

*Defined in [command/queues/CommandQueue.ts:34](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/CommandQueue.ts#L34)*

Adds a {Command} to the queue

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| command | [Command](../interfaces/command.md) |   |

**Returns:** `void`

___
<a id="queuecommands"></a>

###  queueCommands

▸ **queueCommands**(commands: *[Command](../interfaces/command.md)[]*): `void`

*Defined in [command/queues/CommandQueue.ts:46](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/command/queues/CommandQueue.ts#L46)*

Adds a list of {Command} to the queue

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| commands | [Command](../interfaces/command.md)[] |   |

**Returns:** `void`

___

