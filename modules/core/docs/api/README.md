
#  @iabtcf/core - API Documentation

## Index

### Enumerations

* [RestrictionType](enums/restrictiontype.md)
* [VectorEncodingType](enums/vectorencodingtype.md)

### Classes

* [Base64Url](classes/base64url.md)
* [BinarySearchTree](classes/binarysearchtree.md)
* [BitLength](classes/bitlength.md)
* [BooleanDecoder](classes/booleandecoder.md)
* [BooleanEncoder](classes/booleanencoder.md)
* [Checksum](classes/checksum.md)
* [DateDecoder](classes/datedecoder.md)
* [DateEncoder](classes/dateencoder.md)
* [DecodingError](classes/decodingerror.md)
* [EncodingError](classes/encodingerror.md)
* [Encodings](classes/encodings.md)
* [FixedVectorDecoder](classes/fixedvectordecoder.md)
* [FixedVectorEncoder](classes/fixedvectorencoder.md)
* [GVL](classes/gvl.md)
* [GVLError](classes/gvlerror.md)
* [IntDecoder](classes/intdecoder.md)
* [IntEncoder](classes/intencoder.md)
* [Json](classes/json.md)
* [LangDecoder](classes/langdecoder.md)
* [LangEncoder](classes/langencoder.md)
* [PurposeRestriction](classes/purposerestriction.md)
* [PurposeRestrictionVector](classes/purposerestrictionvector.md)
* [PurposeRestrictionsDecoder](classes/purposerestrictionsdecoder.md)
* [PurposeRestrictionsEncoder](classes/purposerestrictionsencoder.md)
* [TCModel](classes/tcmodel.md)
* [TCModelError](classes/tcmodelerror.md)
* [TCString](classes/tcstring.md)
* [Vector](classes/vector.md)
* [VendorVectorDecoder](classes/vendorvectordecoder.md)
* [VendorVectorEncoder](classes/vendorvectorencoder.md)

### Interfaces

* [ByFeatureVendorMap](interfaces/byfeaturevendormap.md)
* [ByPurposeVendorMap](interfaces/bypurposevendormap.md)
* [BySpecialFeatureVendorMap](interfaces/byspecialfeaturevendormap.md)
* [BySpecialPurposeVendorMap](interfaces/byspecialpurposevendormap.md)
* [Feature](interfaces/feature.md)
* [GVLBase](interfaces/gvlbase.md)
* [GVLMap](interfaces/gvlmap.md)
* [GVLMapItem](interfaces/gvlmapitem.md)
* [IDSetMap](interfaces/idsetmap.md)
* [Purpose](interfaces/purpose.md)
* [SpecificDecoder](interfaces/specificdecoder.md)
* [SpecificEncoder](interfaces/specificencoder.md)
* [Stack](interfaces/stack.md)
* [TreeNode](interfaces/treenode.md)
* [VariableLengthSpecificDecoder](interfaces/variablelengthspecificdecoder.md)
* [Vendor](interfaces/vendor.md)
* [VendorList](interfaces/vendorlist.md)

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

*Defined in [GVL.ts:22](https://github.com/chrispaterson/iabtcf-es/blob/9e4a93b/modules/core/src/GVL.ts#L22)*

___
<a id="purposesubtype"></a>

###  PurposeSubType

**Ƭ PurposeSubType**: *"consent" \| "legInt" \| "flexible"*

*Defined in [GVL.ts:23](https://github.com/chrispaterson/iabtcf-es/blob/9e4a93b/modules/core/src/GVL.ts#L23)*

___
<a id="tcmodelproptype"></a>

###  TCModelPropType

**Ƭ TCModelPropType**: *`number` \| `Date` \| `string` \| `boolean` \| [Vector](classes/vector.md) \| [PurposeRestrictionVector](classes/purposerestrictionvector.md)*

*Defined in [TCModel.ts:7](https://github.com/chrispaterson/iabtcf-es/blob/9e4a93b/modules/core/src/TCModel.ts#L7)*

___
<a id="treenodemaybe"></a>

###  TreeNodeMaybe

**Ƭ TreeNodeMaybe**: *[TreeNode](interfaces/treenode.md) \| `null`*

*Defined in model/structures/BinarySearchTree.ts:1*

___
<a id="versionorvendorlist"></a>

###  VersionOrVendorList

**Ƭ VersionOrVendorList**: *`string` \| `number` \| [VendorList](interfaces/vendorlist.md)*

*Defined in [GVL.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/9e4a93b/modules/core/src/GVL.ts#L21)*

TODO: make map to cache language translations under language so if a language is loaded twice it won't go and get it more than once

___
<a id="idorids"></a>

###  idOrIds

**Ƭ idOrIds**: *`number` \| `number`[]*

*Defined in model/structures/Vector.ts:3*

___

