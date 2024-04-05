package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.MailStructure;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private Environment env;
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String fromMail;

    public void sendHtmlEmail(String mail, MailStructure mailStructure) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(fromMail);
        helper.setTo(mail);
        helper.setSubject(mailStructure.getSubject());

        String htmlContent = "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head>" +
                "    <meta charset=\"UTF-8\">" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "    <title>ProThechics Soluciones</title>" +
                "    <style>" +
                "        .container {" +
                "            width: 600px;" +
                "            margin: 0 auto;" +
                "        }" +
                "        .caja {" +
                "            width: 400px;" +
                "            margin: 0 auto;" +
                "            text-align: center;" +
                "            font-size: 10px;" +
                "            font-weight: bold;" +
                "        }" +
                "        .product-image {" +
                "            max-width: 400px;" +
                "            margin: 0 auto;" +
                "        }" +
                "    </style>" +
                "</head>" +
                "<body>" +
                "    <div class=\"container\">" +
                "        <a href=\"https://www.prothechnics.shop/detail/" + mailStructure.getProductId() + "\">" +
                "            <img src=\"https://prothechnics-images.s3.us-east-2.amazonaws.com/site/mail_header_small.png\" alt=\"ProThechics Soluciones\">" +
                "        </a>" +
                "        <p>Hola " + mailStructure.getName() + ",</p>" +
                "        <p>Gracias por elegirnos para tu reciente alquiler de:</p>" +
                "        <h1 style=\"text-align: center; font-weight: bold;\">" + mailStructure.getProductName() + "</h1>" +
                "        <div class=\"caja\">" +
                "            <a href=\"https://www.prothechnics.shop/detail/" + mailStructure.getProductId() + "\">" +
                "                <img src=\"" + mailStructure.getImageUrl() + "\" alt=\"" + mailStructure.getProductName() + "\" class=\"product-image\">" +
                "            </a>" +
                "        <span>Cliquea en la imagen para ver los detalles del producto. </span>" +
                "        </div>" +
                "        <br><p>La reserva se realizó el " + mailStructure.getRentDateTime() + ".</p>" +
                "        <p>Aquí tienes los detalles:</p>" +
                "        <ul>" +
                "            <li>Fecha Inicio: " + mailStructure.getDateStart() + "</li>" +
                "            <li>Fecha Fin: " + mailStructure.getDateEnd() + "</li>" +
                "            <li>Cantidad de Días: " + mailStructure.getDays() + "</li>" +
                "            <li>Precio por Día: " + mailStructure.getDayAmount() + "</li>" +
                "            <li>Costo Total: " + mailStructure.getTotalAmount() + "</li>" +
                "        </ul>" +
                "        <p>No dudes en contactarnos si tienes alguna pregunta. Puedes encontrarnos en nuestra web <a href=\"https://www.prothechnics.shop\">www.prothechnics.shop</a> o también puedes contactarnos por WhatsApp.</p>" +
                "        <p>Gracias nuevamente por tu confianza.</p>" +
                "        <p>Saludos, el equipo de ProThechnics Soluciones.</p>" +
                "    </div>" +
                "</body>" +
                "</html>";


        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}
