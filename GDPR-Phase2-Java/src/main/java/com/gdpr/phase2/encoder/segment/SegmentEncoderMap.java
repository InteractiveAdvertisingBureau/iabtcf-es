package com.gdpr.phase2.encoder.segment;

import lombok.*;

@Getter @Setter
public class SegmentEncoderMap {
    private SegmentEncoderMap() {
    }
    private static final SegmentEncoderMap instance = new SegmentEncoderMap();
    public static SegmentEncoderMap getInstance() {
        return instance;
    }

    public final CoreTCEncoder core = CoreTCEncoder.getInstance();
    public final OOBVendorsEncoder vendorsDisclosed = OOBVendorsEncoder.getInstance();
    public final OOBVendorsEncoder vendorsAllowed = OOBVendorsEncoder.getInstance();
    public final PublisherTCEncoder publisherTC = PublisherTCEncoder.getInstance();

}
