package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Hidden
public class RentalDTO {
    private Long id;
    private Long userId;
    private ProductRentalDTO product;
    private LocalDateTime dateRent;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private Long daysTotal;
    private Double amount;
}
