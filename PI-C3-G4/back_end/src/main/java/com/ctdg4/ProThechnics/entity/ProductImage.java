package com.ctdg4.ProThechnics.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    private Long imageId;
    @Column
    private String title;
    @Column(nullable = false)
    private String url;
    @Column(name = "is_primary")
    private Boolean isPrimary;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    public boolean isPrimary() {
        return isPrimary;
    }
}
