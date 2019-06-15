[@iabtcf/core - API Documentation](../README.md) > [PurposeRestrictionTypes](../enums/purposerestrictiontypes.md)

# Enumeration: PurposeRestrictionTypes

if a Vendor has declared flexible purposes (see: [Vendor](../interfaces/vendor.md) under `flexiblePurposeIds`) on the Global Vendor List ([GVLSchema](../interfaces/gvlschema.md)) a CMP may change their legal basis for processing in the encoding.

## Index

### Enumeration members

* [NOT_ALLOWED](purposerestrictiontypes.md#not_allowed)
* [REQUIRE_CONSENT](purposerestrictiontypes.md#require_consent)
* [REQUIRE_LI](purposerestrictiontypes.md#require_li)

---

## Enumeration members

<a id="not_allowed"></a>

###  NOT_ALLOWED

**NOT_ALLOWED**:  = 0

*Defined in model/enum/PurposeRestrictionTypes.ts:11*

under no circumstances is this purpose allowed.

___
<a id="require_consent"></a>

###  REQUIRE_CONSENT

**REQUIRE_CONSENT**:  = 1

*Defined in model/enum/PurposeRestrictionTypes.ts:16*

if the default declaration is legitimate interest then this flips the purpose to consent in the encoding.

___
<a id="require_li"></a>

###  REQUIRE_LI

**REQUIRE_LI**:  = 2

*Defined in model/enum/PurposeRestrictionTypes.ts:21*

if the default declaration is consent then this flips the purpose to Legitimate Interest in the encoding.

___

