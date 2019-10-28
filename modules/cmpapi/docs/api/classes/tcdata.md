[@iabtcf/cmpapi - API Documentation](../README.md) > [TCData](../classes/tcdata.md)

# Class: TCData

## Hierarchy

 [Return](return.md)

**↳ TCData**

## Index

### Properties

* [cmpId](tcdata.md#cmpid)
* [cmpVersion](tcdata.md#cmpversion)
* [eventStatus](tcdata.md#eventstatus)
* [gdprApplies](tcdata.md#gdprapplies)
* [isServiceSpecific](tcdata.md#isservicespecific)
* [outOfBand](tcdata.md#outofband)
* [publisher](tcdata.md#publisher)
* [publisherCC](tcdata.md#publishercc)
* [purpose](tcdata.md#purpose)
* [purposeOneTreatment](tcdata.md#purposeonetreatment)
* [speicalFeatureOptins](tcdata.md#speicalfeatureoptins)
* [tcString](tcdata.md#tcstring)
* [tcfPolicyVersion](tcdata.md#tcfpolicyversion)
* [useNonStandardStacks](tcdata.md#usenonstandardstacks)
* [vendor](tcdata.md#vendor)

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

*Defined in [model/TCData.ts:9](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L9)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Inherited from [Return](return.md).[gdprApplies](return.md#gdprapplies)*

*Defined in [model/Return.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L7)*

___
<a id="isservicespecific"></a>

###  isServiceSpecific

**● isServiceSpecific**: *`boolean`*

*Defined in [model/TCData.ts:10](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L10)*

___
<a id="outofband"></a>

###  outOfBand

**● outOfBand**: *`object`*

*Defined in [model/TCData.ts:14](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L14)*

#### Type declaration

 allowedVendors: [BooleanVector](../interfaces/booleanvector.md)

 discloseVendors: [BooleanVector](../interfaces/booleanvector.md)

___
<a id="publisher"></a>

###  publisher

**● publisher**: *`object`*

*Defined in [model/TCData.ts:33](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L33)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md)

 customPurpose: `object`

 consents: [BooleanVector](../interfaces/booleanvector.md)

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md)

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md)

 restrictions: `object`

[purposeId: `string`]: `object`

[vendorId: `string`]: `0` \| `1` \| `2`

___
<a id="publishercc"></a>

###  publisherCC

**● publisherCC**: *`string`*

*Defined in [model/TCData.ts:12](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L12)*

___
<a id="purpose"></a>

###  purpose

**● purpose**: *`object`*

*Defined in [model/TCData.ts:20](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L20)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md)

 legitimateInterests: [BooleanVector](../interfaces/booleanvector.md)

___
<a id="purposeonetreatment"></a>

###  purposeOneTreatment

**● purposeOneTreatment**: *`boolean`*

*Defined in [model/TCData.ts:13](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L13)*

___
<a id="speicalfeatureoptins"></a>

###  speicalFeatureOptins

**● speicalFeatureOptins**: *[BooleanVector](../interfaces/booleanvector.md)*

*Defined in [model/TCData.ts:32](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L32)*

___
<a id="tcstring"></a>

###  tcString

**● tcString**: *`string`*

*Defined in [model/TCData.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L8)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Inherited from [Return](return.md).[tcfPolicyVersion](return.md#tcfpolicyversion)*

*Defined in [model/Return.ts:8](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/Return.ts#L8)*

___
<a id="usenonstandardstacks"></a>

###  useNonStandardStacks

**● useNonStandardStacks**: *`boolean`*

*Defined in [model/TCData.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L11)*

___
<a id="vendor"></a>

###  vendor

**● vendor**: *`object`*

*Defined in [model/TCData.ts:26](https://github.com/chrispaterson/iabtcf-es/blob/0b97360/modules/cmpapi/src/model/TCData.ts#L26)*

#### Type declaration

 consents: [BooleanVector](../interfaces/booleanvector.md)

 legitimateInterestslegInts: [BooleanVector](../interfaces/booleanvector.md)

___

