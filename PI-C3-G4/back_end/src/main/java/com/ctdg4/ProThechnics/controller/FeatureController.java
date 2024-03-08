package com.ctdg4.ProThechnics.controller;
import com.ctdg4.ProThechnics.entity.Feature;
import com.ctdg4.ProThechnics.exception.DuplicateException;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.FeatureService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/features")
@CrossOrigin(origins = "*")
@Tags(value = { @Tag(name = "Features") })
public class FeatureController {
    private FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @Operation(summary = "Register a new feature", description = "Registers a new feature in the system")
    @ApiResponse(responseCode = "200", description = "Feature registered successfully",
            content = @Content(schema = @Schema(implementation = Feature.class)))
    @PostMapping("/add")
    public ResponseEntity<Feature> registerFeature(@RequestBody Feature feature) throws DuplicateException {
        List<Feature> existingFeature = featureService.findFeatureByTitleLike(feature.getTitle());
        if (!existingFeature.isEmpty()) {
            throw new DuplicateException("Feature with name: '" + feature.getTitle() + "' already exists.");
        }
        return ResponseEntity.ok(featureService.saveFeature(feature));
    }

    @Operation(summary = "List all features", description = "Retrieves a list of all features")
    @ApiResponse(responseCode = "200", description = "List of features",
            content = @Content(schema = @Schema(implementation = Feature.class)))
    @GetMapping("/find/all")
    public ResponseEntity<List<Feature>> listFeatures() {
        return ResponseEntity.ok(featureService.listAllCategories());
    }

    @Operation(summary = "Find feature by ID", description = "Retrieves a feature by its ID")
    @ApiResponse(responseCode = "200", description = "Feature found",
            content = @Content(schema = @Schema(implementation = Feature.class)))
    @GetMapping("/find/id/{feature_id}")
    public ResponseEntity<Optional<Feature>> findFeatureById(@PathVariable Long feature_id) {
        return ResponseEntity.ok(featureService.findFeatureById(feature_id));
    }

    @Operation(summary = "Find features by title", description = "Retrieves features that match the given title")
    @ApiResponse(responseCode = "200", description = "List of features",
            content = @Content(schema = @Schema(implementation = Feature.class)))
    @GetMapping("/find/name/{title}")
    public ResponseEntity<List<Feature>> findFeatureByTitle(@PathVariable String title) {
        return ResponseEntity.ok(featureService.findFeatureByTitleLike(title));
    }

    @Operation(summary = "Delete feature by ID", description = "Deletes a feature by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feature deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Feature not found")
    })
    @DeleteMapping("/delete/id/{feature_id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long feature_id) throws ResourceNotFoundException {
        Optional<Feature> featureSearched = featureService.findFeatureById(feature_id);
        if (featureSearched.isPresent()) {
            featureService.deleteFeature(feature_id);
            return ResponseEntity.ok("Feature deleted successfully");
        } else {
            throw new ResourceNotFoundException("Feature deletion failed. The Feature may already be deleted or referenced by other entities.Please check the Feature ID and try again.");
        }
    }

    @Operation(summary = "Update feature", description = "Updates a feature with new details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feature updated successfully"),
            @ApiResponse(responseCode = "404", description = "Feature not found")
    })
    @PutMapping("/update")
    public ResponseEntity<String> updateFeature(@RequestBody Feature feature) throws ResourceNotFoundException {
        Optional<Feature> featureSearched = featureService.findFeatureById(feature.getId());
        if (featureSearched.isPresent()) {
            featureService.updateFeature(feature);
            return ResponseEntity.ok("Feature updated successfully: " + feature.getId() + " - " + feature.getTitle());
        } else {
            throw new ResourceNotFoundException(String.format("Feature: %d - %s not found. Feature update failed. Please verify the Feature exists and try again.", feature.getId(), feature.getTitle()));

        }
    }
}
