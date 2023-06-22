package com.contact.contactapp.dto;

import com.contact.contactapp.utils.MobileNumberValidator;
import lombok.*;

import javax.validation.Constraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Builder
@AllArgsConstructor
@Getter
public class ContactDto {
    @NotEmpty(message = "Full name is required")
    private String fullName;
    @Email(message = "Email address is not valid")
    private String emailAddress;
    @Pattern(regexp = "^[1-9]\\d{10,14}$", message = "Mobile number is not valid")
    private String mobileNumber;

}
