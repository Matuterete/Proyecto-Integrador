package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRatingRepository extends JpaRepository<UserRating, Long> {
    List<UserRating> findByProductId(Long productId);
    List<UserRating> findByUserId(Long userId);
}
