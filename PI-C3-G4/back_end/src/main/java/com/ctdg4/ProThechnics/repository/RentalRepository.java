package com.ctdg4.ProThechnics.repository;

import com.ctdg4.ProThechnics.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
//    @Transactional
//    @Modifying
//    @Query(value = "INSERT INTO rentals (product_id, user_id, date_start, date_end, days_total, amount) " +
//            "VALUES (:productId, :userId, :dateStart, :dateEnd, :daysTotal, :amount)", nativeQuery = true)
//    void addRental(@Param("productId") Long productId, @Param("userId") Long userId,
//                   @Param("dateStart") Date dateStart, @Param("dateEnd") Date dateEnd,
//                   @Param("daysTotal") Long daysTotal, @Param("amount") Double amount);

    @Query("SELECT r FROM Rental r WHERE (:startDate <= r.dateEnd AND :endDate >= r.dateStart)")
    List<Rental> findOverlappingRentals(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    List<Rental> findByProductId(Long productId);

    List<Rental> findByUserId(Long userId);

}
