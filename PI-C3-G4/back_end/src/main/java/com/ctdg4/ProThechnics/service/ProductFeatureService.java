package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.ProductFeature;
import com.ctdg4.ProThechnics.entity.ProductFeatureId;
import com.ctdg4.ProThechnics.repository.ProductFeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductFeatureService {
    @Autowired
    private ProductFeatureRepository productFeatureRepository;

    public ProductFeature saveProductFeature(ProductFeature productFeature) {
        return productFeatureRepository.save(productFeature);
    }

    public void updateProductFeature(ProductFeature ProductFeature) {
        productFeatureRepository.save(ProductFeature);
    }

    public void deleteProductFeature(Long product_id) {
        productFeatureRepository.deleteById(product_id);
    }

    public List<ProductFeature> listAllProductFeatures() {
        return productFeatureRepository.findAll();
    }

    public Optional<ProductFeature> findProductFeatureById(Long product_id) {
        return productFeatureRepository.findById(product_id);
    }
}
