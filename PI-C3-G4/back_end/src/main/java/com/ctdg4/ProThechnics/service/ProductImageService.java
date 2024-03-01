package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.ProductImage;
import com.ctdg4.ProThechnics.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
@Service
public class ProductImageService {
    @Autowired
    private ProductImageRepository productImageRepository;

    public ProductImage saveProductImage(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }

    public void updateProductImage(ProductImage productImage) {
        productImageRepository.save(productImage);
    }
    public void deleteProductImage(Long product_image_id){
        productImageRepository.deleteById(product_image_id);
    }
    public List<ProductImage> listAllProductImages() {
        return productImageRepository.findAll();
    }
    public Optional<ProductImage> findProductImageById(Long product_image_id){
        return productImageRepository.findById(product_image_id);
    }
    public List<ProductImage> findProductImageByTitleLike(String title){
        return productImageRepository.findByTitleLike('%' + title + '%');
    }
}
