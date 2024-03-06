package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameLike(String name);
//    @Query("SELECT p FROM Product p JOIN p.Category c JOIN p.ProductImage pi WHERE p.product_active = true AND i.is_primary = true ORDER BY p.product_id ASC")
//    List<Object[]> findActiveProductsWithPrimaryImageUrl();

}
