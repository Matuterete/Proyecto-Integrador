package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ctdg4.ProThechnics.entity.User;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(Long user_id) {
        userRepository.deleteById(user_id);
    }

    public List<User> listAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long user_id) {
        return userRepository.findById(user_id);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
