package com.ctdg4.ProThechnics.dto;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

import java.util.List;

@Data

public class UserFullDTO {
    private Long id;
    private Boolean isActive;
    private String name;
    private String lastName;
    private String email;
    private String role;
    private List<UserFavDTO> favorites;
}