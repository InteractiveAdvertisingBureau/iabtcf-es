package com.gdpr.phase2.model;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;


public class PurposeRestriction {
    public static String hashSeparator = "-";
    private int purposeId = 0;
    public RestrictionType restrictionType;

    public PurposeRestriction(int purposeId, RestrictionType restrictionType) {
        this.purposeId = purposeId;
        this.restrictionType = restrictionType;
    }

    public PurposeRestriction() {
    }

    public static PurposeRestriction unHash(String hash) {
        List<String> splitUp = Arrays.asList(hash.split(hashSeparator));
        PurposeRestriction purpRestriction = new PurposeRestriction();
        if(splitUp.size()!=2) {
            // throw error
        }
        purpRestriction.purposeId = Integer.parseInt(splitUp.get(0));
        purpRestriction.restrictionType.setType(Integer.parseInt(splitUp.get(1)));
        return purpRestriction;

    }

    public String getHash() {
        if(!isValid()) {
            // throw error
        }
        return purposeId + PurposeRestriction.hashSeparator + restrictionType.getType();
    }

    private boolean isValid() {
        return purposeId!=0 && restrictionType!= null;
    }

    public int getPurposeId() {
        return purposeId;
    }

    public void setPurposeId(int purposeId) {
        this.purposeId = purposeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PurposeRestriction)) return false;
        PurposeRestriction that = (PurposeRestriction) o;
        return purposeId == that.purposeId &&
                restrictionType == that.restrictionType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(purposeId, restrictionType);
    }
}
