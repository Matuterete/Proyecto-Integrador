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
    @Column
    private String title;
    @Column
    private String description;
// Falta completar
}
