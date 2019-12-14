package com.gdpr.phase2.model.gvl;


import lombok.*;

import java.util.*;

@Getter @Setter
class Overflow {
    private float httpGetLimit;
}
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Vendor extends GVLMapItem {
    List<Integer> purposes;
    List<Integer> legIntPurposes;
    List<Integer> flexiblePurposes;
    List<Integer> specialPurposes;
    List<Integer> features;
    List<Integer> SpecialFeatures;
    String policyUrl;
    Date deletedDate;
    Overflow overflow;



}
