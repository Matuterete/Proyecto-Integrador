package com.ctdg4.ProThechnics.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Hidden
@Table(name = "features")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feature_id")
    private Long id;
    @Column
    private String title;
    @Column
    private String url;
    @OneToMany(mappedBy = "feature", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ProductFeature> features;
}
