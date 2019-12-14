package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.encoder.BaseEncoder;

public class BooleanEncoder implements BaseEncoder<Boolean> {
//    public final String encode(Boolean value) {
//        return value + "";
//    }

    private BooleanEncoder() {
    }

    private static final BooleanEncoder instance = new BooleanEncoder();
    public static BooleanEncoder getInstance() {
        return instance;
    }
    public final Boolean decode(String value){
        return value.equals("1");
    }
}
