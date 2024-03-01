package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_id;
    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @OneToOne
    @JoinColumn(name = "category_image_id", unique = true)
    private CategoryImage categoryImage;

    public Category() {
    }

    public Category(String title, String description, CategoryImage categoryImage) {
        this.title = title;
        this.description = description;
        this.categoryImage = categoryImage;
    }
}
