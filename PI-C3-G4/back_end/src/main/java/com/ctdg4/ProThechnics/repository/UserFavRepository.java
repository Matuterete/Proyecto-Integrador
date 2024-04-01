package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.UserFav;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFavRepository extends JpaRepository<UserFav, Long> {

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_fav (user_id, product_id) VALUES (:userId, :productId)", nativeQuery = true)
    void addFavorite(Long userId, Long productId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM user_fav WHERE user_id = :userId AND product_id = :productId", nativeQuery = true)
    void removeFavorite(Long userId, Long productId);
}
