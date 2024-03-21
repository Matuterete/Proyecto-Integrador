package com.ctdg4.ProThechnics.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_role")
public class UserRole {
    @EmbeddedId
    private UserRoleId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Role role;

    @Override
    public String toString() {
        return "UserRole{" +
                "id=" + id +
                ", role=" + role +
                '}';
    }
}
