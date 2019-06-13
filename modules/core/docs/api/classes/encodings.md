[@iabtcf/core - API Documentation](../README.md) > [Encodings](../classes/encodings.md)

# Class: Encodings

## Hierarchy

**Encodings**

## Index

### Properties

* [ENCODING](encodings.md#encoding)

### Methods

* [intWithinRange](encodings.md#intwithinrange)

### Object literals

* [BITS](encodings.md#bits)

---

## Properties

<a id="encoding"></a>

### `<Static>` ENCODING

**● ENCODING**: *`string`[][]* =  [

    // tcf v1
    [
      'VERSION',
      'CREATED',
      'LAST_UPDATED',
      'CMP_ID',
      'CMP_VERSION',
      'CONSENT_SCREEN',
      'CONSENT_LANGUAGE',
      'VENDOR_LIST_VERSION',
      'PURPOSES_CONSENT',
      'VENDOR_CONSENT',
    ],

    // tcf v2
    [
      'VERSION',
      'CHECKSUM',
      'CREATED',
      'LAST_UPDATED',
      'CMP_ID',
      'CMP_VERSION',
      'CONSENT_SCREEN',
      'CONSENT_LANGUAGE',
      'VENDOR_LIST_VERSION',
      'POLICY_VERSION',
      'IS_SERVICE_SPECIFIC',
      'USE_NON_STANDARD_STACKS',
      'SPECIAL_FEATURE_OPTINS',
      'PURPOSES_CONSENT',
      'PURPOSES_LI_TRANSPARENCY',
      'VENDOR_CONSENT',
      'VENDOR_LI',
      'PUBLISHER_RESTRICTIONS',
    ],
  ]

*Defined in [Encodings.ts:39](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L39)*

The outer array describes index is encoding version - 1 (since it's zero-based) and the inner array is the string representation of the BITS static above ordered by "IAB Tech Lab - Consent string and vendor list formats v2"

___

## Methods

<a id="intwithinrange"></a>

### `<Static>` intWithinRange

▸ **intWithinRange**(bits: *`number`*, checkValue: *`number`*): `boolean`

*Defined in [Encodings.ts:86](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L86)*

intWithinRange - Determines weither a given value will fit within the encoding of bits

*__static__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bits | `number` |  Use Encodings.BITS.\[FIELDNAME\] which contains the number of bits to be encoded |
| checkValue | `number` |  the value to check |

**Returns:** `boolean`
*   whether or not the value will fit within the encoding length

___

## Object literals

<a id="bits"></a>

### `<Static>` BITS

**BITS**: *`object`*

*Defined in [Encodings.ts:10](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L10)*

key is the name of the field and the value is the number of bits reserved for the field. These values come directly from the "IAB Tech Lab - Consent string and vendor list formats v2". If the value is 0, that means that is is a variable length encoding.

<a id="bits.checksum"></a>

####  CHECKSUM

**● CHECKSUM**: *`number`* = 18

*Defined in [Encodings.ts:12](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L12)*

___
<a id="bits.cmpid"></a>

####  CMPID

**● CMPID**: *`number`* = 12

*Defined in [Encodings.ts:15](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L15)*

___
<a id="bits.cmp_version"></a>

####  CMP_VERSION

**● CMP_VERSION**: *`number`* = 12

*Defined in [Encodings.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L16)*

___
<a id="bits.consent_language"></a>

####  CONSENT_LANGUAGE

**● CONSENT_LANGUAGE**: *`number`* = 12

*Defined in [Encodings.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L18)*

___
<a id="bits.consent_screen"></a>

####  CONSENT_SCREEN

**● CONSENT_SCREEN**: *`number`* = 6

*Defined in [Encodings.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L17)*

___
<a id="bits.created"></a>

####  CREATED

**● CREATED**: *`number`* = 36

*Defined in [Encodings.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L13)*

___
<a id="bits.is_service_specific"></a>

####  IS_SERVICE_SPECIFIC

**● IS_SERVICE_SPECIFIC**: *`number`* = 1

*Defined in [Encodings.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L21)*

___
<a id="bits.last_updated"></a>

####  LAST_UPDATED

**● LAST_UPDATED**: *`number`* = 36

*Defined in [Encodings.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L14)*

___
<a id="bits.policy_version"></a>

####  POLICY_VERSION

**● POLICY_VERSION**: *`number`* = 6

*Defined in [Encodings.ts:20](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L20)*

___
<a id="bits.publisher_restrictions"></a>

####  PUBLISHER_RESTRICTIONS

**● PUBLISHER_RESTRICTIONS**: *`number`* = 0

*Defined in [Encodings.ts:28](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L28)*

___
<a id="bits.purposes_consent"></a>

####  PURPOSES_CONSENT

**● PURPOSES_CONSENT**: *`number`* = 24

*Defined in [Encodings.ts:24](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L24)*

___
<a id="bits.purposes_li_established"></a>

####  PURPOSES_LI_ESTABLISHED

**● PURPOSES_LI_ESTABLISHED**: *`number`* = 24

*Defined in [Encodings.ts:25](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L25)*

___
<a id="bits.special_feature_optins"></a>

####  SPECIAL_FEATURE_OPTINS

**● SPECIAL_FEATURE_OPTINS**: *`number`* = 12

*Defined in [Encodings.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L23)*

___
<a id="bits.use_non_standard_stacks"></a>

####  USE_NON_STANDARD_STACKS

**● USE_NON_STANDARD_STACKS**: *`number`* = 1

*Defined in [Encodings.ts:22](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L22)*

___
<a id="bits.vendor_consent"></a>

####  VENDOR_CONSENT

**● VENDOR_CONSENT**: *`number`* = 0

*Defined in [Encodings.ts:26](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L26)*

___
<a id="bits.vendor_li"></a>

####  VENDOR_LI

**● VENDOR_LI**: *`number`* = 0

*Defined in [Encodings.ts:27](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L27)*

___
<a id="bits.vendor_list_version"></a>

####  VENDOR_LIST_VERSION

**● VENDOR_LIST_VERSION**: *`number`* = 12

*Defined in [Encodings.ts:19](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L19)*

___
<a id="bits.version"></a>

####  VERSION

**● VERSION**: *`number`* = 6

*Defined in [Encodings.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/0fbe340/modules/core/src/Encodings.ts#L11)*

___

___

