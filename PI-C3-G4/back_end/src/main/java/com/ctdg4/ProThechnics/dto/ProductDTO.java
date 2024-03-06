package com.ctdg4.ProThechnics.dto;

import com.ctdg4.ProThechnics.entity.Category;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private Boolean isActive;
    private String name;
    private String description;
    private Double price;
    private Long stock;
    private CategoryDTO category;
    private List<ProductImageDTO> images;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<FeatureDTO> features;
}
