package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.encoder.BaseEncoder;

public class IntEncoder implements BaseEncoder<Integer> {
    private IntEncoder() {
    }

    private static final IntEncoder instance = new IntEncoder();
    public static IntEncoder getInstance() {
        return instance;
    }
//    public static String encode(Integer value,int numBits) {
//        String bitString="";
//        bitString = value.toBinaryString(2);
//
//        if(bitString.length() > numBits || value.equals(0)) {
//            // throw error
//        }
//
//        if(bitString.length() < numBits) {
//            bitString = new String(new char[numBits - bitString.length()]).replace("\0", "0") + bitString;
//        }
//        return bitString;
//    }

    public Integer decode(String value) {
        return Integer.parseInt(value,2);
    }
}
