package com.ctdg4.ProThechnics.entity;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Hidden
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @Column
    private String url;
}
