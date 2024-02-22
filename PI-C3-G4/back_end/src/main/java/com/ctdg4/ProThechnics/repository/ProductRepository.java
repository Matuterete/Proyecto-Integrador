package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Optional<Product> findByName(String name);

}
