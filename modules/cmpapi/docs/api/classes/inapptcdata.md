[@iabtcf/cmpapi - API Documentation](../README.md) > [InAppTCData](../classes/inapptcdata.md)

# Class: InAppTCData

## Hierarchy

 [Return](return.md)

**↳ InAppTCData**

## Index

### Properties

* [cmpId](inapptcdata.md#cmpid)
* [cmpVersion](inapptcdata.md#cmpversion)
* [eventStatus](inapptcdata.md#eventstatus)
* [gdprApplies](inapptcdata.md#gdprapplies)
* [outOfBand](inapptcdata.md#outofband)
* [publisher](inapptcdata.md#publisher)
* [publisherCC](inapptcdata.md#publishercc)
* [purpose](inapptcdata.md#purpose)
* [purposeOneTreatment](inapptcdata.md#purposeonetreatment)
* [speicalFeatureOptins](inapptcdata.md#speicalfeatureoptins)
* [tcString](inapptcdata.md#tcstring)
* [tcfPolicyVersion](inapptcdata.md#tcfpolicyversion)
* [useNonStandardStacks](inapptcdata.md#usenonstandardstacks)
* [vendor](inapptcdata.md#vendor)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Inherited from [Return](return.md).[cmpId](return.md#cmpid)*

*Defined in [model/Return.ts:5](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L5)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Inherited from [Return](return.md).[cmpVersion](return.md#cmpversion)*

*Defined in [model/Return.ts:6](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L6)*

___
<a id="eventstatus"></a>

###  eventStatus

**● eventStatus**: *`string`*

*Defined in [model/InAppTCData.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L13)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [Return](return.md).[gdprApplies](return.md#gdprapplies)*

*Defined in [model/Return.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L7)*

___
<a id="outofband"></a>

###  outOfBand

**● outOfBand**: *`object`*

*Defined in [model/InAppTCData.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L17)*

#### Type declaration

 allowedVendors: [StringBoolVector](../interfaces/stringboolvector.md)

 discloseVendors: [StringBoolVector](../interfaces/stringboolvector.md)

___
<a id="publisher"></a>

###  publisher

**● publisher**: *`object`*

*Defined in [model/InAppTCData.ts:36](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L36)*

#### Type declaration

 consents: [StringBoolVector](../interfaces/stringboolvector.md)

 customPurpose: `object`

 consents: [StringBoolVector](../interfaces/stringboolvector.md)

 legitimateInterests: [StringBoolVector](../interfaces/stringboolvector.md)

 legitimateInterests: [StringBoolVector](../interfaces/stringboolvector.md)

 restrictions: `object`

[purposeId: `string`]: `object`

[vendorId: `string`]: `0` \| `1` \| `2`

___
<a id="publishercc"></a>

###  publisherCC

**● publisherCC**: *`string`*

*Defined in [model/InAppTCData.ts:15](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L15)*

___
<a id="purpose"></a>

###  purpose

**● purpose**: *`object`*

*Defined in [model/InAppTCData.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L23)*

#### Type declaration

 consents: [StringBoolVector](../interfaces/stringboolvector.md)

 legitimateInterests: [StringBoolVector](../interfaces/stringboolvector.md)

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *[BoolInt](../#boolint)*

*Defined in [model/InAppTCData.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L16)*

___
<a id="speicalfeatureoptins"></a>

###  speicalFeatureOptins

**● speicalFeatureOptins**: *[StringBoolVector](../interfaces/stringboolvector.md)*

*Defined in [model/InAppTCData.ts:35](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L35)*

___
<a id="tcstring"></a>

###  tcString

**● tcString**: *`string`*

*Defined in [model/InAppTCData.ts:12](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L12)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Inherited from [Return](return.md).[tcfPolicyVersion](return.md#tcfpolicyversion)*

*Defined in [model/Return.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L8)*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *[BoolInt](../#boolint)*

*Defined in [model/InAppTCData.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L14)*

___
<a id="vendor"></a>

###  vendor

**● vendor**: *`object`*

*Defined in [model/InAppTCData.ts:29](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/InAppTCData.ts#L29)*

#### Type declaration

 consents: [StringBoolVector](../interfaces/stringboolvector.md)

 legitimateInterestslegInts: [StringBoolVector](../interfaces/stringboolvector.md)

___

