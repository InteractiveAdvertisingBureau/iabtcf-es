
#  @iabtcf/core - API Documentation

## Index

### Enumerations

* [RestrictionType](enums/restrictiontype.md)
* [VectorEncodingType](enums/vectorencodingtype.md)

### Classes

* [Base64Url](classes/base64url.md)
* [BinarySearchTree](classes/binarysearchtree.md)
* [BitLength](classes/bitlength.md)
* [BooleanEncoder](classes/booleanencoder.md)
* [CoreFieldSequence](classes/corefieldsequence.md)
* [CoreTCEncoder](classes/coretcencoder.md)
* [DateEncoder](classes/dateencoder.md)
* [DecodingError](classes/decodingerror.md)
* [EncoderMap](classes/encodermap.md)
* [EncodingError](classes/encodingerror.md)
* [Fields](classes/fields.md)
* [FixedVectorEncoder](classes/fixedvectorencoder.md)
* [GVL](classes/gvl.md)
* [GVLError](classes/gvlerror.md)
* [IntEncoder](classes/intencoder.md)
* [Json](classes/json.md)
* [LangEncoder](classes/langencoder.md)
* [PublisherFieldSequence](classes/publisherfieldsequence.md)
* [PublisherTCEncoder](classes/publishertcencoder.md)
* [PurposeRestriction](classes/purposerestriction.md)
* [PurposeRestrictionVector](classes/purposerestrictionvector.md)
* [PurposeRestrictionVectorEncoder](classes/purposerestrictionvectorencoder.md)
* [SegmentEncoderMap](classes/segmentencodermap.md)
* [SegmentType](classes/segmenttype.md)
* [TCModel](classes/tcmodel.md)
* [TCModelError](classes/tcmodelerror.md)
* [TCString](classes/tcstring.md)
* [Vector](classes/vector.md)
* [VendorVectorEncoder](classes/vendorvectorencoder.md)
* [VendorsAllowedEncoder](classes/vendorsallowedencoder.md)
* [VendorsDisclosedEncoder](classes/vendorsdisclosedencoder.md)

### Interfaces

* [ByFeatureVendorMap](interfaces/byfeaturevendormap.md)
* [ByPurposeVendorMap](interfaces/bypurposevendormap.md)
* [BySpecialFeatureVendorMap](interfaces/byspecialfeaturevendormap.md)
* [BySpecialPurposeVendorMap](interfaces/byspecialpurposevendormap.md)
* [Declarations](interfaces/declarations.md)
* [Encoder](interfaces/encoder.md)
* [Feature](interfaces/feature.md)
* [GVLMapItem](interfaces/gvlmapitem.md)
* [IDSetMap](interfaces/idsetmap.md)
* [IntMap](interfaces/intmap.md)
* [Purpose](interfaces/purpose.md)
* [Stack](interfaces/stack.md)
* [TCFields](interfaces/tcfields.md)
* [TreeNode](interfaces/treenode.md)
* [Vendor](interfaces/vendor.md)
* [VendorList](interfaces/vendorlist.md)
* [VersionMap](interfaces/versionmap.md)

### Type aliases

* [PurposeOrFeature](#purposeorfeature)
* [PurposeSubType](#purposesubtype)
* [TCModelPropType](#tcmodelproptype)
* [TreeNodeMaybe](#treenodemaybe)
* [VersionOrVendorList](#versionorvendorlist)
* [idOrIds](#idorids)

---

## Type aliases

<a id="purposeorfeature"></a>

###  PurposeOrFeature

**Ƭ PurposeOrFeature**: *"purpose" \| "feature"*

*Defined in [GVL.ts:22](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/GVL.ts#L22)*

___
<a id="purposesubtype"></a>

###  PurposeSubType

**Ƭ PurposeSubType**: *"consent" \| "legInt" \| "flexible"*

*Defined in [GVL.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/GVL.ts#L23)*

___
<a id="tcmodelproptype"></a>

###  TCModelPropType

**Ƭ TCModelPropType**: *`number` \| `Date` \| `string` \| `boolean` \| [Vector](classes/vector.md) \| [PurposeRestrictionVector](classes/purposerestrictionvector.md)*

*Defined in [TCModel.ts:20](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/TCModel.ts#L20)*

___
<a id="treenodemaybe"></a>

###  TreeNodeMaybe

**Ƭ TreeNodeMaybe**: *[TreeNode](interfaces/treenode.md) \| `null`*

*Defined in [model/BinarySearchTree.ts:1](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/model/BinarySearchTree.ts#L1)*

___
<a id="versionorvendorlist"></a>

###  VersionOrVendorList

**Ƭ VersionOrVendorList**: *`string` \| `number` \| [VendorList](interfaces/vendorlist.md)*

*Defined in [GVL.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/GVL.ts#L21)*

TODO: make map to cache language translations under language so if a language is loaded twice it won't go and get it more than once

___
<a id="idorids"></a>

###  idOrIds

**Ƭ idOrIds**: *`number` \| `number`[]*

*Defined in [model/Vector.ts:3](https://github.com/chrispaterson/iabtcf-es/blob/5dac6b3/modules/core/src/model/Vector.ts#L3)*

___

