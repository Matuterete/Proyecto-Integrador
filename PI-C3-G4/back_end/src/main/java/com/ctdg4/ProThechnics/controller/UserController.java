package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.dto.UserDTO;
import com.ctdg4.ProThechnics.dto.UserFullDTO;
import com.ctdg4.ProThechnics.entity.User;
import com.ctdg4.ProThechnics.entity.UserRating;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.UserRoleService;
import com.ctdg4.ProThechnics.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
@Tags(value = {@Tag(name = "Users")})
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
    public ResponseEntity<Optional<UserFullDTO>> findUserByIdDTO(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<UserFullDTO> userSearched = userService.findUserByIdDTO(id);
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
    public ResponseEntity<Optional<UserFullDTO>> findUserByEmailDTO(@PathVariable String email) throws ResourceNotFoundException {
        Optional<UserFullDTO> userSearched = userService.findUserByEmailDTO(email);
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
            return ResponseEntity.ok("User: " + updatedUserDTO.getEmail() + " updated successfully");
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    //////////////// FAVORITES //////////////////

    @Operation(summary = "Add product to user's favorites")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product added to favorites successfully"),
            @ApiResponse(responseCode = "404", description = "User or product not found")
    })
    @PostMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<String> addFavorite(@Parameter(description = "User ID") @PathVariable Long userId,
                                              @Parameter(description = "Product ID") @PathVariable Long productId) {
        try {
            userService.addFavorite(userId, productId);
            return ResponseEntity.ok("Product added to favorites successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to add product to favorites. " + e.getMessage());
        }
    }

    @Operation(summary = "Remove product from user's favorites")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product removed from favorites successfully"),
            @ApiResponse(responseCode = "404", description = "User or product not found")
    })
    @DeleteMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<String> removeFavorite(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @Parameter(description = "Product ID") @PathVariable Long productId) {
        try {
            userService.removeFavorite(userId, productId);
            return ResponseEntity.ok("Product removed from favorites successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to remove product from favorites. " + e.getMessage());
        }
    }

    //////////////// RATINGS //////////////////
    @Operation(summary = "List all users ratings", description = "Retrieve a list of all users ratings")
    @ApiResponse(responseCode = "200", description = "List of users ratings retrieved successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserRating.class)))
    @GetMapping("/ratings/find/all")
    public ResponseEntity<List<UserRating>> listAllUsersRatings() {
        return ResponseEntity.ok(userService.listAllUserRating());
    }

    @Operation(summary = "Find user ratings by user ID", description = "Retrieve user ratings by providing the user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User ratings found"),
            @ApiResponse(responseCode = "404", description = "User ratings not found")
    })
    @GetMapping("/ratings/find/user/{userId}")
    public ResponseEntity<List<UserRating>> findRatingsByUserId(@PathVariable Long userId) throws ResourceNotFoundException {
        List<UserRating> userRatings = userService.findRatingsByUserId(userId);
        if (!userRatings.isEmpty()) {
            return ResponseEntity.ok(userRatings);
        } else {
            throw new ResourceNotFoundException("User ratings not found for user with ID: " + userId);
        }
    }
    @Operation(summary = "Find user ratings by product ID", description = "Retrieve user ratings by providing the product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User ratings found"),
            @ApiResponse(responseCode = "404", description = "User ratings not found")
    })
    @GetMapping("/ratings/find/product/{productId}")
    public ResponseEntity<List<UserRating>> findRatingsByProductId(@PathVariable Long productId) throws ResourceNotFoundException {
        List<UserRating> productRatings = userService.findRatingsByProductId(productId);
        if (!productRatings.isEmpty()) {
            return ResponseEntity.ok(productRatings);
        } else {
            throw new ResourceNotFoundException("User ratings not found for product with ID: " + productId);
        }
    }

    @Operation(summary = "Add user rating", description = "Add a new user rating and/or review")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User rating added successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserRating.class))),
            @ApiResponse(responseCode = "404", description = "Failed to add user rating")
    })
    @PostMapping("/rating/add")
    public ResponseEntity<UserRating> addUserRating(@RequestBody UserRating userRating) throws ResourceNotFoundException {
        LocalDate currentDate = LocalDate.now();
        userRating.setDate(currentDate);
        return ResponseEntity.ok(userService.addUserRating(userRating));
    }
}
