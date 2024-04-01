package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.dto.ProductDTO;
import com.ctdg4.ProThechnics.dto.ProductRentalDTO;
import com.ctdg4.ProThechnics.dto.RentalDTO;
import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.entity.Rental;
import com.ctdg4.ProThechnics.repository.ProductRepository;
import com.ctdg4.ProThechnics.repository.RentalRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductService productService;


    @Transactional
    public Rental addRental(Rental rental) {
        Product product = productRepository.findById(rental.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Double price = product.getPrice();
        Double amount = rental.getDaysTotal() * price;
        Double roundedAmount = roundToTwoDecimals(amount);
        rental.setAmount(roundedAmount);

        return rentalRepository.save(rental);
    }

    @Transactional
    public void deleteRental(Long rental_id) {
        rentalRepository.deleteById(rental_id);
    }

    public Optional<Rental> findRentalById(Long rental_id) {
        return rentalRepository.findById(rental_id);
    }

    public Double roundToTwoDecimals(Double value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    public List<RentalDTO> listAllRentals() {
        List<Rental> rentals = rentalRepository.findAll();
        return rentals.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private RentalDTO convertToDto(Rental rental) {
        RentalDTO rentalDTO = modelMapper.map(rental, RentalDTO.class);
        rentalDTO.setProduct(convertToProductDto(rental.getProductId()));
        return rentalDTO;
    }

    private ProductRentalDTO convertToProductDto(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return modelMapper.map(product, ProductRentalDTO.class);
    }

    public List<RentalDTO> listRentalsByProductId(Long productId) {
        List<Rental> rentals = rentalRepository.findByProductId(productId);
        return rentals.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<RentalDTO> listRentalsByUserId(Long userId) {
        List<Rental> rentals = rentalRepository.findByUserId(userId);
        return rentals.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findAvailableProducts(LocalDate dateStart, LocalDate dateEnd) {

        List<Rental> overlappingRentals = rentalRepository.findOverlappingRentals(dateStart, dateEnd);

        List<Product> allProducts = productRepository.findAll();

        List<Product> availableProducts = allProducts.stream()
                .filter(product -> !isProductReserved(product, overlappingRentals))
                .collect(Collectors.toList());

        return availableProducts.stream()
                .map(productService::mapToDTOOnlyWithPrimaryImages)
                .collect(Collectors.toList());
    }

    private boolean isProductReserved(Product product, List<Rental> overlappingRentals) {
        return overlappingRentals.stream()
                .anyMatch(rental -> rental.getProductId().equals(product.getId()));
    }
}
