package com.gdpr.phase2.model;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter @Setter
public class ConsentLanguages {

    private  Set<String> languages = new HashSet<>();

    public ConsentLanguages() {
        languages.add("EN");
        languages.add("BG");
        languages.add("CS");
        languages.add("DA");
        languages.add("DE");
        languages.add("EL");
        languages.add("ES");
        languages.add("ET");
        languages.add("FI");
        languages.add("FR");
        languages.add("GA");
        languages.add("HR");
        languages.add("HU");
        languages.add("IT");
        languages.add("LT");
        languages.add("LV");
        languages.add("MT");
        languages.add("NL");
        languages.add("PL");
        languages.add("PT");
        languages.add("RO");
        languages.add("SK");
        languages.add("SL");
        languages.add("SV");
    }
}
