package com.contact.contactapp.exceptions;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
class ErrorResponse {
    private final int code;
    private  List<Field> fields;

    private  String message;

    public ErrorResponse(int code, List<Field> fields){
        this.code = code;
        this.fields = fields;
    }

    public ErrorResponse(int code, String message){
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public List<Field> getFields() {
        return fields;
    }

    public String getMessage() {
        return message;
    }


}
