package com.ctdg4.ProThechnics.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "products")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;
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
    private List<ProductImage> images;
    @JoinTable(
            name = "products_features",
            joinColumns = @JoinColumn(name = "product_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "feature_id", nullable = false))
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Feature> features;
}
