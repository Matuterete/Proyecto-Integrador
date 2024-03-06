package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.Category;
import com.ctdg4.ProThechnics.entity.Feature;
import com.ctdg4.ProThechnics.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {
    @Autowired
    private FeatureRepository featureRepository;

    public Feature saveFeature(Feature Feature) {
        return featureRepository.save(Feature);
    }

    public void updateFeature(Feature Feature) {
        featureRepository.save(Feature);
    }

    public void deleteFeature(Long Feature_id) {
        featureRepository.deleteById(Feature_id);
    }

    public List<Feature> listAllCategories() {
        return featureRepository.findAll();
    }

    public Optional<Feature> findFeatureById(Long Feature_id) {
        return featureRepository.findById(Feature_id);
    }

    public List<Feature> findFeatureByTitleLike(String title) {
        return featureRepository.findByTitleLike('%' + title + '%');
    }
}
