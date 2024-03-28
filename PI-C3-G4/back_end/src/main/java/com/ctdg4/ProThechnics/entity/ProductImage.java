package com.ctdg4.ProThechnics.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Hidden
@Table(name = "product_images")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    private Long id;
    @Column
    private String title;
    @Column(nullable = false)
    private String url;
    @Column(name = "is_primary")
    private Boolean isPrimary;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @JsonIgnore
    public boolean isPrimary() {
        return isPrimary;
    }
}
