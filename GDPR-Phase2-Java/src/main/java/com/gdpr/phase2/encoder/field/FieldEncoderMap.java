package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.encoder.sequence.CoreFieldSequence;
import com.gdpr.phase2.model.Fields;
import com.gdpr.phase2.encoder.BaseEncoder;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

// GDPR V2 Field Map
@Getter @Setter
public class FieldEncoderMap {

    private FieldEncoderMap() {
    }

    private static final FieldEncoderMap instance = new FieldEncoderMap();
    public static FieldEncoderMap getInstance() {
        return instance;
    }
    private CoreFieldSequence coreFieldSequence = CoreFieldSequence.getInstance();
    public final IntEncoder version  = IntEncoder.getInstance();
    public final DateEncoder created  = DateEncoder.getInstance();
    public final DateEncoder lastUpdated  = DateEncoder.getInstance();
    public final IntEncoder cmpId  = IntEncoder.getInstance();
    public final IntEncoder cmpVersion  = IntEncoder.getInstance();
    public final IntEncoder consentScreen  = IntEncoder.getInstance();
    public final LangEncoder consentLanguage  = LangEncoder.getInstance();
    public final IntEncoder vendorListVersion  = IntEncoder.getInstance();
    public final IntEncoder policyVersion  = IntEncoder.getInstance();
    public final BooleanEncoder isServiceSpecific  = BooleanEncoder.getInstance();
    public final BooleanEncoder useNonStandardStacks  = BooleanEncoder.getInstance();
    public final FixedVectorEncoder specialFeatureOptIns  = FixedVectorEncoder.getInstance();
    public final FixedVectorEncoder purposeConsents  = FixedVectorEncoder.getInstance();
    public final FixedVectorEncoder purposeLegitimateInterest  = FixedVectorEncoder.getInstance();
    public final BooleanEncoder purposeOneTreatment  = BooleanEncoder.getInstance();
    public final LangEncoder publisherCountryCode  = LangEncoder.getInstance();
    public final VendorVectorEncoder vendorConsents  = VendorVectorEncoder.getInstance();
    public final VendorVectorEncoder vendorLegitimateInterest  = VendorVectorEncoder.getInstance();
    public final PurposeRestrictionVectorEncoder publisherRestrictions = PurposeRestrictionVectorEncoder.getInstance();
    public final IntEncoder segmentType  = IntEncoder.getInstance();
    public final VendorVectorEncoder vendorsDisclosed  = VendorVectorEncoder.getInstance();
    public final VendorVectorEncoder vendorsAllowed  = VendorVectorEncoder.getInstance();
    public final FixedVectorEncoder publisherConsents  = FixedVectorEncoder.getInstance();
    public final FixedVectorEncoder publisherLegitimateInterest  = FixedVectorEncoder.getInstance();
    public final IntEncoder numCustomPurposes  = IntEncoder.getInstance();
    public final FixedVectorEncoder publisherCustomConsents  = FixedVectorEncoder.getInstance();
    public final FixedVectorEncoder publisherCustomLegitimateInterest  = FixedVectorEncoder.getInstance();

    public final Map<String, BaseEncoder> fieldMap = new HashMap<String, BaseEncoder>(){
        {
            put(Fields.version, version);
            put(Fields.created, created);
            put(Fields.lastUpdated, lastUpdated);
            put(Fields.cmpId, cmpId);
            put(Fields.cmpVersion, cmpVersion);
            put(Fields.consentScreen, consentScreen);
            put(Fields.consentLanguage, consentLanguage);
            put(Fields.vendorListVersion, vendorListVersion);
            put(Fields.policyVersion, policyVersion);
            put(Fields.isServiceSpecific, isServiceSpecific);
            put(Fields.useNonStandardStacks, useNonStandardStacks);
            put(Fields.specialFeatureOptIns, specialFeatureOptIns);
            put(Fields.purposeConsents, purposeConsents);
            put(Fields.purposeLegitimateInterest, purposeLegitimateInterest);
            put(Fields.purposeOneTreatment, purposeOneTreatment);
            put(Fields.publisherCountryCode, publisherCountryCode);
            put(Fields.vendorConsents, vendorConsents);
            put(Fields.vendorLegitimateInterest, vendorLegitimateInterest);
            put(Fields.publisherRestrictions, publisherRestrictions);
            put(Fields.segmentType, segmentType);
            put(Fields.vendorsDisclosed, vendorsDisclosed);
            put(Fields.vendorsAllowed, vendorsAllowed);
            put(Fields.publisherConsents, publisherConsents);
            put(Fields.publisherLegitimateInterest, publisherLegitimateInterest);
            put(Fields.numCustomPurposes, numCustomPurposes);
            put(Fields.publisherCustomConsents, publisherCustomConsents);
            put(Fields.publisherCustomLegitimateInterest, publisherCustomLegitimateInterest);

        }
    };
}
