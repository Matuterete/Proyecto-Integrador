package com.ctdg4.ProThechnics.auth;

import com.ctdg4.ProThechnics.exception.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

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
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws DuplicateException, MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/resend-verification-code")
    @Operation(summary = "Resend verification code", description = "Resend the verification code to a user's email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Verification code resent successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "Failed to resend verification code", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code resent successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (MessagingException | UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to resend verification code");
        }
    }

    @PostMapping("/enable-user")
    @Operation(summary = "Enable user", description = "Enable a user account with the provided validation code")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User enabled successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(hidden = true)))
    })
    public ResponseEntity<?> enableUser(@RequestParam String email, @RequestParam Integer validationCode) {
        try {
            authService.enableUser(email, validationCode);
            return ResponseEntity.ok("User enabled successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid validation code");
        }
    }

}