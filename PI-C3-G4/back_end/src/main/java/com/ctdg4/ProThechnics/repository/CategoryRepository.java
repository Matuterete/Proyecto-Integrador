package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository public interface CategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findByTitleLike(String title);
}
