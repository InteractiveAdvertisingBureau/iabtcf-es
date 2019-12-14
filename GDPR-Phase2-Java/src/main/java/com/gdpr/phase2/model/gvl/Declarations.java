package com.gdpr.phase2.model.gvl;

import lombok.*;

import java.util.Date;
import java.util.Map;

@Getter @Setter
public class Declarations {
    Integer gvlSpecificationVersion = 0;
    Integer vendorListVersion = 0;
    Integer tcfPolicyVersion = 0;
    Date lastUpdate = null;
    Map<String,Purpose> purposes = null;
    Map<String,Purpose> specialPurposes = null;
    Map<String,Feature> features = null;
    Map<String,Feature> specialFeatures = null;
    Map<String,Stacks> stacks = null;
}
