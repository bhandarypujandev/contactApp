package com.contact.contactapp.exceptions;

public class CustomValidationException extends RuntimeException {
    private Field field;
    public CustomValidationException(Field fieldError) {
        this.field = fieldError;
    }

    public Field getField() {
        return field;
    }
}
