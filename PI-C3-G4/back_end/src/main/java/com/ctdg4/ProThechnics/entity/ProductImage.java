package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public ProductImage() {
    }

    public ProductImage(String title, String url, Product product) {
        this.title = title;
        this.url = url;
        this.product = product;
    }
}
