package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class ProductFeatureId implements Serializable {
    private Long product_id;
    private Long feature_id;
}
