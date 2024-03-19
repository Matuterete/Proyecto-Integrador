package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.UserFav;
import com.ctdg4.ProThechnics.repository.UserFavRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserFavService {

    @Autowired
    private UserFavRepository userFavRepository;

    public UserFav saveUserFavorite(UserFav userRole) {
        return userFavRepository.save(userRole);
    }

    public void updateUserFavorite(UserFav userRole) {
        userFavRepository.save(userRole);
    }

    public void deleteUserFavorite(Long userRole_id) {
        userFavRepository.deleteById(userRole_id);
    }

    public List<UserFav> listAllCategories() {
        return userFavRepository.findAll();
    }

    public Optional<UserFav> findUserFavoriteById(Long userRole_id) {
        return userFavRepository.findById(userRole_id);
    }

}
