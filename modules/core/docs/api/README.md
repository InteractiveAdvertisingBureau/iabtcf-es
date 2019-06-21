
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
* [Feature](interfaces/feature.md)
* [GVLMap](interfaces/gvlmap.md)
* [GVLMapItem](interfaces/gvlmapitem.md)
* [GVLSchema](interfaces/gvlschema.md)
* [Purpose](interfaces/purpose.md)
* [SpecificEncoder](interfaces/specificencoder.md)
* [Stack](interfaces/stack.md)
* [Vendor](interfaces/vendor.md)

### Type aliases

* [PORFSubType](#porfsubtype)
* [PurposeOrFeature](#purposeorfeature)
* [TCModelPropType](#tcmodelproptype)
* [VersionOrObject](#versionorobject)
* [idOrIds](#idorids)

---

## Type aliases

<a id="porfsubtype"></a>

###  PORFSubType

**Ƭ PORFSubType**: *"consent" \| "legInt" \| "flexible" \| "features" \| "specialFeatures"*

*Defined in [GVL.ts:18](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L18)*

___
<a id="purposeorfeature"></a>

###  PurposeOrFeature

**Ƭ PurposeOrFeature**: *"purpose" \| "feature"*

*Defined in [GVL.ts:17](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L17)*

___
<a id="tcmodelproptype"></a>

###  TCModelPropType

**Ƭ TCModelPropType**: *`number` \| `Date` \| `string` \| `boolean` \| [Vector](classes/vector.md)*

*Defined in [tcstring/encoders/SpecificEncoder.ts:3](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/tcstring/encoders/SpecificEncoder.ts#L3)*

___
<a id="versionorobject"></a>

###  VersionOrObject

**Ƭ VersionOrObject**: *`string` \| `number` \| `object`*

*Defined in [GVL.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/GVL.ts#L16)*

___
<a id="idorids"></a>

###  idOrIds

**Ƭ idOrIds**: *`number` \| `number`[]*

*Defined in [model/Vector.ts:3](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/model/Vector.ts#L3)*

___

