package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void updateProduct(Product product) {
        productRepository.save(product);
    }
    public void deleteProduct(Long product_id){
        productRepository.deleteById(product_id);
    }
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }
    public Optional<Product> findProductById(Long product_id){
        return productRepository.findById(product_id);
    }
    public Optional<Product> findProductByName(String name){
        return productRepository.findByName(name);
    }

}
