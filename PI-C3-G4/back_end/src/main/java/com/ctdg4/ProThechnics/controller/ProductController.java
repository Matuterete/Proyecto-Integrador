package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.exception.DuplicateProductException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/products")
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity<Product> registerProduct(@RequestBody Product product) throws DuplicateProductException {
        List<Product> existingProduct = productService.findProductByNameLike(product.getName());
        if (!existingProduct.isEmpty()) {
            throw new DuplicateProductException("Product with name: '" + product.getName() + "' already exists.");
        }
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<Product>> listProducts() {
        return ResponseEntity.ok(productService.listAllProducts());
    }

    @GetMapping("/find/id/{product_id}")
    public ResponseEntity<Optional<Product>> findProductById(@PathVariable Long product_id) {
        return ResponseEntity.ok(productService.findProductById(product_id));
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<List<Product>> findProductByEmail(@PathVariable String name) {
        return ResponseEntity.ok(productService.findProductByNameLike(name));
    }

    @DeleteMapping("/delete/id/{product_id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long product_id) throws ResourceNotFoundException {
        Optional<Product> productSearched = productService.findProductById(product_id);
        if (productSearched.isPresent()) {
            productService.deleteProduct(product_id);
            return ResponseEntity.ok("Product deleted successfully");
        } else {
            throw new ResourceNotFoundException("Product deletion failed. The product may already be deleted or referenced by other entities.Please check the product ID and try again.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody Product product) throws ResourceNotFoundException {
        Optional<Product> productSearched = productService.findProductById(product.getProduct_id());
        if (productSearched.isPresent()) {
            productService.updateProduct(product);
            return ResponseEntity.ok("Product updated successfully: " + product.getProduct_id() + " - " + product.getName());
        } else {
            throw new ResourceNotFoundException(String.format("Product: %d - %s not found. Product update failed. Please verify the product exists and try again.", product.getProduct_id(), product.getName()));

        }
    }
}
