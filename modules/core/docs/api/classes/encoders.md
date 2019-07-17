[@iabtcf/core - API Documentation](../README.md) > [Encoders](../classes/encoders.md)

# Class: Encoders

## Hierarchy

**Encoders**

## Index

### Properties

* [cmpId](encoders.md#cmpid)
* [cmpVersion](encoders.md#cmpversion)
* [consentLanguage](encoders.md#consentlanguage)
* [consentScreen](encoders.md#consentscreen)
* [created](encoders.md#created)
* [isServiceSpecific](encoders.md#isservicespecific)
* [lastUpdated](encoders.md#lastupdated)
* [policyVersion](encoders.md#policyversion)
* [publisherRestrictions](encoders.md#publisherrestrictions)
* [purposeConsents](encoders.md#purposeconsents)
* [purposeLITransparency](encoders.md#purposelitransparency)
* [purposeOneTreatment](encoders.md#purposeonetreatment)
* [referenceCountry](encoders.md#referencecountry)
* [specialFeatureOptIns](encoders.md#specialfeatureoptins)
* [useNonStandardStacks](encoders.md#usenonstandardstacks)
* [vendorConsents](encoders.md#vendorconsents)
* [vendorLegitimateInterest](encoders.md#vendorlegitimateinterest)
* [vendorListVersion](encoders.md#vendorlistversion)
* [version](encoders.md#version)

---

## Properties

<a id="cmpid"></a>

### `<Static>` cmpId

**● cmpId**: *`Object`* =  enc.IntEncoder

*Defined in [model/encodings/Encoders.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L8)*

___
<a id="cmpversion"></a>

### `<Static>` cmpVersion

**● cmpVersion**: *`Object`* =  enc.IntEncoder

*Defined in [model/encodings/Encoders.ts:9](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L9)*

___
<a id="consentlanguage"></a>

### `<Static>` consentLanguage

**● consentLanguage**: *`Object`* =  enc.LangEncoder

*Defined in [model/encodings/Encoders.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L11)*

___
<a id="consentscreen"></a>

### `<Static>` consentScreen

**● consentScreen**: *`Object`* =  enc.IntEncoder

*Defined in [model/encodings/Encoders.ts:10](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L10)*

___
<a id="created"></a>

### `<Static>` created

**● created**: *`Object`* =  enc.DateEncoder

*Defined in [model/encodings/Encoders.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L6)*

___
<a id="isservicespecific"></a>

### `<Static>` isServiceSpecific

**● isServiceSpecific**: *`Object`* =  enc.BooleanEncoder

*Defined in [model/encodings/Encoders.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L14)*

___
<a id="lastupdated"></a>

### `<Static>` lastUpdated

**● lastUpdated**: *`Object`* =  enc.DateEncoder

*Defined in [model/encodings/Encoders.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L7)*

___
<a id="policyversion"></a>

### `<Static>` policyVersion

**● policyVersion**: *`Object`* =  enc.IntEncoder

*Defined in [model/encodings/Encoders.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L13)*

___
<a id="publisherrestrictions"></a>

### `<Static>` publisherRestrictions

**● publisherRestrictions**: *`Object`* =  enc.PurposeRestrictionsEncoder

*Defined in [model/encodings/Encoders.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L23)*

___
<a id="purposeconsents"></a>

### `<Static>` purposeConsents

**● purposeConsents**: *`Object`* =  enc.FixedVectorEncoder

*Defined in [model/encodings/Encoders.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L17)*

___
<a id="purposelitransparency"></a>

### `<Static>` purposeLITransparency

**● purposeLITransparency**: *`Object`* =  enc.FixedVectorEncoder

*Defined in [model/encodings/Encoders.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L18)*

___
<a id="purposeonetreatment"></a>

### `<Static>` purposeOneTreatment

**● purposeOneTreatment**: *`Object`* =  enc.BooleanEncoder

*Defined in [model/encodings/Encoders.ts:19](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L19)*

___
<a id="referencecountry"></a>

### `<Static>` referenceCountry

**● referenceCountry**: *`Object`* =  enc.LangEncoder

*Defined in [model/encodings/Encoders.ts:20](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L20)*

___
<a id="specialfeatureoptins"></a>

### `<Static>` specialFeatureOptIns

**● specialFeatureOptIns**: *`Object`* =  enc.FixedVectorEncoder

*Defined in [model/encodings/Encoders.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L16)*

___
<a id="usenonstandardstacks"></a>

### `<Static>` useNonStandardStacks

**● useNonStandardStacks**: *`Object`* =  enc.BooleanEncoder

*Defined in [model/encodings/Encoders.ts:15](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L15)*

___
<a id="vendorconsents"></a>

### `<Static>` vendorConsents

**● vendorConsents**: *`Object`* =  enc.VendorVectorEncoder

*Defined in [model/encodings/Encoders.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L21)*

___
<a id="vendorlegitimateinterest"></a>

### `<Static>` vendorLegitimateInterest

**● vendorLegitimateInterest**: *`Object`* =  enc.VendorVectorEncoder

*Defined in [model/encodings/Encoders.ts:22](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L22)*

___
<a id="vendorlistversion"></a>

### `<Static>` vendorListVersion

**● vendorListVersion**: *`Object`* =  enc.IntEncoder

*Defined in [model/encodings/Encoders.ts:12](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L12)*

___
<a id="version"></a>

### `<Static>` version

**● version**: *`Object`* =  enc.IntEncoder

*Defined in [model/encodings/Encoders.ts:5](https://github.com/chrispaterson/iabtcf-es/blob/fa69024/modules/core/src/model/encodings/Encoders.ts#L5)*

___

