package com.gdpr.phase2.encoder.sequence;

import com.gdpr.phase2.model.Fields;

import java.util.ArrayList;
import java.util.List;

public class PublisherFieldSequence extends VersionMap {
    private PublisherFieldSequence() {
    }
    private static final PublisherFieldSequence instance = new PublisherFieldSequence();
    public static PublisherFieldSequence getInstance() {
        return instance;
    }

    public final List<String> one = new ArrayList<>();
    public final List<String> two = new ArrayList<String>(){{
        add(Fields.publisherConsents);
        add(Fields.publisherLegitimateInterest);
        add(Fields.numCustomPurposes);
        add(Fields.publisherCustomConsents);
        add(Fields.publisherCustomLegitimateInterest);
    }};
}
