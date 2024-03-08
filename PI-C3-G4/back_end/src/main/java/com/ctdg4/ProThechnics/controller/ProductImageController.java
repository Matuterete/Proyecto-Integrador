package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.ProductImage;
import com.ctdg4.ProThechnics.service.ProductImageService;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
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
@RequestMapping("/products/images")
@CrossOrigin(origins = "*")
@Tags(value = { @Tag(name = "Products Images") })
public class ProductImageController {
    private ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }
    @Operation(summary = "Register a new product image", description = "Registers a new product image in the system")
    @ApiResponse(responseCode = "200", description = "Product image registered successfully",
            content = @Content(schema = @Schema(implementation = ProductImage.class)))
    @PostMapping("/add")
    public ResponseEntity<ProductImage> registerProductImage(@RequestBody ProductImage productImage) {
        return ResponseEntity.ok(productImageService.saveProductImage(productImage));
    }

    @Operation(summary = "List all product images", description = "Retrieves a list of all product images")
    @ApiResponse(responseCode = "200", description = "List of product images",
            content = @Content(schema = @Schema(implementation = ProductImage.class)))
    @GetMapping("/find/all")
    public ResponseEntity<List<ProductImage>> listCategories() {
        return ResponseEntity.ok(productImageService.listAllProductImages());
    }

    @Operation(summary = "Find product image by ID", description = "Retrieves a product image by its ID")
    @ApiResponse(responseCode = "200", description = "Product image found",
            content = @Content(schema = @Schema(implementation = ProductImage.class)))
    @GetMapping("/find/id/{id}")
    public ResponseEntity<Optional<ProductImage>> findProductImageById(@PathVariable Long id) {
        return ResponseEntity.ok(productImageService.findProductImageById(id));
    }

    @Operation(summary = "Find product images by title", description = "Retrieves product images that match the given title")
    @ApiResponse(responseCode = "200", description = "List of product images",
            content = @Content(schema = @Schema(implementation = ProductImage.class)))
    @GetMapping("/find/name/{title}")
    public ResponseEntity<List<ProductImage>> findProductImageByTitle(@PathVariable String title) {
        return ResponseEntity.ok(productImageService.findProductImageByTitleLike(title));
    }

    @Operation(summary = "Delete product image by ID", description = "Deletes a product image by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product image deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Product image not found")
    })
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

    @Operation(summary = "Update product image", description = "Updates a product image with new details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product image updated successfully"),
            @ApiResponse(responseCode = "404", description = "Product image not found")
    })
    @PutMapping("/update")
    public ResponseEntity<String> updateProductImage(@RequestBody ProductImage productImage) throws ResourceNotFoundException {
        Optional<ProductImage> productImageSearched = productImageService.findProductImageById(productImage.getId());
        if (productImageSearched.isPresent()) {
            productImageService.updateProductImage(productImage);
            return ResponseEntity.ok("Product Image updated successfully: " + productImage.getId() + " - " + productImage.getTitle());
        } else {
            throw new ResourceNotFoundException(String.format("Product Image: %d - %s not found. Product Image update failed. Please verify the product Image exists and try again.", productImage.getId(), productImage.getTitle()));

        }
    }
}
