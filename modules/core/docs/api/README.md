
#  @iabtcf/core - API Documentation

## Index

### Enumerations

* [PurposeRestrictionTypeEnum](enums/purposerestrictiontypeenum.md)
* [VectorEncodingTypeEnum](enums/vectorencodingtypeenum.md)

### Classes

* [BitLength](classes/bitlength.md)
* [BooleanEncoder](classes/booleanencoder.md)
* [DateEncoder](classes/dateencoder.md)
* [Decoder](classes/decoder.md)
* [DecodingError](classes/decodingerror.md)
* [Encoder](classes/encoder.md)
* [EncodingError](classes/encodingerror.md)
* [Encodings](classes/encodings.md)
* [FixedVectorEncoder](classes/fixedvectorencoder.md)
* [GVL](classes/gvl.md)
* [GVLError](classes/gvlerror.md)
* [IntEncoder](classes/intencoder.md)
* [Json](classes/json.md)
* [LangEncoder](classes/langencoder.md)
* [PurposeRestriction](classes/purposerestriction.md)
* [TCModel](classes/tcmodel.md)
* [TCModelError](classes/tcmodelerror.md)
* [TCString](classes/tcstring.md)
* [Vector](classes/vector.md)
* [VendorVectorEncoder](classes/vendorvectorencoder.md)
* [WebSafeBase64](classes/websafebase64.md)

### Interfaces

* [ByFeatureVendorMap](interfaces/byfeaturevendormap.md)
* [ByPurposeVendorMap](interfaces/bypurposevendormap.md)
* [BySpecialFeatureVendorMap](interfaces/byspecialfeaturevendormap.md)
* [BySpecialPurposeVendorMap](interfaces/byspecialpurposevendormap.md)
* [Feature](interfaces/feature.md)
* [GVLBase](interfaces/gvlbase.md)
* [GVLMap](interfaces/gvlmap.md)
* [GVLMapItem](interfaces/gvlmapitem.md)
* [Purpose](interfaces/purpose.md)
* [SpecificEncoder](interfaces/specificencoder.md)
* [Stack](interfaces/stack.md)
* [Vendor](interfaces/vendor.md)
* [VendorList](interfaces/vendorlist.md)

### Type aliases

* [PurposeOrFeature](#purposeorfeature)
* [PurposeSubType](#purposesubtype)
* [TCModelPropType](#tcmodelproptype)
* [VersionOrVendorList](#versionorvendorlist)
* [idOrIds](#idorids)

---

## Type aliases

<a id="purposeorfeature"></a>

###  PurposeOrFeature

**Ƭ PurposeOrFeature**: *"purpose" \| "feature"*

*Defined in [GVL.ts:30](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L30)*

___
<a id="purposesubtype"></a>

###  PurposeSubType

**Ƭ PurposeSubType**: *"consent" \| "legInt" \| "flexible"*

*Defined in [GVL.ts:31](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L31)*

___
<a id="tcmodelproptype"></a>

###  TCModelPropType

**Ƭ TCModelPropType**: *`number` \| `Date` \| `string` \| `boolean` \| [Vector](classes/vector.md)*

*Defined in [tcstring/encoders/SpecificEncoder.ts:3](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/tcstring/encoders/SpecificEncoder.ts#L3)*

___
<a id="versionorvendorlist"></a>

###  VersionOrVendorList

**Ƭ VersionOrVendorList**: *`string` \| `number` \| [VendorList](interfaces/vendorlist.md)*

*Defined in [GVL.ts:29](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/GVL.ts#L29)*

___
<a id="idorids"></a>

###  idOrIds

**Ƭ idOrIds**: *`number` \| `number`[]*

*Defined in [model/Vector.ts:3](https://github.com/chrispaterson/iabtcf-es/blob/c3b1466/modules/core/src/model/Vector.ts#L3)*

___

