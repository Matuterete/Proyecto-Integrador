package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @Column
    private String url;
}
