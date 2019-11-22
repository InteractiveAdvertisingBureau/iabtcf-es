
#  @iabtcf/core - API Documentation

## Index

### Enumerations

* [OOBVendorsType](enums/_iabtcf_core___api_documentation.oobvendorstype.md)
* [RestrictionType](enums/_iabtcf_core___api_documentation.restrictiontype.md)
* [VectorEncodingType](enums/_iabtcf_core___api_documentation.vectorencodingtype.md)

### Classes

* [Base64Url](classes/_iabtcf_core___api_documentation.base64url.md)
* [BinarySearchTree](classes/_iabtcf_core___api_documentation.binarysearchtree.md)
* [BitLength](classes/_iabtcf_core___api_documentation.bitlength.md)
* [BooleanEncoder](classes/_iabtcf_core___api_documentation.booleanencoder.md)
* [Cloneable](classes/_iabtcf_core___api_documentation.cloneable.md)
* [ConsentLanguages](classes/_iabtcf_core___api_documentation.consentlanguages.md)
* [CoreFieldSequence](classes/_iabtcf_core___api_documentation.corefieldsequence.md)
* [CoreTCEncoder](classes/_iabtcf_core___api_documentation.coretcencoder.md)
* [DateEncoder](classes/_iabtcf_core___api_documentation.dateencoder.md)
* [DecodingError](classes/_iabtcf_core___api_documentation.decodingerror.md)
* [EncodingError](classes/_iabtcf_core___api_documentation.encodingerror.md)
* [FieldEncoderMap](classes/_iabtcf_core___api_documentation.fieldencodermap.md)
* [Fields](classes/_iabtcf_core___api_documentation.fields.md)
* [FixedVectorEncoder](classes/_iabtcf_core___api_documentation.fixedvectorencoder.md)
* [GVL](classes/_iabtcf_core___api_documentation.gvl.md)
* [GVLError](classes/_iabtcf_core___api_documentation.gvlerror.md)
* [IntEncoder](classes/_iabtcf_core___api_documentation.intencoder.md)
* [Json](classes/_iabtcf_core___api_documentation.json.md)
* [LangEncoder](classes/_iabtcf_core___api_documentation.langencoder.md)
* [OOBVendorsEncoder](classes/_iabtcf_core___api_documentation.oobvendorsencoder.md)
* [PublisherFieldSequence](classes/_iabtcf_core___api_documentation.publisherfieldsequence.md)
* [PublisherTCEncoder](classes/_iabtcf_core___api_documentation.publishertcencoder.md)
* [PurposeRestriction](classes/_iabtcf_core___api_documentation.purposerestriction.md)
* [PurposeRestrictionVector](classes/_iabtcf_core___api_documentation.purposerestrictionvector.md)
* [PurposeRestrictionVectorEncoder](classes/_iabtcf_core___api_documentation.purposerestrictionvectorencoder.md)
* [SegmentEncoderMap](classes/_iabtcf_core___api_documentation.segmentencodermap.md)
* [SegmentSequence](classes/_iabtcf_core___api_documentation.segmentsequence.md)
* [SegmentType](classes/_iabtcf_core___api_documentation.segmenttype.md)
* [Segments](classes/_iabtcf_core___api_documentation.segments.md)
* [TCModel](classes/_iabtcf_core___api_documentation.tcmodel.md)
* [TCModelError](classes/_iabtcf_core___api_documentation.tcmodelerror.md)
* [TCString](classes/_iabtcf_core___api_documentation.tcstring.md)
* [Vector](classes/_iabtcf_core___api_documentation.vector.md)
* [VendorVectorEncoder](classes/_iabtcf_core___api_documentation.vendorvectorencoder.md)

### Interfaces

