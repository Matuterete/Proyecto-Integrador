package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByTitleLike(String title);
}
