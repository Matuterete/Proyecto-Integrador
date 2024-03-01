package com.ctdg4.ProThechnics.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private Boolean product_active = true;
    @Column(nullable = false)
    private String name;
    @Column
    private String description;
    @Column
    private String tech_specs;
    @Column(nullable = false)
    private Double price;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    public Product() {
    }

    public Product(Long product_id, Boolean product_active, String name, String description, Double price) {
        this.product_id = product_id;
        this.product_active = product_active;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Product(String name, String description, Double price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
