[@iabtcf/core - API Documentation](../README.md) > [TCModelError](../classes/tcmodelerror.md)

# Class: TCModelError

class for decoding errors

*__extends__*: {Error}

## Hierarchy

 `Error`

**↳ TCModelError**

## Index

### Constructors

* [constructor](tcmodelerror.md#constructor)

### Properties

* [message](tcmodelerror.md#message)
* [name](tcmodelerror.md#name)
* [stack](tcmodelerror.md#stack)
* [Error](tcmodelerror.md#error)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TCModelError**(fieldName: *`string`*, passedValue: *`any`*, msg?: *`string`*): [TCModelError](tcmodelerror.md)

*Defined in [errors/TCModelError.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/b3164e6/modules/core/src/errors/TCModelError.ts#L6)*

constructor - constructs an TCModelError

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| fieldName | `string` | - |  the errored field |
| passedValue | `any` | - |  what was passed |
| `Default value` msg | `string` | &quot;&quot; |

**Returns:** [TCModelError](tcmodelerror.md)

___

## Properties

<a id="message"></a>

###  message

**● message**: *`string`*

*Inherited from Error.message*

*Defined in /Users/cpaterson/projects/dpe/iab/iabtcf/modules/core/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:964*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Inherited from Error.name*

*Defined in /Users/cpaterson/projects/dpe/iab/iabtcf/modules/core/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:963*

___
<a id="stack"></a>

### `<Optional>` stack

**● stack**: *`undefined` \| `string`*

*Inherited from Error.stack*

*Overrides Error.stack*

*Defined in /Users/cpaterson/projects/dpe/iab/iabtcf/modules/core/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:965*

___
<a id="error"></a>

### `<Static>` Error

**● Error**: *`ErrorConstructor`*

*Defined in /Users/cpaterson/projects/dpe/iab/iabtcf/modules/core/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974*

___

