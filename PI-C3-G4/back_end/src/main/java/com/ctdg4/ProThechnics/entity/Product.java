package com.ctdg4.ProThechnics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    @Schema(hidden = true)
    private Long id;
    @Column(name = "product_active", columnDefinition = "TINYINT(1)", nullable = false)
    private Boolean isActive = true;
    @Column(nullable = false)
    private String name;
    @Column
    private String description;
    @Column(nullable = false)
    private Double price;
    @Column(nullable = false)
    private Long stock = 1L;
    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @Schema(hidden = true)
    private List<ProductImage> images;
    @JoinTable(
            name = "products_features",
            joinColumns = @JoinColumn(name = "product_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "feature_id", nullable = false))
    @ManyToMany(cascade = CascadeType.ALL)
    @Schema(hidden = true)
    private List<Feature> features;
}
