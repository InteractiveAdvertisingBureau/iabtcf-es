package com.gdpr.phase2.encoder.sequence;
import com.gdpr.phase2.model.Fields;

import java.util.*;

/**
 * @Description - Functionality has only been implemented for Phase 2
 *
 */
public class CoreFieldSequence extends VersionMap{
    private CoreFieldSequence() {
    }
    private static final CoreFieldSequence instance = new CoreFieldSequence();
    public static CoreFieldSequence getInstance() {
        return instance;
    }

    public final List<String> one = new ArrayList<String>() {{
        add(Fields.version);
        add(Fields.created);
        add(Fields.lastUpdated);
        add(Fields.cmpId);
        add(Fields.cmpVersion);
        add(Fields.consentScreen);
        add(Fields.consentLanguage);
        add(Fields.vendorListVersion);
        add(Fields.purposeConsents);
        add(Fields.vendorConsents);
    }};
    public final List<String> two = new ArrayList<String>() {{
        add(Fields.version);
        add(Fields.created);
        add(Fields.lastUpdated);
        add(Fields.cmpId);
        add(Fields.cmpVersion);
        add(Fields.consentScreen);
        add(Fields.consentLanguage);
        add(Fields.vendorListVersion);
        add(Fields.policyVersion);
        add(Fields.isServiceSpecific);
        add(Fields.useNonStandardStacks);
        add(Fields.specialFeatureOptIns);
        add(Fields.purposeConsents);
        add(Fields.purposeLegitimateInterest);
        add(Fields.purposeOneTreatment);
        add(Fields.publisherCountryCode);
        add(Fields.vendorConsents);
        add(Fields.vendorLegitimateInterest);
        add(Fields.publisherRestrictions);
    }};

    public List<String> getOne() {
        return one;
    }

    public List<String> getTwo() {
        return two;
    }
}
