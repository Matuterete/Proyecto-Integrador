package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.dto.RentalDTO;
import com.ctdg4.ProThechnics.entity.Rental;
import com.ctdg4.ProThechnics.service.RentalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("api/rentals")
@CrossOrigin(origins = "*")
@Tags(value = {@Tag(name = "Rentals")})
public class RentalController {

    private RentalService rentalService;

    @Autowired
    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @Operation(summary = "Agregar un alquiler")
    @PostMapping("/add")
    public ResponseEntity<Rental> addRental(@RequestBody Rental rental) throws ParseException {
        LocalDateTime currentDateTime = LocalDateTime.now();
        rental.setDateRent(currentDateTime);
        long daysDifference = ChronoUnit.DAYS.between(rental.getDateStart(), rental.getDateEnd());
        rental.setDaysTotal(daysDifference);
        return ResponseEntity.ok(rentalService.addRental(rental));
    }

    @Operation(summary = "Obtener todos los alquileres")
    @GetMapping("/find/all")
    public ResponseEntity<List<RentalDTO>> listRentals() {
        return ResponseEntity.ok(rentalService.listAllRentals());
    }

    @Operation(summary = "Buscar alquileres por ID de producto")
    @GetMapping("/find/product/{productId}")
    public ResponseEntity<List<RentalDTO>> findRentalsByProductId(@PathVariable Long productId) {
        List<RentalDTO> rentals = rentalService.listRentalsByProductId(productId);
        return ResponseEntity.ok(rentals);
    }

    @Operation(summary = "Buscar alquileres por ID de usuario")
    @GetMapping("/find/user/{userId}")
    public ResponseEntity<List<RentalDTO>> findRentalsByUserId(@PathVariable Long userId) {
        List<RentalDTO> rentals = rentalService.listRentalsByUserId(userId);
        return ResponseEntity.ok(rentals);
    }
}
