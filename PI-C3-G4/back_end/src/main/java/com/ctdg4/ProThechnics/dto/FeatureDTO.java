package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

@Data
@Hidden
public class FeatureDTO {
    private Long id;
    private String title;
    private String url;
    private String featureValue;
}