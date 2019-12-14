package com.gdpr.phase2.encoder.segment;

import com.gdpr.phase2.encoder.Base64Url;
import com.gdpr.phase2.encoder.sequence.CoreFieldSequence;
import com.gdpr.phase2.model.PurposeRestrictionVector;
import com.gdpr.phase2.model.SortedVector;
import com.gdpr.phase2.Utils.TCModel;
import com.gdpr.phase2.Utils.TCModelEnum;
import com.gdpr.phase2.encoder.BaseEncoder;
import com.gdpr.phase2.encoder.BitLength;
import com.gdpr.phase2.encoder.field.FieldEncoderMap;
import com.gdpr.phase2.encoder.field.FixedVectorEncoder;
import com.gdpr.phase2.encoder.field.PurposeRestrictionVectorEncoder;
import com.gdpr.phase2.encoder.field.VendorVectorEncoder;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

public class CoreTCEncoder implements BaseSegmentEncoder {
    private CoreTCEncoder(){}
    private static final CoreTCEncoder instance = new CoreTCEncoder();
    public static CoreTCEncoder getInstance() {
        return instance;
    }

    public TCModel decode(String encodedString, TCModel tcModel) {
        final Map<String, BaseEncoder> encMap = FieldEncoderMap.getInstance().getFieldMap();
        final CoreFieldSequence coreFieldSequence = CoreFieldSequence.getInstance();
        List<String> encodeSequence = null;
        if(tcModel.getVersion() == 1) {
             encodeSequence = coreFieldSequence.one;
        } else if (tcModel.getVersion() == 2) {
            encodeSequence = coreFieldSequence.two;
        }
        String bitField = Base64Url.decode(encodedString);
        AtomicInteger bStringIdx = new AtomicInteger();
        if(encodeSequence!=null && !encodeSequence.isEmpty()) {
            encodeSequence.forEach(key -> {
                BaseEncoder encoder = encMap.get(key);
                if(encoder!=null) {
                    Optional<Integer> keyLength;
                    String bits = "";
                    keyLength = Optional.ofNullable(BitLength.fieldLengths.get(key));
                    if (keyLength.isPresent()) {
                        bits = bitField.substring(bStringIdx.get(), bStringIdx.addAndGet(keyLength.get()));
                        TCModelEnum.valueOf(key).setValue(tcModel, encoder.decode(bits));
                    } else {
                        bits = bitField.substring(bStringIdx.get());
                        int tcKeyLength = 0;
                        if (encoder instanceof PurposeRestrictionVectorEncoder) {
                            PurposeRestrictionVector purposeRestrictionVector = (PurposeRestrictionVector) encoder.decode(bits);
                            TCModelEnum.valueOf(key).setValue(tcModel, purposeRestrictionVector);
                            tcKeyLength = purposeRestrictionVector.bitLength;

                        } else if (encoder instanceof FixedVectorEncoder || encoder instanceof VendorVectorEncoder) {
                            SortedVector vector = (SortedVector) encoder.decode(bits);
                            TCModelEnum.valueOf(key).setValue(tcModel, vector);
                            tcKeyLength = vector.bitLength;
                        }
                        bStringIdx.addAndGet(tcKeyLength);
                    }
                } else {
                    //throw error
                }
            });
        }
        return tcModel;

    }





}
