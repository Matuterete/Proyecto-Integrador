package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "category_images")
public class CategoryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_image_id;
    @Column
    private String title;
    @Column(nullable = false)
    private String url;

    public CategoryImage() {
    }

    public CategoryImage(String title, String url) {
        this.title = title;
        this.url = url;
    }
}
