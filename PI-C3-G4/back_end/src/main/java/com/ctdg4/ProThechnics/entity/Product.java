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
    private Boolean is_active;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private String tech_specs;
    @Column
    private Double price;
    @ManyToOne // Hay que confirmar si un producto puede estar en varias categorias o no.
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    public Product() {
    }

    public Product(Long product_id, Boolean is_active, String name, String description, Double price) {
        this.product_id = product_id;
        this.is_active = is_active;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Product(Boolean is_active, String name, String description, Double price) {
        this.is_active = is_active;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
