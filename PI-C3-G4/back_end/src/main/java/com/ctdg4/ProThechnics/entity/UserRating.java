package com.ctdg4.ProThechnics.entity;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Hidden
@Table(name = "user_ratings")
@IdClass(UserProductId.class)
public class UserRating {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "product_id")
    private Long productId;

    @Column
    private LocalDate date;

    @Column
    private Long rating;

    @Column
    private String review;
}
