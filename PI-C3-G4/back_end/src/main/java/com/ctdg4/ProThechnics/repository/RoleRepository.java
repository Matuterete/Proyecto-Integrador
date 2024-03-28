package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRole(String roleName);

}
