[@iabtcf/core - API Documentation](../README.md) > [FieldEncoderMap](../classes/fieldencodermap.md)

# Class: FieldEncoderMap

## Hierarchy

**FieldEncoderMap**

## Implements

* [TCFields](../interfaces/tcfields.md)

## Index

### Properties

* [cmpId](fieldencodermap.md#cmpid)
* [cmpVersion](fieldencodermap.md#cmpversion)
* [consentLanguage](fieldencodermap.md#consentlanguage)
* [consentScreen](fieldencodermap.md#consentscreen)
* [created](fieldencodermap.md#created)
* [isServiceSpecific](fieldencodermap.md#isservicespecific)
* [lastUpdated](fieldencodermap.md#lastupdated)
* [numCustomPurposes](fieldencodermap.md#numcustompurposes)
* [policyVersion](fieldencodermap.md#policyversion)
* [publisherConsents](fieldencodermap.md#publisherconsents)
* [publisherCountryCode](fieldencodermap.md#publishercountrycode)
* [publisherCustomConsents](fieldencodermap.md#publishercustomconsents)
* [publisherCustomLegitimateInterest](fieldencodermap.md#publishercustomlegitimateinterest)
* [publisherLegitimateInterest](fieldencodermap.md#publisherlegitimateinterest)
* [publisherRestrictions](fieldencodermap.md#publisherrestrictions)
* [purposeConsents](fieldencodermap.md#purposeconsents)
* [purposeLegitimateInterest](fieldencodermap.md#purposelegitimateinterest)
* [purposeOneTreatment](fieldencodermap.md#purposeonetreatment)
* [segmentType](fieldencodermap.md#segmenttype)
* [specialFeatureOptIns](fieldencodermap.md#specialfeatureoptins)
* [useNonStandardStacks](fieldencodermap.md#usenonstandardstacks)
* [vendorConsents](fieldencodermap.md#vendorconsents)
* [vendorLegitimateInterest](fieldencodermap.md#vendorlegitimateinterest)
* [vendorListVersion](fieldencodermap.md#vendorlistversion)
* [vendorsAllowed](fieldencodermap.md#vendorsallowed)
* [vendorsDisclosed](fieldencodermap.md#vendorsdisclosed)
* [version](fieldencodermap.md#version)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[cmpId](../interfaces/tcfields.md#cmpid)*

*Defined in encoder/field/FieldEncoderMap.ts:22*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[cmpVersion](../interfaces/tcfields.md#cmpversion)*

*Defined in encoder/field/FieldEncoderMap.ts:23*

___
<a id="consentlanguage"></a>

###  consentLanguage

**● consentLanguage**: *[LangEncoder](langencoder.md)* =  LangEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[consentLanguage](../interfaces/tcfields.md#consentlanguage)*

*Defined in encoder/field/FieldEncoderMap.ts:25*

___
<a id="consentscreen"></a>

###  consentScreen

**● consentScreen**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[consentScreen](../interfaces/tcfields.md#consentscreen)*

*Defined in encoder/field/FieldEncoderMap.ts:24*

___
<a id="created"></a>

###  created

**● created**: *[DateEncoder](dateencoder.md)* =  DateEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[created](../interfaces/tcfields.md#created)*

*Defined in encoder/field/FieldEncoderMap.ts:20*

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *[BooleanEncoder](booleanencoder.md)* =  BooleanEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[isServiceSpecific](../interfaces/tcfields.md#isservicespecific)*

*Defined in encoder/field/FieldEncoderMap.ts:28*

___
<a id="lastupdated"></a>

###  lastUpdated

**● lastUpdated**: *[DateEncoder](dateencoder.md)* =  DateEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[lastUpdated](../interfaces/tcfields.md#lastupdated)*

*Defined in encoder/field/FieldEncoderMap.ts:21*

___
<a id="numcustompurposes"></a>

###  numCustomPurposes

**● numCustomPurposes**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[numCustomPurposes](../interfaces/tcfields.md#numcustompurposes)*

*Defined in encoder/field/FieldEncoderMap.ts:44*

___
<a id="policyversion"></a>

###  policyVersion

**● policyVersion**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[policyVersion](../interfaces/tcfields.md#policyversion)*

*Defined in encoder/field/FieldEncoderMap.ts:27*

___
<a id="publisherconsents"></a>

###  publisherConsents

**● publisherConsents**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherConsents](../interfaces/tcfields.md#publisherconsents)*

*Defined in encoder/field/FieldEncoderMap.ts:42*

___
<a id="publishercountrycode"></a>

###  publisherCountryCode

**● publisherCountryCode**: *[LangEncoder](langencoder.md)* =  LangEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherCountryCode](../interfaces/tcfields.md#publishercountrycode)*

*Defined in encoder/field/FieldEncoderMap.ts:34*

___
<a id="publishercustomconsents"></a>

###  publisherCustomConsents

**● publisherCustomConsents**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherCustomConsents](../interfaces/tcfields.md#publishercustomconsents)*

*Defined in encoder/field/FieldEncoderMap.ts:45*

___
<a id="publishercustomlegitimateinterest"></a>

###  publisherCustomLegitimateInterest

**● publisherCustomLegitimateInterest**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherCustomLegitimateInterest](../interfaces/tcfields.md#publishercustomlegitimateinterest)*

*Defined in encoder/field/FieldEncoderMap.ts:46*

___
<a id="publisherlegitimateinterest"></a>

###  publisherLegitimateInterest

**● publisherLegitimateInterest**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherLegitimateInterest](../interfaces/tcfields.md#publisherlegitimateinterest)*

*Defined in encoder/field/FieldEncoderMap.ts:43*

___
<a id="publisherrestrictions"></a>

###  publisherRestrictions

**● publisherRestrictions**: *[PurposeRestrictionVectorEncoder](purposerestrictionvectorencoder.md)* =  PurposeRestrictionVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[publisherRestrictions](../interfaces/tcfields.md#publisherrestrictions)*

*Defined in encoder/field/FieldEncoderMap.ts:37*

___
<a id="purposeconsents"></a>

###  purposeConsents

**● purposeConsents**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeConsents](../interfaces/tcfields.md#purposeconsents)*

*Defined in encoder/field/FieldEncoderMap.ts:31*

___
<a id="purposelegitimateinterest"></a>

###  purposeLegitimateInterest

**● purposeLegitimateInterest**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeLegitimateInterest](../interfaces/tcfields.md#purposelegitimateinterest)*

*Defined in encoder/field/FieldEncoderMap.ts:32*

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *[BooleanEncoder](booleanencoder.md)* =  BooleanEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[purposeOneTreatment](../interfaces/tcfields.md#purposeonetreatment)*

*Defined in encoder/field/FieldEncoderMap.ts:33*

___
<a id="segmenttype"></a>

###  segmentType

**● segmentType**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Defined in encoder/field/FieldEncoderMap.ts:39*

___
<a id="specialfeatureoptins"></a>

###  specialFeatureOptIns

**● specialFeatureOptIns**: *[FixedVectorEncoder](fixedvectorencoder.md)* =  FixedVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[specialFeatureOptIns](../interfaces/tcfields.md#specialfeatureoptins)*

*Defined in encoder/field/FieldEncoderMap.ts:30*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *[BooleanEncoder](booleanencoder.md)* =  BooleanEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[useNonStandardStacks](../interfaces/tcfields.md#usenonstandardstacks)*

*Defined in encoder/field/FieldEncoderMap.ts:29*

___
<a id="vendorconsents"></a>

###  vendorConsents

**● vendorConsents**: *[VendorVectorEncoder](vendorvectorencoder.md)* =  VendorVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorConsents](../interfaces/tcfields.md#vendorconsents)*

*Defined in encoder/field/FieldEncoderMap.ts:35*

___
<a id="vendorlegitimateinterest"></a>

###  vendorLegitimateInterest

**● vendorLegitimateInterest**: *[VendorVectorEncoder](vendorvectorencoder.md)* =  VendorVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorLegitimateInterest](../interfaces/tcfields.md#vendorlegitimateinterest)*

*Defined in encoder/field/FieldEncoderMap.ts:36*

___
<a id="vendorlistversion"></a>

###  vendorListVersion

**● vendorListVersion**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorListVersion](../interfaces/tcfields.md#vendorlistversion)*

*Defined in encoder/field/FieldEncoderMap.ts:26*

___
<a id="vendorsallowed"></a>

###  vendorsAllowed

**● vendorsAllowed**: *[VendorVectorEncoder](vendorvectorencoder.md)* =  VendorVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorsAllowed](../interfaces/tcfields.md#vendorsallowed)*

*Defined in encoder/field/FieldEncoderMap.ts:41*

___
<a id="vendorsdisclosed"></a>

###  vendorsDisclosed

**● vendorsDisclosed**: *[VendorVectorEncoder](vendorvectorencoder.md)* =  VendorVectorEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[vendorsDisclosed](../interfaces/tcfields.md#vendorsdisclosed)*

*Defined in encoder/field/FieldEncoderMap.ts:40*

___
<a id="version"></a>

###  version

**● version**: *[IntEncoder](intencoder.md)* =  IntEncoder

*Implementation of [TCFields](../interfaces/tcfields.md).[version](../interfaces/tcfields.md#version)*

*Defined in encoder/field/FieldEncoderMap.ts:19*

___

