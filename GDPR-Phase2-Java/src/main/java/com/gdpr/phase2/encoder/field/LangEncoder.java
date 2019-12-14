package com.gdpr.phase2.encoder.field;


import com.gdpr.phase2.encoder.BaseEncoder;

public class LangEncoder implements BaseEncoder<String> {
    private LangEncoder() {
    }

    private IntEncoder intEncoder = IntEncoder.getInstance();
    private static final LangEncoder instance = new LangEncoder();
    public static LangEncoder getInstance() {
        return instance;
    }
//    public static String encode(String value,int numBits) {
//        value = value.toUpperCase();
//        final int ASCII_START = 65;
//        final int firstLetter = (int)value.charAt(0) - ASCII_START;
//        final int secondLetter = (int)value.charAt(1) - ASCII_START;
//        if( firstLetter < 0 || firstLetter > 25 || secondLetter < 0 || secondLetter > 25) {
//            // throw error
//        }
//        if(numBits % 2 == 1){
//            //throw error
//        }
//        numBits = numBits/2;
//        String firstLetterBString = IntEncoder.encode(firstLetter,numBits);
//        String secondLetterBString = IntEncoder.encode(secondLetter,numBits);
//        return firstLetterBString + secondLetterBString;
//    }

    public final String decode(String value) {
        String retr = "";

        if(value.length() % 2 == 0) {
            final int ASCII_START = 65;
            final int mid = value.length() / 2;
            final int firstLetter = intEncoder.decode(value.substring(0, mid)) + ASCII_START;
            final int secondLetter = intEncoder.decode(value.substring(mid)) + ASCII_START;
            retr = fromCharCode(firstLetter) + fromCharCode(secondLetter);
        } else {
            // throw error;
        }
        return retr;

    }

    private static String fromCharCode(int ...codePoints) {
        return new String(codePoints, 0, codePoints.length);
    }

}
