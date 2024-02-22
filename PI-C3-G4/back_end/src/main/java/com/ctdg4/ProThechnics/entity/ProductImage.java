package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long image_id;
    @Column
    private String title;
    @Column
    private String url;

    // Falta completar
}
