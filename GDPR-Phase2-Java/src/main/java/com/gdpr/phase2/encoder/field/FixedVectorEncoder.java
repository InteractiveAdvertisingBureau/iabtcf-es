package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.model.SortedVector;
import com.gdpr.phase2.encoder.BaseEncoder;


public class FixedVectorEncoder implements BaseEncoder<SortedVector> {
    private FixedVectorEncoder() {
    }

    BooleanEncoder booleanEncoder = BooleanEncoder.getInstance();
    private static final FixedVectorEncoder instance = new FixedVectorEncoder();
    public static FixedVectorEncoder getInstance() {
        return instance;
    }
//    public static String encode(SortedSet<Integer> value,int numBits) {
//        String bitString = "";
//        for(int i=1; i <=numBits; i++) {
//            bitString += BooleanEncoder.encode(value.contains(i));
//        }
//        return bitString;
//    }

    public final SortedVector decode(String value) {
        SortedVector st = new SortedVector();
        for(int i=1; i<=value.length(); i++) {
            if(booleanEncoder.decode(String.valueOf(value.charAt(i-1)))) {
                st.getSet().add(i);
                if(st.getBitLength()!=0) {
                    st.setBitLength(0);
                }
            }
        }
        st.setBitLength(value.length());
        return st;
    }
}
