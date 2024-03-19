package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.ProductFeature;
import com.ctdg4.ProThechnics.service.ProductFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Hidden;

import java.util.List;


@Hidden
@RestController
@RequestMapping("api/products_features")
@CrossOrigin(origins = "*")
public class ProductFeatureController {

    private ProductFeatureService productFeatureService;
    @Autowired
    public ProductFeatureController(ProductFeatureService productFeatureService) {
        this.productFeatureService = productFeatureService;
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<ProductFeature>> listCategories() {
        return ResponseEntity.ok(productFeatureService.listAllProductFeatures());
    }

//    @GetMapping("/find/id/{product_id}")
//    public ResponseEntity<Optional<ProductFeature>> findProductFeatureById(@PathVariable Long product_id, @PathVariable Long feature_id) {
//        ProductFeatureId productFeatureId = new ProductFeatureId(product_id, feature_id);
//        return ResponseEntity.ok(productFeatureService.findProductFeatureById(productFeatureId));
//    }
}
