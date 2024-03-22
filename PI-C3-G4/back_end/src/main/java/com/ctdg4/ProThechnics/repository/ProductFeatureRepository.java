package com.ctdg4.ProThechnics.repository;


import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.entity.ProductFeature;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductFeatureRepository extends JpaRepository<ProductFeature, Long> {

    List<ProductFeature> findByProduct(Product product);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO products_features (product_id, feature_id, feature_Value) VALUES (:productId, :featureId, :featureValue)", nativeQuery = true)
    void addFeature(Long productId, Long featureId, String featureValue);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM products_features WHERE product_id = :productId and feature_id = :featureId", nativeQuery = true)
    void removeFeature(Long productId, Long featureId);

    @Transactional
    @Modifying
    @Query("UPDATE ProductFeature pf SET pf.featureValue = :featureValue WHERE pf.id.productId = :productId AND pf.id.featureId = :featureId")
    void updateFeatureValue(Long productId, Long featureId, String featureValue);

}
