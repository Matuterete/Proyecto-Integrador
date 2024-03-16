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

    @ExceptionHandler({DuplicateException.class})
    public ResponseEntity<String> handleDuplicateProductException(DuplicateException dpe){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(dpe.getMessage());
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException bce){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(bce.getMessage());
    }
}