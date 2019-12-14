package com.gdpr.phase2.model.gvl;

import lombok.*;

@Getter @Setter
public class Purpose extends GVLMapItem {
    String description;
    String descriptionLegal;

    Boolean consentable = true;
    Boolean rightToObject = true;

}
