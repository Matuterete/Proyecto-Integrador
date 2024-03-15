package com.ctdg4.ProThechnics.auth;

import com.ctdg4.ProThechnics.entity.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    String name;
    String lastName;
    String password;
    String email;
    UserRole role;
}
