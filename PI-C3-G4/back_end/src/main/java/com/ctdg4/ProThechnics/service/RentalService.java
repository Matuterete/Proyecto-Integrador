package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.entity.Rental;
import com.ctdg4.ProThechnics.repository.ProductRepository;
import com.ctdg4.ProThechnics.repository.RentalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public void addRental(Rental rental) {
        Product product = productRepository.findById(rental.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Double price = product.getPrice();
        Double amount = rental.getDays_total() * price;
        rental.setAmount(amount);

        rentalRepository.addRental(rental.getProductId(), rental.getUserId(),
                rental.getDate_start(), rental.getDate_end(),
                rental.getDays_total(), rental.getAmount());
    }

    public List<Rental> listAllRentals() {
        return rentalRepository.findAll();
    }

    public Optional<Rental> findRentalById(Long rental_id) {
        return rentalRepository.findById(rental_id);
    }
}
