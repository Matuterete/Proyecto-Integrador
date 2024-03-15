package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = {"userRole.role"})
    Optional<User> findByEmail(String email);
//    @Transactional
//    @Modifying
//    @Query("UPDATE UserRole SET role_id = :newRoleId WHERE user_id = :userId")
//    void updateUserRole(@Param("userId") Long userId, @Param("newRoleId") Long newRoleId);

}
