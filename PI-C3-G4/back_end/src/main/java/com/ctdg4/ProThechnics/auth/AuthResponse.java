package com.ctdg4.ProThechnics.auth;

import com.ctdg4.ProThechnics.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class AuthResponse {
    String token;
    UserDTO user;
}
