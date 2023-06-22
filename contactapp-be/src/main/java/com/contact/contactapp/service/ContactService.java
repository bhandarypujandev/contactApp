package com.contact.contactapp.service;

import com.contact.contactapp.dto.ContactDto;
import com.contact.contactapp.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ContactService {
    Page<Contact> findAll(int pageNumber, String name);

    Contact save(ContactDto contact);

    Contact update(ContactDto contact, Long id);

    void delete(Long id);

    Page<Contact> findAll(int pageNumber);
}
