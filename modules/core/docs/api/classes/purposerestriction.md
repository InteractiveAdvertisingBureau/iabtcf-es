[@iabtcf/core - API Documentation](../README.md) > [PurposeRestriction](../classes/purposerestriction.md)

# Class: PurposeRestriction

## Hierarchy

**PurposeRestriction**

## Index

### Properties

* [availablePurposeIds](purposerestriction.md#availablepurposeids)

### Accessors

* [purposeId](purposerestriction.md#purposeid)
* [restrictionType](purposerestriction.md#restrictiontype)

---

## Properties

<a id="availablepurposeids"></a>

### `<Static>` availablePurposeIds

**● availablePurposeIds**: *`Set`<`number`>*

*Defined in [PurposeRestriction.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/PurposeRestriction.ts#L6)*

___

## Accessors

<a id="purposeid"></a>

###  purposeId

**get purposeId**(): `number`

**set purposeId**(idNum: *`number`*): `void`

*Defined in [PurposeRestriction.ts:15](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/PurposeRestriction.ts#L15)*

**Returns:** `number`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

*Defined in [PurposeRestriction.ts:25](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/PurposeRestriction.ts#L25)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| idNum | `number` |  The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists. |

**Returns:** `void`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

___
<a id="restrictiontype"></a>

###  restrictionType

**get restrictionType**(): [PurposeRestrictionTypes](../enums/purposerestrictiontypes.md)

**set restrictionType**(value: *[PurposeRestrictionTypes](../enums/purposerestrictiontypes.md)*): `void`

*Defined in [PurposeRestriction.ts:39](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/PurposeRestriction.ts#L39)*

**Returns:** [PurposeRestrictionTypes](../enums/purposerestrictiontypes.md)

*Defined in [PurposeRestriction.ts:45](https://github.com/chrispaterson/iabtcf-es/blob/4c5d7e6/modules/core/src/PurposeRestriction.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | [PurposeRestrictionTypes](../enums/purposerestrictiontypes.md) |

**Returns:** `void`

___

