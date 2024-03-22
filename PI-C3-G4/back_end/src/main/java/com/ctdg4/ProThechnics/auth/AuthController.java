package com.ctdg4.ProThechnics.auth;

import com.ctdg4.ProThechnics.exception.BadCredentialsException;
import com.ctdg4.ProThechnics.exception.DisabledException;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.UsernameNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tags(value = {@Tag(name = "Authentication")})
public class AuthController {
    @Autowired
    private AuthService authService;

    @Operation(summary = "User login", description = "Authenticate a user with their credentials")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully"),
            @ApiResponse(responseCode = "401", description = "Bad credentials / User is disabled", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) throws BadCredentialsException, UsernameNotFoundException, DisabledException {
        return ResponseEntity.ok(authService.login(request));
    }

    @Operation(summary = "User registration", description = "Register a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully"),
            @ApiResponse(responseCode = "409", description = "Duplicate user", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws DuplicateException {
        return ResponseEntity.ok(authService.register(request));
    }
}