package com.ctdg4.ProThechnics.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
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
