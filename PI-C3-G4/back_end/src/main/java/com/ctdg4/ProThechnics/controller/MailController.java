package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.MailStructure;
import com.ctdg4.ProThechnics.service.MailService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/mail")
@CrossOrigin(origins = "*")
@Hidden
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping("/send/{mail}")
    public String sendMail(@PathVariable String mail, @RequestBody MailStructure mailStructure) throws MessagingException {
        mailService.sendHtmlEmail(mail, mailStructure);
        return "Successfully sent mail";
    }
}
