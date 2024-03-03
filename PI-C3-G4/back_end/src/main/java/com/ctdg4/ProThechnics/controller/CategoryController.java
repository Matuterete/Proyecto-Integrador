package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.Category;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*")
public class CategoryController {
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @PostMapping("/add")
    public ResponseEntity<Category> registerCategory(@RequestBody Category category) throws DuplicateException {
        List<Category> existingCategory = categoryService.findCategoryByTitleLike(category.getTitle());
        if (!existingCategory.isEmpty()) {
            throw new DuplicateException("Category with name: '" + category.getTitle() + "' already exists.");
        }
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<Category>> listCategories() {
        return ResponseEntity.ok(categoryService.listAllCategories());
    }

    @GetMapping("/find/id/{category_id}")
    public ResponseEntity<Optional<Category>> findCategoryById(@PathVariable Long category_id) {
        return ResponseEntity.ok(categoryService.findCategoryById(category_id));
    }

    @GetMapping("/find/name/{title}")
    public ResponseEntity<List<Category>> findCategoryByTitle(@PathVariable String title) {
        return ResponseEntity.ok(categoryService.findCategoryByTitleLike(title));
    }

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

    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(@RequestBody Category category) throws ResourceNotFoundException {
        Optional<Category> CategorySearched = categoryService.findCategoryById(category.getCategory_id());
        if (CategorySearched.isPresent()) {
            categoryService.updateCategory(category);
            return ResponseEntity.ok("Category updated successfully: " + category.getCategory_id() + " - " + category.getTitle());
        } else {
            throw new ResourceNotFoundException(String.format("Category: %d - %s not found. Category update failed. Please verify the Category exists and try again.", category.getCategory_id(), category.getTitle()));

        }
    }
}
