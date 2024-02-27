package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.ProductImage;
import com.ctdg4.ProThechnics.service.ProductImageService;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/products/images")
public class ProductImageController {
    private ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }
    @PostMapping("/add")
    public ResponseEntity<ProductImage> registerProductImage(@RequestBody ProductImage productImage) {
        return ResponseEntity.ok(productImageService.saveProductImage(productImage));
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<ProductImage>> listCategories() {
        return ResponseEntity.ok(productImageService.listAllProductImages());
    }

    @GetMapping("/find/id/{product_image_id}")
    public ResponseEntity<Optional<ProductImage>> findProductImageById(@PathVariable Long product_image_id) {
        return ResponseEntity.ok(productImageService.findProductImageById(product_image_id));
    }

    @GetMapping("/find/name/{title}")
    public ResponseEntity<List<ProductImage>> findProductImageByTitle(@PathVariable String title) {
        return ResponseEntity.ok(productImageService.findProductImageByTitleLike(title));
    }

    @DeleteMapping("/delete/id/{product_image_id}")
    public ResponseEntity<String> deleteProductImage(@PathVariable Long product_image_id) throws ResourceNotFoundException {
        Optional<ProductImage> productImageSearched = productImageService.findProductImageById(product_image_id);
        if (productImageSearched.isPresent()) {
            productImageService.deleteProductImage(product_image_id);
            return ResponseEntity.ok("Product Image deleted successfully");
        } else {
            throw new ResourceNotFoundException("Product Image deletion failed. The product Image may already be deleted or referenced by other entities.Please check the Product Image ID and try again.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProductImage(@RequestBody ProductImage productImage) throws ResourceNotFoundException {
        Optional<ProductImage> productImageSearched = productImageService.findProductImageById(productImage.getProduct_image_id());
        if (productImageSearched.isPresent()) {
            productImageService.updateProductImage(productImage);
            return ResponseEntity.ok("Product Image updated successfully: " + productImage.getProduct_image_id() + " - " + productImage.getTitle());
        } else {
            throw new ResourceNotFoundException(String.format("Product Image: %d - %s not found. Product Image update failed. Please verify the product Image exists and try again.", productImage.getProduct_image_id(), productImage.getTitle()));

        }
    }
}
