package com.ctdg4.ProThechnics.dto;

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
