package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/products")
public class ProductController {
    private ProductService productService;
    private List<Product> lastReturnedProducts = new ArrayList<>();

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity<Product> registerProduct(@RequestBody Product product) throws DuplicateException {
        List<Product> existingProduct = productService.findProductByNameLike(product.getName());
        if (!existingProduct.isEmpty()) {
            throw new DuplicateException("Product with name: '" + product.getName() + "' already exists.");
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
    public ResponseEntity<List<Product>> findProductByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.findProductByNameLike(name));
    }

    @GetMapping("/find/random/{quantity}")
    public ResponseEntity<List<Product>> findRandomProducts(@PathVariable int quantity) {
        List<Product> allProducts = productService.listAllProducts();
        Collections.shuffle(allProducts, new Random());

        Set<Product> randomProductsSet = new LinkedHashSet<>();
        while (randomProductsSet.size() < Math.min(quantity, allProducts.size())) {
            int randomIndex = new Random().nextInt(allProducts.size());
            randomProductsSet.add(allProducts.get(randomIndex));
        }

        List<Product> randomProducts = new ArrayList<>(randomProductsSet);
        if (randomProducts.equals(lastReturnedProducts)) {
            return findRandomProducts(quantity);
        }

        lastReturnedProducts = randomProducts;

        return ResponseEntity.ok(randomProducts);
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
