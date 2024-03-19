package com.ctdg4.ProThechnics.dto;

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