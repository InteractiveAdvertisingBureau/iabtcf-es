[@iabtcf/core - API Documentation](../README.md) > [PurposeRestriction](../classes/purposerestriction.md)

# Class: PurposeRestriction

## Hierarchy

 [Cloneable](cloneable.md)<[PurposeRestriction](purposerestriction.md)>

**↳ PurposeRestriction**

## Index

### Constructors

* [constructor](purposerestriction.md#constructor)

### Properties

* [restrictionType](purposerestriction.md#restrictiontype)
* [hashSeparator](purposerestriction.md#hashseparator)

### Accessors

* [hash](purposerestriction.md#hash)
* [purposeId](purposerestriction.md#purposeid)

### Methods

* [clone](purposerestriction.md#clone)
* [isSameAs](purposerestriction.md#issameas)
* [isValid](purposerestriction.md#isvalid)
* [unHash](purposerestriction.md#unhash)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PurposeRestriction**(purposeId?: *`undefined` \| `number`*, restrictionType?: *[RestrictionType](../enums/restrictiontype.md)*): [PurposeRestriction](purposerestriction.md)

*Overrides [Cloneable](cloneable.md).[constructor](cloneable.md#constructor)*

*Defined in [model/PurposeRestriction.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L10)*

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

*Defined in [model/PurposeRestriction.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L10)*

___
<a id="hashseparator"></a>

### `<Static>` hashSeparator

**● hashSeparator**: *`string`* = "-"

*Defined in [model/PurposeRestriction.ts:7](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L7)*

___

## Accessors

<a id="hash"></a>

###  hash

**get hash**(): `string`

*Defined in [model/PurposeRestriction.ts:66](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L66)*

**Returns:** `string`

___
<a id="purposeid"></a>

###  purposeId

**get purposeId**(): `number`

**set purposeId**(idNum: *`number`*): `void`

*Defined in [model/PurposeRestriction.ts:83](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L83)*

**Returns:** `number`
The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.

*Defined in [model/PurposeRestriction.ts:93](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L93)*

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

▸ **_clone**(...constructorArgs: *[AnyArray](../#anyarray)*): [PurposeRestriction](purposerestriction.md)

*Inherited from [Cloneable](cloneable.md).[_clone](cloneable.md#_clone)*

*Defined in [cloneable/Cloneable.ts:52](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/cloneable/Cloneable.ts#L52)*

Method to be called in the child concrete class's clone method

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` constructorArgs | [AnyArray](../#anyarray) |  arguments to be passed to the cloned objects constructor if need be |

**Returns:** [PurposeRestriction](purposerestriction.md)

___
<a id="clone"></a>

###  clone

▸ **clone**(): [PurposeRestriction](purposerestriction.md)

*Overrides [Cloneable](cloneable.md).[clone](cloneable.md#clone)*

*Defined in [model/PurposeRestriction.ts:43](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L43)*

Creates a clone of this PurposeRestriction

**Returns:** [PurposeRestriction](purposerestriction.md)

___
<a id="issameas"></a>

###  isSameAs

▸ **isSameAs**(otherPR: *[PurposeRestriction](purposerestriction.md)*): `boolean`

*Defined in [model/PurposeRestriction.ts:104](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L104)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| otherPR | [PurposeRestriction](purposerestriction.md) |

**Returns:** `boolean`

___
<a id="isvalid"></a>

###  isValid

▸ **isValid**(): `boolean`

*Defined in [model/PurposeRestriction.ts:99](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L99)*

**Returns:** `boolean`

___
<a id="unhash"></a>

### `<Static>` unHash

▸ **unHash**(hash: *`string`*): [PurposeRestriction](purposerestriction.md)

*Defined in [model/PurposeRestriction.ts:49](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/core/src/model/PurposeRestriction.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| hash | `string` |

**Returns:** [PurposeRestriction](purposerestriction.md)

___

