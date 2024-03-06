package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.dto.ProductDTO;
import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private ProductService productService;
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

    @Operation(summary = "Find random products", description = "Retrieves a random selection of products")
    @ApiResponse(responseCode = "200", description = "List of random products",
            content = @Content(schema = @Schema(implementation = ProductDTO.class)))
    @GetMapping("/find/random/{quantity}")
    public ResponseEntity<List<ProductDTO>> findRandomProducts(@PathVariable int quantity) {
        List<ProductDTO> allProducts = productService.findAllProductDTOs();

        List<ProductDTO> availableProducts = allProducts.stream()
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
    @PutMapping("/update/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        try {
            productService.updateProduct(productId, updatedProduct);
            return ResponseEntity.ok("Product updated successfully: " + productId + " - " + updatedProduct.getName());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}

