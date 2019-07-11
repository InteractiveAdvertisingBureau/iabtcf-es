[@iabtcf/core - API Documentation](../README.md) > [PurposeRestriction](../classes/purposerestriction.md)

# Class: PurposeRestriction

## Hierarchy

**PurposeRestriction**

## Index

### Constructors

* [constructor](purposerestriction.md#constructor)

### Properties

* [restrictionType](purposerestriction.md#restrictiontype)
* [availablePurposeIds](purposerestriction.md#availablepurposeids)
* [hashSeparator](purposerestriction.md#hashseparator)

### Accessors

* [hash](purposerestriction.md#hash)
* [purposeId](purposerestriction.md#purposeid)

### Methods

* [isSameAs](purposerestriction.md#issameas)
* [isValid](purposerestriction.md#isvalid)
* [unHash](purposerestriction.md#unhash)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PurposeRestriction**(purposeId?: *`undefined` \| `number`*, restrictionType?: *[RestrictionType](../enums/restrictiontype.md)*): [PurposeRestriction](purposerestriction.md)

*Defined in model/structures/PurposeRestriction.ts:10*

constructor

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` purposeId | `undefined` \| `number` |
| `Optional` restrictionType | [RestrictionType](../enums/restrictiontype.md) |

**Returns:** [PurposeRestriction](purposerestriction.md)

___

## Properties

<a id="restrictiontype"></a>

###  restrictionType

**● restrictionType**: *[RestrictionType](../enums/restrictiontype.md)*

*Defined in model/structures/PurposeRestriction.ts:10*

___
<a id="availablepurposeids"></a>

### `<Static>` availablePurposeIds

**● availablePurposeIds**: *`Set`<`number`>* =  new Set()

*Defined in model/structures/PurposeRestriction.ts:6*

___
<a id="hashseparator"></a>

### `<Static>` hashSeparator

**● hashSeparator**: *`string`* = "-"

*Defined in model/structures/PurposeRestriction.ts:7*

___

## Accessors

<a id="hash"></a>

###  hash

**get hash**(): `string`

*Defined in model/structures/PurposeRestriction.ts:52*

**Returns:** `string`

___
<a id="purposeid"></a>

###  purposeId

**get purposeId**(): `number`

**set purposeId**(idNum: *`number`*): `void`

*Defined in model/structures/PurposeRestriction.ts:68*

**Returns:** `number`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

*Defined in model/structures/PurposeRestriction.ts:78*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| idNum | `number` |  The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists. |

**Returns:** `void`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

___

## Methods

<a id="issameas"></a>

###  isSameAs

▸ **isSameAs**(otherPR: *[PurposeRestriction](purposerestriction.md)*): `boolean`

*Defined in model/structures/PurposeRestriction.ts:97*

**Parameters:**

| Name | Type |
| ------ | ------ |
| otherPR | [PurposeRestriction](purposerestriction.md) |

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in model/structures/PurposeRestriction.ts:92*

**Returns:** `boolean`

___
<a id="unhash"></a>

### `<Static>` unHash

▸ **unHash**(hash: *`string`*): [PurposeRestriction](purposerestriction.md)

*Defined in model/structures/PurposeRestriction.ts:35*

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |

**Returns:** [PurposeRestriction](purposerestriction.md)

___

