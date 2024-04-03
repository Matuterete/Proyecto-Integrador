package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.UserRating;
import com.ctdg4.ProThechnics.entity.UserRatingProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRatingRepository extends JpaRepository<UserRating, Long> {

    @Query("SELECT ur.userId AS userId, ur.productId AS productId, ur.date AS date, ur.rating AS rating, ur.review AS review, u.name AS userName, u.lastName AS userLastName " +
            "FROM UserRating ur " +
            "INNER JOIN User u ON ur.userId = u.id " +
            "WHERE ur.productId = :productId")
    List<UserRatingProjection> findCustomProjectionByProductId(Long productId);
    List<UserRating> findByProductId(Long productId);
    List<UserRating> findByUserId(Long userId);
}
