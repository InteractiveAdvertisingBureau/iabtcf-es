[@iabtcf/core - API Documentation](../README.md) > [Decoders](../classes/decoders.md)

# Class: Decoders

## Hierarchy

**Decoders**

## Index

### Properties

* [cmpId](decoders.md#cmpid)
* [cmpVersion](decoders.md#cmpversion)
* [consentLanguage](decoders.md#consentlanguage)
* [consentScreen](decoders.md#consentscreen)
* [created](decoders.md#created)
* [isServiceSpecific](decoders.md#isservicespecific)
* [lastUpdated](decoders.md#lastupdated)
* [policyVersion](decoders.md#policyversion)
* [publisherRestrictions](decoders.md#publisherrestrictions)
* [purposeConsents](decoders.md#purposeconsents)
* [purposeLITranspardecy](decoders.md#purposelitranspardecy)
* [purposeOneTreatment](decoders.md#purposeonetreatment)
* [referdeceCountry](decoders.md#referdececountry)
* [specialFeatureOptIns](decoders.md#specialfeatureoptins)
* [useNonStandardStacks](decoders.md#usenonstandardstacks)
* [vendorConsents](decoders.md#vendorconsents)
* [vendorLegitimateInterest](decoders.md#vendorlegitimateinterest)
* [vendorListVersion](decoders.md#vendorlistversion)
* [version](decoders.md#version)

---

## Properties

<a id="cmpid"></a>

### `<Static>` cmpId

**● cmpId**: *`Function`* =  dec.IntDecoder.constructor

*Defined in [model/encodings/Decoders.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L8)*

___
<a id="cmpversion"></a>

### `<Static>` cmpVersion

**● cmpVersion**: *`Function`* =  dec.IntDecoder.constructor

*Defined in [model/encodings/Decoders.ts:9](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L9)*

___
<a id="consentlanguage"></a>

### `<Static>` consentLanguage

**● consentLanguage**: *`Function`* =  dec.LangDecoder.constructor

*Defined in [model/encodings/Decoders.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L11)*

___
<a id="consentscreen"></a>

### `<Static>` consentScreen

**● consentScreen**: *`Function`* =  dec.IntDecoder.constructor

*Defined in [model/encodings/Decoders.ts:10](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L10)*

___
<a id="created"></a>

### `<Static>` created

**● created**: *`Function`* =  dec.DateDecoder.constructor

*Defined in [model/encodings/Decoders.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L6)*

___
<a id="isservicespecific"></a>

### `<Static>` isServiceSpecific

**● isServiceSpecific**: *`Function`* =  dec.BooleanDecoder.constructor

*Defined in [model/encodings/Decoders.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L14)*

___
<a id="lastupdated"></a>

### `<Static>` lastUpdated

**● lastUpdated**: *`Function`* =  dec.DateDecoder.constructor

*Defined in [model/encodings/Decoders.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L7)*

___
<a id="policyversion"></a>

### `<Static>` policyVersion

**● policyVersion**: *`Function`* =  dec.IntDecoder.constructor

*Defined in [model/encodings/Decoders.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L13)*

___
<a id="publisherrestrictions"></a>

### `<Static>` publisherRestrictions

**● publisherRestrictions**: *`Function`* =  dec.PurposeRestrictionsDecoder.constructor

*Defined in [model/encodings/Decoders.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L23)*

___
<a id="purposeconsents"></a>

### `<Static>` purposeConsents

**● purposeConsents**: *`Function`* =  dec.FixedVectorDecoder.constructor

*Defined in [model/encodings/Decoders.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L17)*

___
<a id="purposelitranspardecy"></a>

### `<Static>` purposeLITranspardecy

**● purposeLITranspardecy**: *`Function`* =  dec.FixedVectorDecoder.constructor

*Defined in [model/encodings/Decoders.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L18)*

___
<a id="purposeonetreatment"></a>

### `<Static>` purposeOneTreatment

**● purposeOneTreatment**: *`Function`* =  dec.BooleanDecoder.constructor

*Defined in [model/encodings/Decoders.ts:19](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L19)*

___
<a id="referdececountry"></a>

### `<Static>` referdeceCountry

**● referdeceCountry**: *`Function`* =  dec.LangDecoder.constructor

*Defined in [model/encodings/Decoders.ts:20](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L20)*

___
<a id="specialfeatureoptins"></a>

### `<Static>` specialFeatureOptIns

**● specialFeatureOptIns**: *`Function`* =  dec.FixedVectorDecoder.constructor

*Defined in [model/encodings/Decoders.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L16)*

___
<a id="usenonstandardstacks"></a>

### `<Static>` useNonStandardStacks

**● useNonStandardStacks**: *`Function`* =  dec.BooleanDecoder.constructor

*Defined in [model/encodings/Decoders.ts:15](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L15)*

___
<a id="vendorconsents"></a>

### `<Static>` vendorConsents

**● vendorConsents**: *`Function`* =  dec.VendorVectorDecoder.constructor

*Defined in [model/encodings/Decoders.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L21)*

___
<a id="vendorlegitimateinterest"></a>

### `<Static>` vendorLegitimateInterest

**● vendorLegitimateInterest**: *`Function`* =  dec.VendorVectorDecoder.constructor

*Defined in [model/encodings/Decoders.ts:22](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L22)*

___
<a id="vendorlistversion"></a>

### `<Static>` vendorListVersion

**● vendorListVersion**: *`Function`* =  dec.IntDecoder.constructor

*Defined in [model/encodings/Decoders.ts:12](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L12)*

___
<a id="version"></a>

### `<Static>` version

**● version**: *`Function`* =  dec.IntDecoder.constructor

*Defined in [model/encodings/Decoders.ts:5](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Decoders.ts#L5)*

___

