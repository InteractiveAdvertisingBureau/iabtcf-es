[@iabtcf/core - API Documentation](../README.md) > [RestrictionType](../enums/restrictiontype.md)

# Enumeration: RestrictionType

if a Vendor has declared flexible purposes (see: [Vendor](../interfaces/vendor.md) under `flexiblePurposeIds`) on the Global Vendor List ([Declarations](../interfaces/declarations.md)) a CMP may change their legal basis for processing in the encoding.

## Index

### Enumeration members

* [NOT_ALLOWED](restrictiontype.md#not_allowed)
* [REQUIRE_CONSENT](restrictiontype.md#require_consent)
* [REQUIRE_LI](restrictiontype.md#require_li)

---

## Enumeration members

<a id="not_allowed"></a>

###  NOT_ALLOWED

**NOT_ALLOWED**:  = 0

*Defined in [model/RestrictionType.ts:11](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/RestrictionType.ts#L11)*

under no circumstances is this purpose allowed.

___
<a id="require_consent"></a>

###  REQUIRE_CONSENT

**REQUIRE_CONSENT**:  = 1

*Defined in [model/RestrictionType.ts:16](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/RestrictionType.ts#L16)*

if the default declaration is legitimate interest then this flips the purpose to consent in the encoding.

___
<a id="require_li"></a>

###  REQUIRE_LI

**REQUIRE_LI**:  = 2

*Defined in [model/RestrictionType.ts:21](https://github.com/chrispaterson/iabtcf/blob/f683445/modules/core/src/model/RestrictionType.ts#L21)*

if the default declaration is consent then this flips the purpose to Legitimate Interest in the encoding.

___

