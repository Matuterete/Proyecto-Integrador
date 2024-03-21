package com.ctdg4.ProThechnics.repository;


import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.entity.ProductFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductFeatureRepository extends JpaRepository<ProductFeature, Long> {

    List<ProductFeature> findByProduct(Product product);

}
