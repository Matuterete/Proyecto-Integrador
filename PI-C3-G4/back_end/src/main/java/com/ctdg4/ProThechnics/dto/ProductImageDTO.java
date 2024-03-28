package com.ctdg4.ProThechnics.dto;

import com.ctdg4.ProThechnics.entity.Product;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

import java.util.List;

@Data
@Hidden
public class ProductImageDTO {
    private Long id;
    private String title;
    private String url;
    private boolean isPrimary;
}
