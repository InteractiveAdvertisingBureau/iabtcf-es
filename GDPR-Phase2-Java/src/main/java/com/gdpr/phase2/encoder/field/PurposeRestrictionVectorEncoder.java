package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.model.PurposeRestriction;
import com.gdpr.phase2.model.PurposeRestrictionVector;
import com.gdpr.phase2.model.RestrictionType;
import com.gdpr.phase2.encoder.BaseEncoder;
import com.gdpr.phase2.encoder.BitLength;

import java.util.Optional;

public class PurposeRestrictionVectorEncoder implements BaseEncoder<PurposeRestrictionVector> {
    private PurposeRestrictionVectorEncoder() {
    }

    private static volatile PurposeRestrictionVectorEncoder instance = new PurposeRestrictionVectorEncoder();
    public static PurposeRestrictionVectorEncoder getInstance() {
        return instance;
    }
    private IntEncoder intEncoder = IntEncoder.getInstance();
    private BooleanEncoder booleanEncoder = BooleanEncoder.getInstance();

    @Override
    public PurposeRestrictionVector decode(String value) {
        int index = 0;
        PurposeRestrictionVector vector = new PurposeRestrictionVector();
        int numRestrictions = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("numRestrictions")).orElse(0)));
        for(int i=0; i< numRestrictions; i++) {
            // First is purpose ID
            int purposeId = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("purposeId")).orElse(0)));

            // Second Restriction Type
            int restrictionType = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("restrictionType")).orElse(0)));
            PurposeRestriction purposeRestriction = null;
            switch(restrictionType) {
                case 0:
                    purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);
                    break;
                case 1:
                    purposeRestriction = new PurposeRestriction(purposeId,RestrictionType.REQUIRE_CONSENT);
                    break;
                case 2:
                    purposeRestriction = new PurposeRestriction(purposeId,RestrictionType.REQUIRE_LI);
                    break;
            }

            // Num Entries (number of vendors)
            int numEntries = intEncoder.decode(value.substring(index,index+= Optional.ofNullable(BitLength.fieldLengths.get("numEntries")).orElse(0)));
            for(int j=0; j < numEntries; j++) {
                Boolean isARange = booleanEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("anyBoolean")).orElse(0)));
                int startOrOnlyVendorId = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("vendorId")).orElse(0)));
                if(isARange) {
                    int endVendorId = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("vendorId")).orElse(0)));

                    for(int k = startOrOnlyVendorId; k <=endVendorId; k++){
                        vector.add(k,purposeRestriction);
                    }
                } else {
                    vector.add(startOrOnlyVendorId,purposeRestriction);
                }
            }
        }
        vector.bitLength = index;
        return vector;
    }
}
