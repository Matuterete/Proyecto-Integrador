package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

@Data

public class ProductRentalDTO {
    private Long id;
    private String name;
    private Double price;
}
