package com.ctdg4.ProThechnics.entity;

import java.time.LocalDate;

public interface UserRatingProjection {
    Long getUserId();
    Long getProductId();
    LocalDate getDate();
    Long getRating();
    String getReview();
    String getUserName();
    String getUserLastName();
}
