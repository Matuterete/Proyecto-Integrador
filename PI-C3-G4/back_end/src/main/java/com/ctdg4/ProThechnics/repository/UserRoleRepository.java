package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Role;
import com.ctdg4.ProThechnics.entity.UserRole;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByRole(Role role);
    Optional<Object> findByUserId(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE UserRole ur SET ur.role = :newRole WHERE ur.id.userId = :userId")
    void updateUserRole(@Param("userId") Long userId, @Param("newRole") Role newRole);
}
