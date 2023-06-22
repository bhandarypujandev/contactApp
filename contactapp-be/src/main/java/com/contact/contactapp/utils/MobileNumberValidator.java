package com.contact.contactapp.utils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.Pattern;

public class MobileNumberValidator implements ConstraintValidator<Pattern, Long> {
    private static final String MOBILE_NUMBER_PATTERN = "^[1-9]\\d{10,14}$";

    @Override
    public void initialize(Pattern pattern) {
    }

    @Override
    public boolean isValid(Long mobileNumber, ConstraintValidatorContext context) {
        if (mobileNumber == null) {
            return false; // null values are considered invalid
        }

        String mobileNumberString = String.valueOf(mobileNumber);
        return mobileNumberString.matches(MOBILE_NUMBER_PATTERN);
    }
}

