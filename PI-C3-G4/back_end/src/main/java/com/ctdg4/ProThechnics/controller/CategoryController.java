package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.Category;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("api/categories")
@CrossOrigin(origins = "*")
@Tags(value = { @Tag(name = "Categories") })
public class CategoryController {
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = "Register a new category", description = "Registers a new category in the system")
    @ApiResponse(responseCode = "200", description = "Category registered successfully",
            content = @Content(schema = @Schema(implementation = Category.class)))
    @PostMapping("/add")
    public ResponseEntity<Category> registerCategory(@RequestBody Category category) throws DuplicateException {
        List<Category> existingCategory = categoryService.findCategoryByTitleLike(category.getTitle());
        if (!existingCategory.isEmpty()) {
            throw new DuplicateException("Category with name: '" + category.getTitle() + "' already exists.");
        }
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @Operation(summary = "List all categories", description = "Retrieves a list of all categories")
    @ApiResponse(responseCode = "200", description = "List of categories",
            content = @Content(schema = @Schema(implementation = Category.class)))
    @GetMapping("/find/all")
    public ResponseEntity<List<Category>> listCategories() {
        return ResponseEntity.ok(categoryService.listAllCategories());
    }

    @Operation(summary = "Find category by ID", description = "Retrieves a category by its ID")
    @ApiResponse(responseCode = "200", description = "Category found",
            content = @Content(schema = @Schema(implementation = Category.class)))
    @GetMapping("/find/id/{category_id}")
    public ResponseEntity<Optional<Category>> findCategoryById(@PathVariable Long category_id) {
        return ResponseEntity.ok(categoryService.findCategoryById(category_id));
    }

    @Operation(summary = "Find categories by title", description = "Retrieves categories that match the given title")
    @ApiResponse(responseCode = "200", description = "List of categories",
            content = @Content(schema = @Schema(implementation = Category.class)))
    @GetMapping("/find/name/{title}")
    public ResponseEntity<List<Category>> findCategoryByTitle(@PathVariable String title) {
        return ResponseEntity.ok(categoryService.findCategoryByTitleLike(title));
    }

    @Operation(summary = "Delete category by ID", description = "Deletes a category by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @DeleteMapping("/delete/id/{category_id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long category_id) throws ResourceNotFoundException {
        Optional<Category> CategorySearched = categoryService.findCategoryById(category_id);
        if (CategorySearched.isPresent()) {
            categoryService.deleteCategory(category_id);
            return ResponseEntity.ok("Category deleted successfully");
        } else {
            throw new ResourceNotFoundException("Category deletion failed. The Category may already be deleted or referenced by other entities.Please check the Category ID and try again.");
        }
    }

    @Operation(summary = "Update category", description = "Updates a category with new details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category updated successfully"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(@RequestBody Category category) throws ResourceNotFoundException {
        Optional<Category> CategorySearched = categoryService.findCategoryById(category.getId());
        if (CategorySearched.isPresent()) {
            categoryService.updateCategory(category);
            return ResponseEntity.ok("Category updated successfully: " + category.getId() + " - " + category.getTitle());
        } else {
            throw new ResourceNotFoundException(String.format("Category: %d - %s not found. Category update failed. Please verify the Category exists and try again.", category.getId(), category.getTitle()));

        }
    }
}
