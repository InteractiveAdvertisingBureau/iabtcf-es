package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.model.SortedVector;
import com.gdpr.phase2.encoder.BaseEncoder;
import com.gdpr.phase2.encoder.BitLength;

import java.util.Optional;

public class VendorVectorEncoder implements BaseEncoder<SortedVector> {

    private VendorVectorEncoder() {
    }

    private static final VendorVectorEncoder instance = new VendorVectorEncoder();
    public static VendorVectorEncoder getInstance() {
        return instance;
    }
    public static Boolean RANGE_DEFAULT = false;
    public FixedVectorEncoder fixedVectorEncoder = FixedVectorEncoder.getInstance();
    public IntEncoder intEncoder = IntEncoder.getInstance();
    public BooleanEncoder booleanEncoder = BooleanEncoder.getInstance();

//    public static String encode(SortedSet<Integer> value) {
//        List<Integer> range = new ArrayList<>();
//        StringBuilder bitField = new StringBuilder();
//        String retrString = IntEncoder.encode(value.first(), BitLength.maxId);
//        List<List<Integer>> ranges =new ArrayList<>(new ArrayList<>());
//        for(int i=1;i<=value.first();i++) {
//            Boolean curValue = value.contains(i);
//            bitField.append(BooleanEncoder.encode(curValue));
//            if(curValue) {
//                Boolean nextValue = value.contains(i+1);
//                if(!nextValue) {
//                    range.add(i);
//                    ranges.add(range);
//                    range.clear();
//                } else if(range.size()==0){
//                    range.add(i);
//                }
//            }
//        }
//        if(rangeIsSmaller(ranges,value.first())) {
//            retrString += VectorEncodingType.RANGE + "";
//            retrString += buildRangeEncoding(ranges);
//        } else {
//            retrString += VectorEncodingType.FIELD + "";
//            retrString += bitField;
//        }
//
//        return retrString;
//
//    }

    public final SortedVector decode(String value) {
        SortedVector vector = null;
        int index = 0;
        int maxId = intEncoder.decode(value.substring(index,index += Optional.ofNullable(BitLength.fieldLengths.get("maxId")).orElse(0)));
        VectorEncodingType encodingType = VectorEncodingType.valueOf(intEncoder.decode(Character.toString(value.charAt(index)))==0?"FIELD":"RANGE");
        index += Optional.ofNullable(BitLength.fieldLengths.get("encodingType")).orElse(0);

        if(encodingType.getType() == VectorEncodingType.RANGE.getType()) {
            Boolean defaultValue = booleanEncoder.decode(Character.toString(value.charAt(index)));
            index += Optional.ofNullable(BitLength.fieldLengths.get("encodingType")).orElse(0);
            vector = new SortedVector();

            if(defaultValue) {
                for(int i=1; i<=maxId; i++) {
                    vector.getSet().add(i);
                }
            }
            int numEntries = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("numEntries")).orElse(0)));

            for(int i=0;i< numEntries; i++) {
                Boolean isIdRange = booleanEncoder.decode(Character.toString(value.charAt(index)));
                index += Optional.ofNullable(BitLength.fieldLengths.get("singleOrRange")).orElse(0);

                int firstId = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("vendorId")).orElse(0)));

                if(isIdRange) {
                    int secondId = intEncoder.decode(value.substring(index, index += Optional.ofNullable(BitLength.fieldLengths.get("vendorId")).orElse(0)));

                    for(int j=firstId; j<=secondId; j++) {
                        if(defaultValue) {
                            vector.getSet().remove(j);
                        } else {
                            vector.getSet().add(j);
                        }
                        vector.setBitLength(0);
                    }
                } else {
                    if(defaultValue) {
                        vector.getSet().remove(firstId);
                    } else {
                        vector.getSet().add(firstId);
                    }
                    vector.setBitLength(0);
                }
            }

        } else {
            String bitField = value.substring(index, index += maxId);
            vector = fixedVectorEncoder.decode(bitField);
        }
        vector.setBitLength(index);
        return vector;
    }

//    private static String buildRangeEncoding(List<List<Integer>> ranges) {
//        int numEntries = ranges.size();
//        final String[] rangeString = {BooleanEncoder.encode(VendorVectorEncoder.RANGE_DEFAULT)};
//        rangeString[0] += IntEncoder.encode(numEntries,BitLength.numEntries);
//        ranges.forEach(range -> {
//            Boolean single = range.size() == 1;
//            rangeString[0] += BooleanEncoder.encode(!single);
//            rangeString[0] += IntEncoder.encode(range.get(0),BitLength.vendorId);
//            if (!single) {
//
//                // add the second id if it exists
//                rangeString[0] += IntEncoder.encode(range.get(1), BitLength.vendorId);
//
//            }
//
//        });
//        return rangeString[0];
//    }
//
//    private static Boolean rangeIsSmaller(List<List<Integer>> ranges, int maxId) {
//        AtomicInteger rLength = new AtomicInteger(BitLength.anyBoolean + BitLength.numEntries);
//        ranges.forEach(range -> {
//            Boolean single = range.size() == 1;
//            rLength.addAndGet(BitLength.singleOrRange);
//            rLength.addAndGet(BitLength.vendorId);
//            if(!single) {
//                rLength.addAndGet(BitLength.vendorId);
//            }
//        });
//        return rLength.intValue() < maxId;
//    }

}
