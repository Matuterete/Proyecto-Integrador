package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.dto.ProductDTO;
import com.ctdg4.ProThechnics.entity.FeatureProductRequest;
import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.ProductImageService;
import com.ctdg4.ProThechnics.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api/products")
@Tags(value = { @Tag(name = "Products") })
@CrossOrigin(origins = "*")
public class ProductController {

    private ProductService productService;
    private ProductImageService productImageService;
    private Set<Long> lastReturnedProductIds = new HashSet<>();

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Register a new product", description = "Registers a new product in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product registered successfully",
                    content = @Content(schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "409", description = "Product with the same name already exists")
    })
    @PostMapping("/add")
    public ResponseEntity<Product> registerProduct(@RequestBody Product product) throws DuplicateException {
        List<ProductDTO> existingProduct = productService.findProductByNameWithEverything(product.getName());
        if (!existingProduct.isEmpty()) {
            throw new DuplicateException("Product with name: '" + product.getName() + "' already exists.");
        }
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @PostMapping("/{productId}/features/{featureId}")
    public ResponseEntity<String> addFeature(
            @Parameter(description = "Product ID") @PathVariable Long productId,
            @Parameter(description = "Feature ID") @PathVariable Long featureId,
            @RequestBody Map<String, String> requestBody) {
        String featureValue = requestBody.get("featureValue");
        try {
            productService.addFeature(productId, featureId, featureValue);
            return ResponseEntity.ok("Feature added to Product successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add feature to product. " + e.getMessage());
        }
    }

    @PostMapping("/features")
    public ResponseEntity<String> addFeatureValues(@RequestBody List<FeatureProductRequest> featureProductAdd) {
        try {
            for (FeatureProductRequest add : featureProductAdd) {
                productService.addFeature(add.getProductId(), add.getFeatureId(), add.getFeatureValue());
            }
            return ResponseEntity.ok("Features added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add features. " + e.getMessage());
        }
    }

    @PutMapping("/{productId}/features/{featureId}")
    public ResponseEntity<String> updateFeatureValue(
            @PathVariable Long productId,
            @PathVariable Long featureId,
            @RequestBody Map<String, String> requestBody) {
        String featureValue = requestBody.get("featureValue");
        try {
            productService.updateFeatureValue(productId, featureId, featureValue);
            return ResponseEntity.ok("FeatureValue updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update featureValue. " + e.getMessage());
        }
    }
    @DeleteMapping("/{productId}/features/{featureId}")
    public ResponseEntity<String> removeFeature(
            @Parameter(description = "Product ID") @PathVariable Long productId,
            @Parameter(description = "Feature ID") @PathVariable Long featureId) {
        try {
            productService.removeFeature(productId, featureId);
            return ResponseEntity.ok("Feature removed from Product successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to remove feature from product. " + e.getMessage());
        }
    }
//    @Operation(summary = "Register a new product image", description = "Registers a new product image in the system")
//    @ApiResponse(responseCode = "200", description = "Product image registered successfully",
//            content = @Content(schema = @Schema(implementation = ProductImage.class)))
//    @PostMapping("/images/add")
//    public ResponseEntity<List<ProductImage>> registerProductImages(@RequestBody List<ProductImage> productImages) {
//        List<ProductImage> savedImages = productImages.stream()
//                .map(productImageService::saveProductImage)
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(savedImages);
//    }

    @Operation(summary = "Find all products", description = "Retrieves a list of all products")
    @ApiResponse(responseCode = "200", description = "List of products",
            content = @Content(schema = @Schema(implementation = ProductDTO.class)))
    @GetMapping("/find/all")
    public ResponseEntity<List<ProductDTO>> findAllProductDTOs() {
        return ResponseEntity.ok(productService.findAllProductDTOs());
    }

    @Operation(summary = "Find product by ID", description = "Retrieves a product by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found",
                    content = @Content(schema = @Schema(implementation = ProductDTO.class))),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/find/id/{productId}")
    public ResponseEntity<ProductDTO> findProductByIdDTO(@PathVariable Long productId) throws ResourceNotFoundException {
        ProductDTO productDTO = productService.findProductByIdWithEverything(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        return ResponseEntity.ok(productDTO);
    }

    @Operation(summary = "Find products by name", description = "Retrieves products that match the given name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of products",
                    content = @Content(schema = @Schema(implementation = ProductDTO.class))),
            @ApiResponse(responseCode = "404", description = "No products found with the given name")
    })
    @GetMapping("/find/name/{name}")
    public ResponseEntity<List<ProductDTO>> findProductByNameDTO(@PathVariable String name) throws ResourceNotFoundException {
        List<ProductDTO> productDTOs = productService.findProductByNameWithEverything(name);

        if (!productDTOs.isEmpty()) {
            return ResponseEntity.ok(productDTOs);
        } else {
            throw new ResourceNotFoundException("No products found with the name: " + name);
        }
    }

    @Operation(summary = "Find products by category", description = "Retrieves products that match the given category title")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of products",
                    content = @Content(schema = @Schema(implementation = ProductDTO.class))),
            @ApiResponse(responseCode = "404", description = "No products found with the given category title")
    })
    @GetMapping("/find/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> findProductByCategoryIdDTO(@PathVariable Long categoryId) throws ResourceNotFoundException {
        List<ProductDTO> productDTOs = productService.findProductByCategoryIdWithEverything(categoryId);

        if (!productDTOs.isEmpty()) {
            return ResponseEntity.ok(productDTOs);
        } else {
            throw new ResourceNotFoundException("No products found with Category ID: " + categoryId);
        }
    }
    @Operation(summary = "Find random products", description = "Retrieves a random selection of products")
    @ApiResponse(responseCode = "200", description = "List of random products",
            content = @Content(schema = @Schema(implementation = ProductDTO.class)))
    @GetMapping("/find/random/{quantity}")
    public ResponseEntity<List<ProductDTO>> findRandomProducts(@PathVariable int quantity) {
        List<ProductDTO> allProducts = productService.findAllProductDTOs();

        List<ProductDTO> activeProducts = allProducts.stream()
                .filter(ProductDTO::getIsActive)
                .collect(Collectors.toList());

        List<ProductDTO> availableProducts = activeProducts.stream()
                .filter(productDTO -> !lastReturnedProductIds.contains(productDTO.getId()))
                .collect(Collectors.toList());

        Collections.shuffle(availableProducts, new Random());

        List<ProductDTO> randomProducts = availableProducts.stream()
                .limit(quantity)
                .collect(Collectors.toList());

        lastReturnedProductIds = randomProducts.stream()
                .map(ProductDTO::getId)
                .collect(Collectors.toSet());

        return ResponseEntity.ok(randomProducts);
    }

    @Operation(summary = "Delete product by ID", description = "Deletes a product by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @DeleteMapping("/delete/id/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Product> productSearched = productService.findProductById(id);
        if (productSearched.isPresent()) {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted successfully");
        } else {
            throw new ResourceNotFoundException("Product deletion failed. The product may already be deleted or referenced by other entities.Please check the product ID and try again.");
        }
    }

    @Operation(summary = "Update product by ID", description = "Updates a product with new details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated successfully"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody Product updatedProduct) {
        try {
            productService.updateProduct(updatedProduct);
            return ResponseEntity.ok("Product updated successfully: " + updatedProduct.getId() + " - " + updatedProduct.getName());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
//    @PutMapping("/update/{productId}")
//    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
//        try {
//            productService.updateProduct(productId, updatedProduct);
//            return ResponseEntity.ok("Product updated successfully: " + productId + " - " + updatedProduct.getName());
//        } catch (ResourceNotFoundException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        }
//    }
}

