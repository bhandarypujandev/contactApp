package com.contact.contactapp.service.impl;

import com.contact.contactapp.dto.ContactDto;
import com.contact.contactapp.entity.Contact;
import com.contact.contactapp.exceptions.CustomGeneralException;
import com.contact.contactapp.exceptions.CustomValidationException;
import com.contact.contactapp.exceptions.Field;
import com.contact.contactapp.repo.ContactRepo;
import com.contact.contactapp.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ContactServiceImpl implements ContactService {
    private final ContactRepo contactRepo;


    @Override
    public Page<Contact> findAll(int pageNumber) {
        return contactRepo.findAll(PageRequest.of(pageNumber, 10));
    }

    @Override
    public Page<Contact> findAll(int pageNumber, String name) {
        return contactRepo.findByFullNameLike(name + "%", PageRequest.of(pageNumber, 10));
    }

    @Override
    public Contact save(ContactDto contact) {
        checkIfMobileNumberExist(contact.getMobileNumber(), null);

        return contactRepo.save(Contact.builder().
            emailAddress(contact.getEmailAddress()).
            fullName(contact.getFullName()).
            mobileNumber(contact.getMobileNumber()).
            build());
    }

    @Override
    public Contact update(ContactDto contact, Long id) {
        // Check if mobile number exist
        checkIfMobileNumberExist(contact.getMobileNumber(), id);

        // Check if contact exist
        Contact contactById = contactRepo.findById(id)
            .orElseThrow(() -> new CustomGeneralException("Contact not found for given id " + id));

        // Update contact
        contactById.setEmailAddress(contact.getEmailAddress());
        contactById.setFullName(contact.getFullName());
        contactById.setMobileNumber(contact.getMobileNumber());
        return contactRepo.save(contactById);
    }

    @Override
    public void delete(Long id) {
        contactRepo.deleteById(id);
    }

    private boolean checkIfMobileNumberExist(String mobileNumber, Long id) {
        // Check if mobile number exist except for the current contact
        if (id != null) {
            if (contactRepo.isMobileNumberExitForOtherId(mobileNumber, id))
                throw new CustomValidationException(Field.builder().name("mobileNumber").message("Mobile number already exist").build());
        }
        // Check if mobile number exist
        else if (contactRepo.existByPhoneNumber(mobileNumber))
            throw new CustomValidationException(Field.builder().name("mobileNumber").message("Mobile number already exist").build());
        return true;
    }
}
