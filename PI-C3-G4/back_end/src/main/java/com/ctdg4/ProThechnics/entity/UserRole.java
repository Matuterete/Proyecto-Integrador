package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;
    @Column(nullable = false)
    private Long role = 1L;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
