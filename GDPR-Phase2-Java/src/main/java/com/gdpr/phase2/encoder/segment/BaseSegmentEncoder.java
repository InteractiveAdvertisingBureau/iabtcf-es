package com.gdpr.phase2.encoder.segment;

import com.gdpr.phase2.Utils.TCModel;

public interface BaseSegmentEncoder {
    TCModel decode(String encodedString, TCModel tcModel);
}
