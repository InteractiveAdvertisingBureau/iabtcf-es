[@iabtcf/cmpapi - API Documentation](../README.md) > [CommandBroker](../classes/commandbroker.md)

# Class: CommandBroker

CommandBroker handles setup, routing, calling validation and facilitating the execution of default and custom. The class handles all the commands the page will issue.

## Hierarchy

**CommandBroker**

## Index

### Constructors

* [constructor](commandbroker.md#constructor)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CommandBroker**(cmpData: *[CmpDataReader](../interfaces/cmpdatareader.md)*, customCommands?: *[CustomCommandRegistration](../interfaces/customcommandregistration.md)[]*): [CommandBroker](commandbroker.md)

*Defined in [command/CommandBroker.ts:42](https://github.com/chrispaterson/iabtcf/blob/a518601/modules/cmpapi/src/command/CommandBroker.ts#L42)*

Constructor

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| cmpData | [CmpDataReader](../interfaces/cmpdatareader.md) | - |  \- |
| `Default value` customCommands | [CustomCommandRegistration](../interfaces/customcommandregistration.md)[] |  [] |   |

**Returns:** [CommandBroker](commandbroker.md)

___

