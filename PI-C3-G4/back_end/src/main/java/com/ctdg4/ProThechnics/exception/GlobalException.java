package com.ctdg4.ProThechnics.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException rnfe){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rnfe.getMessage());
    }

    @ExceptionHandler({DuplicateProductException.class})
    public ResponseEntity<String> handleDuplicateProductException(DuplicateProductException dpe){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(dpe.getMessage());
    }
}