* [AnyConstructor](interfaces/_iabtcf_core___api_documentation.anyconstructor.md)
* [ByFeatureVendorMap](interfaces/_iabtcf_core___api_documentation.byfeaturevendormap.md)
* [ByPurposeVendorMap](interfaces/_iabtcf_core___api_documentation.bypurposevendormap.md)
* [BySpecialFeatureVendorMap](interfaces/_iabtcf_core___api_documentation.byspecialfeaturevendormap.md)
* [BySpecialPurposeVendorMap](interfaces/_iabtcf_core___api_documentation.byspecialpurposevendormap.md)
* [Declarations](interfaces/_iabtcf_core___api_documentation.declarations.md)
* [Feature](interfaces/_iabtcf_core___api_documentation.feature.md)
* [GVLMapItem](interfaces/_iabtcf_core___api_documentation.gvlmapitem.md)
* [IDSetMap](interfaces/_iabtcf_core___api_documentation.idsetmap.md)
* [IntMap](interfaces/_iabtcf_core___api_documentation.intmap.md)
* [Purpose](interfaces/_iabtcf_core___api_documentation.purpose.md)
* [Stack](interfaces/_iabtcf_core___api_documentation.stack.md)
* [TCFields](interfaces/_iabtcf_core___api_documentation.tcfields.md)
* [TreeNode](interfaces/_iabtcf_core___api_documentation.treenode.md)
* [Vendor](interfaces/_iabtcf_core___api_documentation.vendor.md)
* [VendorList](interfaces/_iabtcf_core___api_documentation.vendorlist.md)
* [VersionMap](interfaces/_iabtcf_core___api_documentation.versionmap.md)

### Type aliases

* [AnyArray](#anyarray)
* [PurposeOrFeature](#purposeorfeature)
* [PurposeSubType](#purposesubtype)
* [TCModelPropType](#tcmodelproptype)
* [TreeNodeMaybe](#treenodemaybe)
* [VersionOrVendorList](#versionorvendorlist)
* [idOrIds](#idorids)

---

## Type aliases

<a id="anyarray"></a>

###  AnyArray

**Ƭ AnyArray**: *`any`[]*

*Defined in [src/cloneable/AnyArray.ts:2](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/cloneable/AnyArray.ts#L2)*

___
<a id="purposeorfeature"></a>

###  PurposeOrFeature

**Ƭ PurposeOrFeature**: *"purpose" \| "feature"*

*Defined in [src/GVL.ts:13](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L13)*

___
<a id="purposesubtype"></a>

###  PurposeSubType

**Ƭ PurposeSubType**: *"consent" \| "legInt" \| "flexible"*

*Defined in [src/GVL.ts:14](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L14)*

___
<a id="tcmodelproptype"></a>

###  TCModelPropType

**Ƭ TCModelPropType**: *`number` \| `Date` \| `string` \| `boolean` \| [Vector](classes/_iabtcf_core___api_documentation.vector.md) \| [PurposeRestrictionVector](classes/_iabtcf_core___api_documentation.purposerestrictionvector.md)*

*Defined in [src/TCModel.ts:8](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/TCModel.ts#L8)*

___
<a id="treenodemaybe"></a>

###  TreeNodeMaybe

**Ƭ TreeNodeMaybe**: *[TreeNode](interfaces/_iabtcf_core___api_documentation.treenode.md) \| `null`*

*Defined in [src/model/BinarySearchTree.ts:1](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/BinarySearchTree.ts#L1)*

___
<a id="versionorvendorlist"></a>

###  VersionOrVendorList

**Ƭ VersionOrVendorList**: *`string` \| `number` \| [VendorList](interfaces/_iabtcf_core___api_documentation.vendorlist.md)*

*Defined in [src/GVL.ts:12](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/GVL.ts#L12)*

TODO: make map to cache language translations under language so if a language is loaded twice it won't go and get it more than once

___
<a id="idorids"></a>

###  idOrIds

**Ƭ idOrIds**: *`number` \| `number`[]*

*Defined in [src/model/Vector.ts:4](https://github.com/chrispaterson/iabtcf/blob/883c677/modules/core/src/model/Vector.ts#L4)*

___

