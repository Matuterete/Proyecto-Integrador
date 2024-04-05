package com.ctdg4.ProThechnics.entity;

import lombok.Data;

@Data
public class MailStructure {

    private String subject;
    private String name;
    private String rentDateTime;
    private String productName;
    private String productId;
    private String imageUrl;
    private String dateStart;
    private String dateEnd;
    private String days;
    private String dayAmount;
    private String totalAmount;
}
