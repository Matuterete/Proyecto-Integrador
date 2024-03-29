package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private Boolean isActive;
    private String name;
    private String lastName;
    private String email;
    private String role;
}
