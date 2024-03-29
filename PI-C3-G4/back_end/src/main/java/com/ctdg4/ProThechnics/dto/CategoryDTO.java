package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

@Data
public class CategoryDTO {
    private Long id;
    private String title;
    private String description;
    private String url;
}
