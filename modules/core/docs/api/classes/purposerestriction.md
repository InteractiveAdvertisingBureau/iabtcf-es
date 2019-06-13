[@iabtcf/core - API Documentation](../README.md) > [PurposeRestriction](../classes/purposerestriction.md)

# Class: PurposeRestriction

## Hierarchy

**PurposeRestriction**

## Index

### Properties

* [restrictionType](purposerestriction.md#restrictiontype)
* [availablePurposeIds](purposerestriction.md#availablepurposeids)

### Accessors

* [purposeId](purposerestriction.md#purposeid)

---

## Properties

<a id="restrictiontype"></a>

###  restrictionType

**● restrictionType**: *[PurposeRestrictionTypes](../enums/purposerestrictiontypes.md)*

*Defined in [PurposeRestriction.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/PurposeRestriction.ts#L8)*

___
<a id="availablepurposeids"></a>

### `<Static>` availablePurposeIds

**● availablePurposeIds**: *`Set`<`number`>* =  new Set()

*Defined in [PurposeRestriction.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/PurposeRestriction.ts#L6)*

___

## Accessors

<a id="purposeid"></a>

###  purposeId

**get purposeId**(): `number`

**set purposeId**(idNum: *`number`*): `void`

*Defined in [PurposeRestriction.ts:15](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/PurposeRestriction.ts#L15)*

**Returns:** `number`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

*Defined in [PurposeRestriction.ts:25](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/PurposeRestriction.ts#L25)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| idNum | `number` |  The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists. |

**Returns:** `void`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

___

