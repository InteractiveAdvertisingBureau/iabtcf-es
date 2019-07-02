[@iabtcf/core - Usage Documentation](README.md) > [TCModel](tcstring.md)

# TCModel

This class is intended to be used as a stateful model to model the TCF Data.

[TCModel API Documentation]('../api/classes/tcmodel.md')

```javascript
import {TCModel, GVL} from '@iabtcf/core';

const tcModel = new TCModel();

// to encode you must have a cmpId and cmpVersion
tcModel.cmpId = //{myCMPID}
tcModel.cmpVersion = //{myCMPVersion}

// to encode you will need to use a version of the GVL (global vendor list)
GVL.baseUrl = 'http://mycompany.com/cmp/gvl';

tcModel.gvl = new GVL();

/**
 * we now have a TCString assigned with a GVL which will set vendorListVersion,
 * tcfPolicyVersion and consentLanguage
 */

// give all vendors consent
tcModel.setAllVendorConsents();

// don't give vendor 7 consent
tcModel.vendorConsents.unset(7);

// don't give vendor 3, 5, 9 consent
tcModel.vendorConsents.unset([3,5,9]);

```
`GVL`

[GVL API Dcoumentation](../api/classes/gvl.md)

[GVL Usage Dcoumentation](gvl.md)
