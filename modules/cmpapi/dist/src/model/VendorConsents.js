export default {
    create({ consentString, gdprApplies, hasGlobalScope, vendors, subset }) {
        const getPurposeConsents = function () {
            const retr = {};
            for (let i = 1; i < 6; i++) {
                retr[i] = consentString.isPurposeAllowed(i);
            }
            return retr;
        };
        const getVendorConsents = function () {
            const retr = {};
            if (!subset || subset.length === 0) {
                for (let i = 1; i < vendors.length; i++) {
                    const vendorId = vendors[i].id;
                    retr[vendorId] = consentString.isVendorAllowed(vendorId);
                }
            }
            else {
                const len = subset.length;
                for (let i = 0; i < len; i++) {
                    retr[subset[i]] = consentString.isVendorAllowed(subset[i]);
                }
            }
            return retr;
        };
        const applies = (gdprApplies || hasGlobalScope);
        return {
            metadata: (applies) ? consentString.getMetadataString() : '',
            gdprApplies: gdprApplies,
            hasGlobalScope: hasGlobalScope,
            purposeConsents: (applies) ? getPurposeConsents() : {},
            vendorConsents: (applies) ? getVendorConsents() : {},
        };
    },
};
