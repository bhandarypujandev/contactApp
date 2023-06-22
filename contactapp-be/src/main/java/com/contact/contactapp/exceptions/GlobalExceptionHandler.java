package com.contact.contactapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(MethodArgumentNotValidException e) {
        List<Field> fields = new ArrayList<>();
        e.getBindingResult().getFieldErrors().forEach(fieldError -> fields.add(Field.builder().message(fieldError.getDefaultMessage()).name(fieldError.getField()).build()));
        return ResponseEntity.status(422).body( new ErrorResponse(422,fields));
    }

//
    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomValidationException e) {
        List<Field> fields = new ArrayList<>();
        fields.add(e.getField());
        ErrorResponse error = new ErrorResponse(422,fields);
        return ResponseEntity.status(422).body(error);
    }

    @ExceptionHandler(CustomGeneralException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomGeneralException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    // Add more @ExceptionHandler methods for other exceptions as needed


}
