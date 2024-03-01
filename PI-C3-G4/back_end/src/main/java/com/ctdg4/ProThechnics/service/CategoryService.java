package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.Category;
import com.ctdg4.ProThechnics.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void updateCategory(Category category) {
        categoryRepository.save(category);
    }
    public void deleteCategory(Long category_id){
        categoryRepository.deleteById(category_id);
    }
    public List<Category> listAllCategories() {
        return categoryRepository.findAll();
    }
    public Optional<Category> findCategoryById(Long category_id){
        return categoryRepository.findById(category_id);
    }
    public List<Category> findCategoryByTitleLike(String title){
        return categoryRepository.findByTitleLike('%' + title + '%');
    }
}
