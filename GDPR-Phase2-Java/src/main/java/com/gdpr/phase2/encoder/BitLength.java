package com.gdpr.phase2.encoder;


import java.util.HashMap;
import java.util.Map;

public class BitLength {

    public static Map<String,Integer> fieldLengths = new HashMap<String, Integer>(){{
        put("version",6);
        put("anyBoolean",1);
        put("singleOrRange",1);
        put("encodingType",1);
        put("checksum",18);
        put("created",36);
        put("lastUpdated",36);
        put("cmpId",12);
        put("cmpVersion",12);
        put("consentScreen",6);
        put("consentLanguage",12);
        put("vendorListVersion",12);
        put("policyVersion",6);
        put("isServiceSpecific",1);
        put("useNonStandardStacks",1);
        put("purposeOneTreatment",1);
        put("publisherCountryCode",12);
        put("specialFeatureOptIns",12);
        put("purposeConsents",24);
        put("purposeLegitimateInterest",24);
        put("vendorId",16);
        put("purposeId",6);
        put("numEntries",12);
        put("maxId",16);
        put("restrictionType",2);
        put("numRestrictions",12);
        put("segmentType",3);
        put("publisherPurposeConsents",24);
        put("publisherLegitimateInterest",24);
        put("numCustomPurposes",6);
    }};
}
