package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.dto.ProductDTO;
import com.ctdg4.ProThechnics.dto.RentalDTO;
import com.ctdg4.ProThechnics.entity.Rental;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.service.RentalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

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

    @Operation(summary = "Add a new rental")
    @PostMapping("/add")
    public ResponseEntity<Rental> addRental(@RequestBody Rental rental) throws ParseException {
        LocalDateTime currentDateTime = LocalDateTime.now();
        rental.setDateRent(currentDateTime);
        long daysDifference = ChronoUnit.DAYS.between(rental.getDateStart(), rental.getDateEnd());
        rental.setDaysTotal(daysDifference);
        return ResponseEntity.ok(rentalService.addRental(rental));
    }

    @Operation(summary = "List all rentals")
    @GetMapping("/find/all")
    public ResponseEntity<List<RentalDTO>> listRentals() {
        return ResponseEntity.ok(rentalService.listAllRentals());
    }


    @Operation(summary = "Find rentals by product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found rentals for the specified product ID"),
            @ApiResponse(responseCode = "404", description = "No rentals found for the specified product ID")
    })
    @GetMapping("/find/product/{productId}")
    public ResponseEntity<List<RentalDTO>> findRentalsByProductId(@PathVariable Long productId) {
        List<RentalDTO> rentals = rentalService.listRentalsByProductId(productId);
        return ResponseEntity.ok(rentals);
    }

    @Operation(summary = "Find rentals by user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found rentals for the specified user ID"),
            @ApiResponse(responseCode = "404", description = "No rentals found for the specified user ID")
    })
    @GetMapping("/find/user/{userId}")
    public ResponseEntity<List<RentalDTO>> findRentalsByUserId(@PathVariable Long userId) {
        List<RentalDTO> rentals = rentalService.listRentalsByUserId(userId);
        return ResponseEntity.ok(rentals);
    }

    @Operation(summary = "Find available products",
            description = "Returns a list of available products between the specified start and end dates.")
    @ApiResponse(responseCode = "200", description = "List of available products",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ProductDTO.class))))
    @ApiResponse(responseCode = "204", description = "No available products")
    @GetMapping("/available-products")
    public ResponseEntity<List<ProductDTO>> findAvailableProducts(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<ProductDTO> availableProducts = rentalService.findAvailableProducts(startDate, endDate);

        if (availableProducts.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(availableProducts);
        }
    }

    @Operation(summary = "Delete rental by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Rental deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Rental not found")
    })
    @DeleteMapping("/delete/id/{rental_id}")
    public ResponseEntity<String> deleteRental(@PathVariable Long rental_id) throws ResourceNotFoundException {
        Optional<Rental> RentalSearched = rentalService.findRentalById(rental_id);
        if (RentalSearched.isPresent()) {
            rentalService.deleteRental(rental_id);
            return ResponseEntity.ok("Rental deleted successfully");
        } else {
            throw new ResourceNotFoundException("Rental deletion failed. The Rental may already be deleted or referenced by other entities.Please check the Rental ID and try again.");
        }
    }

}
