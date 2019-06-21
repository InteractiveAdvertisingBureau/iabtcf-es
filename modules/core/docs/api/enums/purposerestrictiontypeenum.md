[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionTypeEnum](../enums/purposerestrictiontypeenum.md)

# Enumeration: PurposeRestrictionTypeEnum

if a Vendor has declared flexible purposes (see: [Vendor](../interfaces/vendor.md) under `flexiblePurposeIds`) on the Global Vendor List ([GVLSchema](../interfaces/gvlschema.md)) a CMP may change their legal basis for processing in the encoding.

## Index

### Enumeration members

* [NOT_ALLOWED](purposerestrictiontypeenum.md#not_allowed)
* [REQUIRE_CONSENT](purposerestrictiontypeenum.md#require_consent)
* [REQUIRE_LI](purposerestrictiontypeenum.md#require_li)

---

## Enumeration members

<a id="not_allowed"></a>

###  NOT_ALLOWED

**NOT_ALLOWED**:  = 0

*Defined in [model/enum/PurposeRestrictionTypeEnum.ts:11](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/model/enum/PurposeRestrictionTypeEnum.ts#L11)*

under no circumstances is this purpose allowed.

___
<a id="require_consent"></a>

###  REQUIRE_CONSENT

**REQUIRE_CONSENT**:  = 1

*Defined in [model/enum/PurposeRestrictionTypeEnum.ts:16](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/model/enum/PurposeRestrictionTypeEnum.ts#L16)*

if the default declaration is legitimate interest then this flips the purpose to consent in the encoding.

___
<a id="require_li"></a>

###  REQUIRE_LI

**REQUIRE_LI**:  = 2

*Defined in [model/enum/PurposeRestrictionTypeEnum.ts:21](https://github.com/chrispaterson/iabtcf-es/blob/b06c04d/modules/core/src/model/enum/PurposeRestrictionTypeEnum.ts#L21)*

if the default declaration is consent then this flips the purpose to Legitimate Interest in the encoding.

___

