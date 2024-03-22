package com.ctdg4.ProThechnics.entity;

import lombok.Data;

@Data
public class FeatureProductRequest {
    private Long productId;
    private Long featureId;
    private String featureValue;
}
