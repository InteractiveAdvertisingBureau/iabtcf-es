package com.gdpr.phase2.encoder.field;

import com.gdpr.phase2.encoder.BaseEncoder;

import java.util.*;

public class DateEncoder implements BaseEncoder<Date> {
//    public String encode(Date value,int numBits) {
//        return IntEncoder.encode(Math.round(value.getTime()/100),numBits);
//    }

    private DateEncoder() {
    }

    private static final DateEncoder instance = new DateEncoder();
    public static DateEncoder getInstance() {
        return instance;
    }
    public Date decode(String value) {
        Date date = new Date(Long.parseLong(value,2)*100);
        return date;
    }
}
