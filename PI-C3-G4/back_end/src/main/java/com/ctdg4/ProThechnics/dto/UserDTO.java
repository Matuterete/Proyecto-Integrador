package com.ctdg4.ProThechnics.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(hidden = true)
public class UserDTO {
    private Long id;
    private Boolean isActive;
    private String name;
    private String lastName;
    private String email;
    private String role;
}
