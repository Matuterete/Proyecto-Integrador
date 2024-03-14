package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.User;
import com.ctdg4.ProThechnics.entity.User;
import com.ctdg4.ProThechnics.entity.UserRole;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.UserRoleService;
import com.ctdg4.ProThechnics.service.UserService;
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
    
    @PostMapping("/add")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws DuplicateException {
        Optional<User> existingUser = userService.findUserByEmail(user.getEmail());
        if (!existingUser.isEmpty()) {
            throw new DuplicateException("User with email: '" + user.getEmail() + "' already registered.");
        }
        User savedUser = userService.saveUser(user);

        UserRole userRole = new UserRole();
        userRole.setUser(savedUser);
        userRole = userRoleService.saveUserRole(userRole);

        savedUser.setRole(userRole);

        savedUser = userService.saveUser(savedUser);

        return ResponseEntity.ok(savedUser);
    }
    
    @GetMapping("/find/all")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(userService.listAllUsers());
    }

    @GetMapping("/find/{email}/{password}")
    public ResponseEntity<Optional<User>> findUserByEmailAndPassword(@PathVariable String email, @PathVariable String password) throws ResourceNotFoundException {
        Optional<User> userSearched = userService.findUserByEmailAndPassword(email, password);
        if (userSearched.isPresent()) {
            return ResponseEntity.ok(userSearched);
        } else {
            throw new ResourceNotFoundException("Invalid credentials. Please check your email and password.");
        }
    }
        
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

    @PutMapping("/update/role")
    public ResponseEntity<String> updateUser(@RequestBody User user) throws ResourceNotFoundException {
        Optional<User> userSearched = userService.findUserById(user.getId());
        if (userSearched.isPresent()) {
            userService.updateUser(user);
            return ResponseEntity.ok("User updated successfully: " + user.getEmail());
        } else {
            throw new ResourceNotFoundException(String.format("User: %d not found. User update failed. Please verify the User exists and try again.", user.getEmail()));

        }
    }
}
