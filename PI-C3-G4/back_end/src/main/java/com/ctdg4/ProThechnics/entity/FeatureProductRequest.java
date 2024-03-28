package com.ctdg4.ProThechnics.entity;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

@Data
@Hidden
public class FeatureProductRequest {
    private Long productId;
    private Long featureId;
    private String featureValue;
}
