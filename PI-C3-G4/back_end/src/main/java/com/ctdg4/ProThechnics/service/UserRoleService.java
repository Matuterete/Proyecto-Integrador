package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.repository.UserRoleRepository;
import com.ctdg4.ProThechnics.entity.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserRoleService {
    @Autowired
    private UserRoleRepository userRoleRepository;

    public UserRole saveUserRole(UserRole userRole) {
        return userRoleRepository.save(userRole);
    }

    public void updateUserRole(UserRole userRole) {
        userRoleRepository.save(userRole);
    }

    public void deleteUserRole(Long userRole_id) {
        userRoleRepository.deleteById(userRole_id);
    }

    public List<UserRole> listAllCategories() {
        return userRoleRepository.findAll();
    }

    public Optional<UserRole> findUserRoleById(Long userRole_id) {
        return userRoleRepository.findById(userRole_id);
    }

}
