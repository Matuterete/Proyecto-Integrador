package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.entity.Rental;
import com.ctdg4.ProThechnics.service.RentalService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("api/rentals")
@Tags(value = {@Tag(name = "Rentals")})
public class RentalController {

    private RentalService rentalService;

    @Autowired
    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping("/add")
    public void addRental(@RequestBody Rental rental) throws ParseException {
        long differenceInDays = TimeUnit.DAYS.convert(rental.getDate_end().getTime() - rental.getDate_start().getTime(), TimeUnit.MILLISECONDS);
        rental.setDays_total(differenceInDays);
       rentalService.addRental(rental);
    }


    @GetMapping("/find/all")
    public ResponseEntity<List<Rental>> listRentals() {
        return ResponseEntity.ok(rentalService.listAllRentals());
    }
}
