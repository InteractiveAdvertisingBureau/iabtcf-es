[@iabtcf/cmpapi - API Documentation](../README.md) > [Response](../interfaces/response.md)

# Interface: Response

Base response model to be returned to TCF Api Command issuer

## Hierarchy

**Response**

↳  [TCData](tcdata.md)

↳  [GlobalVendorList](globalvendorlist.md)

↳  [InAppTCData](inapptcdata.md)

↳  [Ping](ping.md)

## Implemented by

* [GlobalVendorListBldr](../classes/globalvendorlistbldr.md)
* [InAppTCDataBldr](../classes/inapptcdatabldr.md)
* [PingBldr](../classes/pingbldr.md)
* [ResponseBuilder](../classes/responsebuilder.md)
* [TCDataBldr](../classes/tcdatabldr.md)

## Index

### Properties

* [cmpId](response.md#cmpid)
* [cmpVersion](response.md#cmpversion)
* [gdprApplies](response.md#gdprapplies)
* [tcfPolicyVersion](response.md#tcfpolicyversion)

---

## Properties

<a id="cmpid"></a>

###  cmpId

**● cmpId**: *`number`*

*Defined in [model/responses/Response.ts:7](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L7)*

___
<a id="cmpversion"></a>

###  cmpVersion

**● cmpVersion**: *`number`*

*Defined in [model/responses/Response.ts:8](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L8)*

___
<a id="gdprapplies"></a>

###  gdprApplies

**● gdprApplies**: *`boolean` \| [BoolInt](../#boolint)*

*Defined in [model/responses/Response.ts:9](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L9)*

___
<a id="tcfpolicyversion"></a>

###  tcfPolicyVersion

**● tcfPolicyVersion**: *`number`*

*Defined in [model/responses/Response.ts:10](https://github.com/chrispaterson/iabtcf/blob/aa3fc72/modules/cmpapi/src/model/responses/Response.ts#L10)*

___

