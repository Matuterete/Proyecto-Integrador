package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameLike(String name);
    List<Product> findByCategoryId(Long categoryId);

}
