package com.gdpr.phase2.encoder;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;


import java.util.regex.Pattern;

public class Base64Url {

    private Base64Url() {
    }
    private static final Base64Url instance = new Base64Url();
    public static Base64Url getInstance() {
        return instance;
    }

    private static final int ONE_BYTE = 8;
    private static final Pattern p = Pattern.compile("[A-Z0-9]",Pattern.CASE_INSENSITIVE);
    /**
     * decodes a base64url encoded bitfield string
     *
     * @static
     * @param {string} str - base64url encoded bitfield string to be decoded
     * @return {string} - bitfield string
     */
    public static String decode(String str) {
        /**
         * should contain only characters from the base64url set
         */
        if(!p.matcher(str).matches()) {
            // throw error
        }

        /**
         * @Functional Description -
         *            1. First convert the string to byte array (byte array might have negative integers
         *            2. Multiplying it with 0xFF is just a way to get the unsigned byte value, by converting it to short and then masking out the original bits from the byte, to display it as an unsigned value.
         */
        byte [] decodedBytes = Base64.decodeBase64(str);

        int len = decodedBytes.length;
        StringBuilder bitField = new StringBuilder();
        for(int i = 0; i < len; i++) {
            String strBits = Integer.toBinaryString(decodedBytes[i]&0xFF);
            bitField.append(StringUtils.leftPad(strBits, Base64Url.ONE_BYTE, "0"));
        }
        return bitField.toString();
    }
}
