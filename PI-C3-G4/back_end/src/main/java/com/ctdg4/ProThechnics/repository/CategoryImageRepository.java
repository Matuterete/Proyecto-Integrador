package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.CategoryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryImageRepository extends JpaRepository<CategoryImage,Long> {
    List<CategoryImage> findByTitleLike(String title);
}
