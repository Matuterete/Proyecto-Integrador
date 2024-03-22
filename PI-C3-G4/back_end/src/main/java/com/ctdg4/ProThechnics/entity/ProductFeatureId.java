package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class ProductFeatureId implements Serializable {

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "feature_id")
    private Long featureId;
}
