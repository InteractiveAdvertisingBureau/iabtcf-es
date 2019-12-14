package com.gdpr.phase2.encoder.sequence;

import com.gdpr.phase2.model.Segments;
import com.gdpr.phase2.Utils.TCModel;

import java.util.ArrayList;
import java.util.List;

public class SegmentSequence extends VersionMap {
    private SegmentSequence() {
    }
    private static final SegmentSequence instance = new SegmentSequence();
    public static SegmentSequence getInstance() {
        return instance;
    }

    public final List<String> one = new ArrayList<String>(){{
        add(Segments.core);
    }};
    public final List<String> two = new ArrayList<String>(){{
        add(Segments.core);
    }};

    public SegmentSequence(TCModel tcModel,Boolean isForSaving) {
        if(tcModel.getServiceSpecific()) {
            /**
             * If it's service specific only, then the publisher TC String can be
             * stored in the cookie and would be transmitted if it's not for
             * storage
             */
            if(isForSaving) {
                this.two.add(Segments.publisherTC);
            }
        } else {
            /**
             * this is a globally scoped string.
             *
             * If the publisher supports OOB, then the disclosed vendors vector will
             * be added to both the transmission string and the storage string
             */
            if(tcModel.getSupportOOB() && tcModel.vendorsDisclosed.getSet().size()>0) {
                this.two.add(Segments.vendorsDisclosed);
            }

            /**
             * If this string is not for saving then the vendors allowed vector can
             * be added – Otherwise, it should be omitted because this is a publisher
             * specific setting and we don't want to store publisher-specific
             * settings in the global cookie.
             */
            if(!isForSaving) {
                if(tcModel.vendorsAllowed.getSet().size()>0) {
                    this.two.add(Segments.vendorsAllowed);
                }
                if(tcModel.publisherConsents.getSet().size() > 0 ||
                tcModel.publisherLegitimateInterest.getSet().size() > 0 ||
                tcModel.getNumCustomPurposes() > 0 ||
                tcModel.publisherCustomConsents.getSet().size() > 0 ||
                tcModel.publisherCustomLegitimateInterest.getSet().size() > 0) {
                    this.two.add(Segments.publisherTC);
                }
            }
        }
    }
}
