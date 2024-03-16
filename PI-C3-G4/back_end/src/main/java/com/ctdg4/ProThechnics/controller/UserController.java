package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.dto.UserDTO;
import com.ctdg4.ProThechnics.entity.User;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.UserRoleService;
import com.ctdg4.ProThechnics.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
@Tags(value = { @Tag(name = "Users") })
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private UserRoleService userRoleService;
    
    @Operation(summary = "List all users", description = "Retrieve a list of all registered users")
    @ApiResponse(responseCode = "200", description = "List of users retrieved successfully")
    @GetMapping("/find/all")
    public ResponseEntity<List<UserDTO>> listAllUsersDTO() {
        return ResponseEntity.ok(userService.listAllUsersDTO());
    }

    @Operation(summary = "Find user by ID", description = "Retrieve user details by providing the user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/find/id/{id}")
    public ResponseEntity<Optional<UserDTO>> findUserByIdDTO(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<UserDTO> userSearched = userService.findUserByIdDTO(id);
        if (userSearched.isPresent()) {
            return ResponseEntity.ok(userSearched);
        } else {
            throw new ResourceNotFoundException("No user found with Id: " + id);
        }
    }

    @Operation(summary = "Find user by email", description = "Retrieve user details by providing the email address")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/find/email/{email}")
    public ResponseEntity<Optional<UserDTO>> findUserByEmailDTO(@PathVariable String email) throws ResourceNotFoundException {
        Optional<UserDTO> userSearched = userService.findUserByEmailDTO(email);
        if (userSearched.isPresent()) {
            return ResponseEntity.ok(userSearched);
        } else {
            throw new ResourceNotFoundException("No user found with Email: " + email);
        }
    }

    @Operation(summary = "Delete user by ID", description = "Delete a user by providing the user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/delete/id/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long user_id) throws ResourceNotFoundException {
        Optional<User> userSearched = userService.findUserById(user_id);
        if (userSearched.isPresent()) {
            userService.deleteUser(user_id);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            throw new ResourceNotFoundException("User deletion failed. The User may already be deleted or referenced by other entities. Please check the User ID and try again.");
        }
    }

    @Operation(summary = "Update user role", description = "Update user role details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User role updated successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PutMapping("/update")
    public ResponseEntity<String> updateUserDTO(@RequestBody UserDTO userDTO) throws ResourceNotFoundException {
        try {
            UserDTO updatedUserDTO = userService.updateUserDTO(userDTO);
            return ResponseEntity.ok("User: " + updatedUserDTO.getEmail() + " updated successfully" );
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
}
