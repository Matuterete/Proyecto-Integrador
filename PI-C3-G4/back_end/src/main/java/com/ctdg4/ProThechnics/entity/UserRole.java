package com.ctdg4.ProThechnics.entity;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

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

    @Override
    public int hashCode() {
        return Objects.hash(id, user, role);
    }
}
