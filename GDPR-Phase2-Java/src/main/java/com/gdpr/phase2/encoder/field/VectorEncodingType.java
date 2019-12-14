package com.gdpr.phase2.encoder.field;

public enum VectorEncodingType {
    FIELD(0),
    RANGE(1);

    private int type;

    VectorEncodingType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
