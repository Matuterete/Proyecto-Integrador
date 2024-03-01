package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.CategoryImage;
import com.ctdg4.ProThechnics.service.CategoryImageService;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/categories/images")
public class CategoryImageController {
    private CategoryImageService categoryImageService;

    @Autowired
    public CategoryImageController(CategoryImageService categoryImageService) {
        this.categoryImageService = categoryImageService;
    }
    @PostMapping("/add")
    public ResponseEntity<CategoryImage> registerCategoryImage(@RequestBody CategoryImage categoryImage) {
        return ResponseEntity.ok(categoryImageService.saveCategoryImage(categoryImage));
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<CategoryImage>> listCategories() {
        return ResponseEntity.ok(categoryImageService.listAllCategories());
    }

    @GetMapping("/find/id/{category_image_id}")
    public ResponseEntity<Optional<CategoryImage>> findCategoryImageById(@PathVariable Long category_image_id) {
        return ResponseEntity.ok(categoryImageService.findCategoryImageById(category_image_id));
    }

    @GetMapping("/find/name/{title}")
    public ResponseEntity<List<CategoryImage>> findCategoryImageByTitle(@PathVariable String title) {
        return ResponseEntity.ok(categoryImageService.findCategoryImageByTitleLike(title));
    }

    @DeleteMapping("/delete/id/{category_image_id}")
    public ResponseEntity<String> deleteCategoryImage(@PathVariable Long category_image_id) throws ResourceNotFoundException {
        Optional<CategoryImage> categoryImageSearched = categoryImageService.findCategoryImageById(category_image_id);
        if (categoryImageSearched.isPresent()) {
            categoryImageService.deleteCategoryImage(category_image_id);
            return ResponseEntity.ok("Category Image deleted successfully");
        } else {
            throw new ResourceNotFoundException("Category Image deletion failed. The Category Image may already be deleted or referenced by other entities.Please check the Category Image ID and try again.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCategoryImage(@RequestBody CategoryImage categoryImage) throws ResourceNotFoundException {
        Optional<CategoryImage> categoryImageSearched = categoryImageService.findCategoryImageById(categoryImage.getCategory_image_id());
        if (categoryImageSearched.isPresent()) {
            categoryImageService.updateCategoryImage(categoryImage);
            return ResponseEntity.ok("Category Image updated successfully: " + categoryImage.getCategory_image_id() + " - " + categoryImage.getTitle());
        } else {
            throw new ResourceNotFoundException(String.format("Category Image: %d - %s not found. Category Image update failed. Please verify the Category Image exists and try again.", categoryImage.getCategory_image_id(), categoryImage.getTitle()));

        }
    }
}
