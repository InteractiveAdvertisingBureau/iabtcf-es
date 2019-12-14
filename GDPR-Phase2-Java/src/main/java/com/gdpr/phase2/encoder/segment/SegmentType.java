package com.gdpr.phase2.encoder.segment;

import com.gdpr.phase2.model.Segments;
import lombok.*;

@Getter @Setter
public class SegmentType {
    private SegmentType() {
    }
    private static  SegmentType instance = new SegmentType();
    public static SegmentType getInstance() {
        return instance;
    }

    public static final String zero = Segments.core;
    public static final String one = Segments.vendorsDisclosed;
    public static final String two = Segments.vendorsAllowed;
    public static final String three = Segments.publisherTC;

    public static final int core = 0;
    public static final int vendorsDisclosed = 1;
    public static final int vendorsAllowed = 2;
    public static final int publisherTC = 3;

    public static final int numTypes = 4;
}
