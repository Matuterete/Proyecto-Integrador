package com.ctdg4.ProThechnics.dto;

import com.ctdg4.ProThechnics.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductImageDTO {
    private Long id;
    private String title;
    private String url;
    private boolean isPrimary;
}
