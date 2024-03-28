package com.ctdg4.ProThechnics.entity;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Hidden
@Table(name = "products_features")
public class ProductFeature {
    @EmbeddedId
    private ProductFeatureId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("featureId")
    @JoinColumn(name = "feature_id")
    private Feature feature;

    @Column(name = "feature_value")
    private String featureValue;
}
