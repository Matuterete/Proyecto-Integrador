package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "products_features")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ProductFeature {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "product_feature_id")
//    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "product_id", nullable = false)
//    @JsonIgnore
//    private Product product;

    //    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "feature_id", nullable = false)
//    @JsonIgnore
//    private Feature feature;
//
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
