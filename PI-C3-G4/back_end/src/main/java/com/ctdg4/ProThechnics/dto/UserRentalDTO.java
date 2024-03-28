package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

@Data
@Hidden
public class UserRentalDTO {
    private Long id;
    private String name;
    private String lastName;
}
