package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.Role;
import com.ctdg4.ProThechnics.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role findRole(String roleName) {
        return roleRepository.findByRole(roleName);
    }
}
