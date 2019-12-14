package com.gdpr.phase2.model.gvl;

import lombok.*;
import java.util.*;

@Getter @Setter @AllArgsConstructor
public class SetsOfLegalBases {
    Set<Integer> legInt;
    Set<Integer> consent;
    Set<Integer> flexible;
}
