[@iabtcf/core - API Documentation](../README.md) > [PurposeRestriction](../classes/_iabtcf_core___api_documentation.purposerestriction.md)

# Class: PurposeRestriction

## Hierarchy

 [Cloneable](_iabtcf_core___api_documentation.cloneable.md)<[PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)>

**↳ PurposeRestriction**

## Index

### Constructors

* [constructor](_iabtcf_core___api_documentation.purposerestriction.md#constructor)

### Properties

* [restrictionType](_iabtcf_core___api_documentation.purposerestriction.md#restrictiontype)
* [hashSeparator](_iabtcf_core___api_documentation.purposerestriction.md#hashseparator)

### Accessors

* [hash](_iabtcf_core___api_documentation.purposerestriction.md#hash)
* [purposeId](_iabtcf_core___api_documentation.purposerestriction.md#purposeid)

### Methods

* [clone](_iabtcf_core___api_documentation.purposerestriction.md#clone)
* [isSameAs](_iabtcf_core___api_documentation.purposerestriction.md#issameas)
* [isValid](_iabtcf_core___api_documentation.purposerestriction.md#isvalid)
* [unHash](_iabtcf_core___api_documentation.purposerestriction.md#unhash)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PurposeRestriction**(purposeId?: *`undefined` \| `number`*, restrictionType?: *[RestrictionType](../enums/_iabtcf_core___api_documentation.restrictiontype.md)*): [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[constructor](_iabtcf_core___api_documentation.cloneable.md#constructor)*

*Defined in [src/model/PurposeRestriction.ts:10](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L10)*

constructor

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` purposeId | `undefined` \| `number` |
| `Optional` restrictionType | [RestrictionType](../enums/_iabtcf_core___api_documentation.restrictiontype.md) |

**Returns:** [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

___

## Properties

<a id="restrictiontype"></a>

###  restrictionType

**● restrictionType**: *[RestrictionType](../enums/_iabtcf_core___api_documentation.restrictiontype.md)*

*Defined in [src/model/PurposeRestriction.ts:10](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L10)*

___
<a id="hashseparator"></a>

### `<Static>` hashSeparator

**● hashSeparator**: *`string`* = "-"

*Defined in [src/model/PurposeRestriction.ts:7](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L7)*

___

## Accessors

<a id="hash"></a>

###  hash

**get hash**(): `string`

*Defined in [src/model/PurposeRestriction.ts:66](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L66)*

**Returns:** `string`

___
<a id="purposeid"></a>

###  purposeId

**get purposeId**(): `number`

**set purposeId**(idNum: *`number`*): `void`

*Defined in [src/model/PurposeRestriction.ts:83](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L83)*

**Returns:** `number`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

*Defined in [src/model/PurposeRestriction.ts:93](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L93)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| idNum | `number` |  The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists. |

**Returns:** `void`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

___

## Methods

<a id="_clone"></a>

### `<Private>` _clone

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

*Inherited from [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[_clone](_iabtcf_core___api_documentation.cloneable.md#_clone)*

*Defined in [src/cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

___
<a id="clone"></a>

###  clone

▸ **clone**(): [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

*Overrides [Cloneable](_iabtcf_core___api_documentation.cloneable.md).[clone](_iabtcf_core___api_documentation.cloneable.md#clone)*

*Defined in [src/model/PurposeRestriction.ts:43](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L43)*

Creates a clone of this PurposeRestriction

**Returns:** [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

___
<a id="issameas"></a>

###  isSameAs

▸ **isSameAs**(otherPR: *[PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)*): `boolean`

*Defined in [src/model/PurposeRestriction.ts:104](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L104)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| otherPR | [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md) |

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [src/model/PurposeRestriction.ts:99](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L99)*

**Returns:** `boolean`

___
<a id="unhash"></a>

### `<Static>` unHash

▸ **unHash**(hash: *`string`*): [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

*Defined in [src/model/PurposeRestriction.ts:49](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/PurposeRestriction.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |

**Returns:** [PurposeRestriction](_iabtcf_core___api_documentation.purposerestriction.md)

___

