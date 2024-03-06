package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {
    List<Feature> findByTitleLike(String title);
}
