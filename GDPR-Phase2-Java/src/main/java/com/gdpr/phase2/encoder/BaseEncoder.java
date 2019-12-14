package com.gdpr.phase2.encoder;

public interface BaseEncoder<T> {
//    String encode(T value);
    T decode(String value);

}
