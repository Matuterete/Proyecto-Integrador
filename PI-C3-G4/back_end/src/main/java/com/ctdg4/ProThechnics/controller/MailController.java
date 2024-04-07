package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.MailStructure;
import com.ctdg4.ProThechnics.service.MailService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("api/mail")
@CrossOrigin(origins = "*")
@Hidden
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping("/send/rental/{mail}")
    public String sendRentalMail(@PathVariable String mail, @RequestBody MailStructure mailStructure) throws MessagingException, UnsupportedEncodingException {
        mailService.rentEmail(mail, mailStructure);
        return "Successfully sent mail";
    }
}
