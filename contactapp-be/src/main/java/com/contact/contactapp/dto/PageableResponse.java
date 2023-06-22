package com.contact.contactapp.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PageableResponse<T> {
    private int totalPage;
    private long totalElement;
    private boolean last;
    private int size;
    private List<T> content;
}
