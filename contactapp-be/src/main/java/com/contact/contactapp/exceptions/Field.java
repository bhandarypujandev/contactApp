package com.contact.contactapp.exceptions;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Field {
    private String name;
    private String message;

}
