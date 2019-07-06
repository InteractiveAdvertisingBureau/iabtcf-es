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

### Accessors

* [purposeId](purposerestriction.md#purposeid)

### Methods

* [isSameAs](purposerestriction.md#issameas)
* [isValid](purposerestriction.md#isvalid)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PurposeRestriction**(purposeId?: *`undefined` \| `number`*, restrictionType?: *[PurposeRestrictionTypeEnum](../enums/purposerestrictiontypeenum.md)*): [PurposeRestriction](purposerestriction.md)

*Defined in [model/PurposeRestriction.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L8)*

constructor

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` purposeId | `undefined` \| `number` |
| `Optional` restrictionType | [PurposeRestrictionTypeEnum](../enums/purposerestrictiontypeenum.md) |

**Returns:** [PurposeRestriction](purposerestriction.md)

___

## Properties

<a id="restrictiontype"></a>

###  restrictionType

**● restrictionType**: *[PurposeRestrictionTypeEnum](../enums/purposerestrictiontypeenum.md)*

*Defined in [model/PurposeRestriction.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L8)*

___
<a id="availablepurposeids"></a>

### `<Static>` availablePurposeIds

**● availablePurposeIds**: *`Set`<`number`>* =  new Set()

*Defined in [model/PurposeRestriction.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L6)*

___

## Accessors

<a id="purposeid"></a>

###  purposeId

**get purposeId**(): `number`

**set purposeId**(idNum: *`number`*): `void`

*Defined in [model/PurposeRestriction.ts:39](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L39)*

**Returns:** `number`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

*Defined in [model/PurposeRestriction.ts:49](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L49)*

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

*Defined in [model/PurposeRestriction.ts:68](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| otherPR | [PurposeRestriction](purposerestriction.md) |

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [model/PurposeRestriction.ts:63](https://github.com/chrispaterson/iabtcf-es/blob/aea9b2e/modules/core/src/model/PurposeRestriction.ts#L63)*

**Returns:** `boolean`

___

