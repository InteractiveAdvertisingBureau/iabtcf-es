package com.gdpr.phase2.Utils;

import com.gdpr.phase2.encoder.Base64Url;
import com.gdpr.phase2.encoder.field.IntEncoder;
import com.gdpr.phase2.encoder.segment.BaseSegmentEncoder;
import com.gdpr.phase2.encoder.segment.SegmentEncoderMap;
import com.gdpr.phase2.encoder.BitLength;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


public class TCString {
    private TCString() {
    }
    private static final TCString instance = new TCString();
    public static TCString getInstance() {
        return instance;
    }

    private IntEncoder intEncoder = IntEncoder.getInstance();
    /**
     * Decodes a string into a TCModel
     *
     * @param {string} encodedString - base64url encoded Transparency and
     * Consent String to decode
     * @return {TCModel} - Returns populated TCModel
     */
    public TCModel decode(String encodedString) {
        TCModel tcModel = new TCModel();
        List<String> segments = Arrays.asList(encodedString.split("\\."));
        SegmentEncoderMap segMap = SegmentEncoderMap.getInstance();
        int len = segments.size();
        BaseSegmentEncoder encoder = null;
        for (int i=0; i < len; i++) {
            String segment = segments.get(i);

            if(i == 0) {
                encoder = segMap.core;
                if(encoder!=null) {
                    encoder.decode(segment,tcModel);
                }
            } else {
                // first char will contain 6 bits, we only need the first 3
                //TODO require fix
                String firstChar = Base64Url.decode(String.valueOf(segment.charAt(0)-'A')); //I
                String segTypeBits = firstChar.substring(0, Optional.ofNullable(BitLength.fieldLengths.get("segmentType")).orElse(0));
                int segType = intEncoder.decode(segTypeBits);

                switch (segType) {
                    case 1:
                        encoder = segMap.vendorsDisclosed;
                        break;
                    case 2:
                        encoder = segMap.vendorsAllowed;
                        break;
                    case 3:
                        encoder = segMap.publisherTC;
                        break;

                }
                encoder.decode(segment,tcModel);


            }
        }
        return tcModel;
    }

}

