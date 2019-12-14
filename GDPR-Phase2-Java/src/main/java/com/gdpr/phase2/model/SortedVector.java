package com.gdpr.phase2.model;

import java.util.*;


/**
 * @Description
 * Its a java replacement of the "Vector" class defined in the Typescript code of Chris's Library
 */
public class SortedVector {
    public int bitLength;
    public SortedSet<Integer> set;

    public SortedVector(int bitLength, SortedSet<Integer> set) {
        this.bitLength = bitLength;
        this.set = set;
    }

    public SortedVector() {
        this.bitLength = 0;
        this.set = new TreeSet<Integer>((o1, o2) -> o2 - o1);
    }

    public int getBitLength() {
        return bitLength;
    }

    public void setBitLength(int bitLength) {
        this.bitLength = bitLength;
    }

    public SortedSet getSet() {
        return set;
    }

    public void setSet(SortedSet set) {
        this.set = set;
    }
}
