package com.gdpr.phase2.encoder.segment;

import com.gdpr.phase2.encoder.Base64Url;
import com.gdpr.phase2.encoder.sequence.PublisherFieldSequence;
import com.gdpr.phase2.Utils.TCModel;
import com.gdpr.phase2.Utils.TCModelEnum;
import com.gdpr.phase2.encoder.BaseEncoder;
import com.gdpr.phase2.encoder.BitLength;
import com.gdpr.phase2.encoder.field.FieldEncoderMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

public class PublisherTCEncoder implements BaseSegmentEncoder {
    private PublisherTCEncoder() {
    }
    private static final PublisherTCEncoder instance = new PublisherTCEncoder();
    public static PublisherTCEncoder getInstance() {
        return instance;
    }

    public TCModel decode(String encodedString, TCModel tcModel) {
        Map<String, BaseEncoder> encMap = FieldEncoderMap.getInstance().fieldMap;
        PublisherFieldSequence pubFieldSequence = PublisherFieldSequence.getInstance();
        List<String> encodedSequence = null;
        if(tcModel.getVersion() == 1) {
            encodedSequence = pubFieldSequence.one;
        } else {
            encodedSequence = pubFieldSequence.two;
        }
        AtomicInteger bStringIdx = new AtomicInteger();
        String bitField = Base64Url.decode(encodedString);
        encodedSequence.forEach(key -> {
            BaseEncoder encoder = encMap.get(key);
            Object keyLength = null;
            keyLength = Optional.ofNullable(BitLength.fieldLengths.get(key)).orElse(0);
            int numBits = (int) keyLength > 0 ? (int)keyLength : tcModel.getNumCustomPurposes();
            TCModelEnum.valueOf(key).setValue(tcModel,encoder.decode(bitField.substring(bStringIdx.get(), bStringIdx.get() + numBits)));
            bStringIdx.addAndGet(numBits);
        });
        return tcModel;
    }
}
