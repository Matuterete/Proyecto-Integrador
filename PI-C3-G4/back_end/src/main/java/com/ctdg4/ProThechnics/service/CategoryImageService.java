package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.repository.CategoryImageRepository;
import com.ctdg4.ProThechnics.entity.CategoryImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryImageService {
    @Autowired
    private CategoryImageRepository categoryImageRepository;
    public CategoryImage saveCategoryImage(CategoryImage categoryImage) {
        return categoryImageRepository.save(categoryImage);
    }

    public void updateCategoryImage(CategoryImage categoryImage) {
        categoryImageRepository.save(categoryImage);
    }
    public void deleteCategoryImage(Long category_image_id){
        categoryImageRepository.deleteById(category_image_id);
    }
    public List<CategoryImage> listAllCategories() {
        return categoryImageRepository.findAll();
    }
    public Optional<CategoryImage> findCategoryImageById(Long category_image_id){
        return categoryImageRepository.findById(category_image_id);
    }
    public List<CategoryImage> findCategoryImageByTitleLike(String title){
        return categoryImageRepository.findByTitleLike('%' + title + '%');
    }
}
